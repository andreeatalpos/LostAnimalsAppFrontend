import React, { useContext, useState } from "react";
import * as Yup from "yup";
import {
  ButtonText,
  CuteButton,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInputForm,
  SubTitle,
  StyledErrorText,
  StyledContainerForm,
} from "./styles";
import { Alert } from "react-native";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import baseAxios from "./axios/baseAxios";
import { CredentialsContext } from "../components/CredentialsContext";
import { Formik } from "formik";

const animalSchema = Yup.object().shape({
  animalName: Yup.string().min(1).required("Animal name is required"),
  age: Yup.number()
    .integer()
    .required("Age is required")
    .min(0, "Age cannot be negative"),

  animalInfo: Yup.string().required("Animal info is required"),
});

const AnimalForm = ({
  route,
  handleAnimalFormSubmit,
  handleCancelAnimalForm,
}) => {
  const { imageFileName, isFound } = route.params;
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [animalData, setAnimalData] = useState({
    animalName: "",
    animalInfo: "",
    age: "",
    isFound: isFound,
    username: storedCredentials.username,
    fileName: imageFileName,
  });
  const [errors, setErrors] = useState({});

  async function handleFormSubmit(values) {
    const data = {
      animalName: values.animalName,
      animalInfo: values.animalInfo,
      age: parseInt(values.age),
      isFound: isFound,
      username: storedCredentials.username,
      fileName: imageFileName,
    };
    try {
      await animalSchema.validate(data, { abortEarly: false });
      const species = await baseAxios.get("/animal/species/" + imageFileName);
      const isCorrectSpecies = await showSpeciesAlert(species.data);
      await submitAnimalData(isCorrectSpecies, data);

      Alert.alert("Success", "Animal info submitted successfully", [
        {
          text: "OK",
          onPress: () => {
            handleAnimalFormSubmit();
          },
        },
      ]);
    } catch (error) {
      console.error(error.message);
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setErrors(errors);
    }
  }

  async function showSpeciesAlert(species) {
    return new Promise((resolve) => {
      Alert.alert(
        "Success",
        "Is that the correct animal species?\n" + species,
        [
          {
            text: "Yes",
            onPress: () => resolve(true),
          },
          {
            text: "No",
            onPress: () => resolve(false),
          },
        ]
      );
    });
  }

  async function submitAnimalData(isCorrectSpecies, data) {
    const response = await baseAxios.post("/animal/" + isCorrectSpecies, data);
    return response;
  }
  const handleMessage = (message) => {
    try {
      Alert.alert("Error", message, [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainerForm>
        <SubTitle>Please provide animal info</SubTitle>
        <Formik
          initialValues={{
            animalName: "",
            animalInfo: "",
            age: "",
          }}
          validationSchema={animalSchema}
          onSubmit={(values) => {
            if (
              values.animalName === "" ||
              values.age === "" ||
              values.animalInfo === ""
            ) {
              handleMessage("Please fill all the fields");
            } else {
              handleFormSubmit(values);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched }) => (
            <StyledFormArea>
              <StyledTextInputForm
                placeholder="Animal Name"
                value={values.animalName}
                onChangeText={handleChange("animalName")}
                onBlur={handleBlur("animalName")}
              />
              {errors.animalName && touched.animalName && (
                <StyledErrorText>{errors.animalName}</StyledErrorText>
              )}
              <StyledTextInputForm
                placeholder="Aproximate age"
                value={values.age}
                onChangeText={handleChange("age")}
                onBlur={handleBlur("age")}
              />
              {errors.age && touched.age && (
                <StyledErrorText>{errors.age}</StyledErrorText>
              )}
              <StyledInputLabel>
                Provide info like: animal condition, where you found it and
                where is him now{" "}
              </StyledInputLabel>
              <StyledTextInputForm
                placeholder="Animal Info"
                value={values.animalInfo}
                onChangeText={handleChange("animalInfo")}
                onBlur={handleBlur("animalInfo")}
                multiline={true}
                numberOfLines={4}
              />
              {errors.animalInfo && touched.animalInfo && (
                <StyledErrorText>{errors.animalInfo}</StyledErrorText>
              )}
              <CuteButton onPress={handleSubmit}>
                <ButtonText tyle="submit" style={{ color: "white" }}>
                  Submit
                </ButtonText>
              </CuteButton>
              <CuteButton onPress={handleCancelAnimalForm}>
                <ButtonText tyle="submit" style={{ color: "white" }}>
                  Cancel
                </ButtonText>
              </CuteButton>
            </StyledFormArea>
          )}
        </Formik>
      </StyledContainerForm>
    </KeyboardAvoidingWrapper>
  );
};

export default AnimalForm;
