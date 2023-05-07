import React, { useContext } from "react";
import * as Yup from "yup";
import {
  ButtonText,
  CuteButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  StyledTextInputForm,
  StyledTextInputFormBigger,
  SubTitle,
} from "./styles";
import { Alert } from "react-native";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import baseAxios from "../components/axios/ApiManager";
import { CredentialsContext } from "../components/CredentialsContext";
import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";

// validation schema
const AnimalSchema = Yup.object().shape({
  animalName: Yup.string().required("Animal name is required"),
  breed: Yup.string().required("Breed is required"),
  color: Yup.string().required("Color is required"),
  age: Yup.number()
    .integer()
    .required("Age is required")
    .min(0, "Age cannot be negative"),
  species: Yup.string().required("Species is required"),
  animalInfo: Yup.string().required("Animal info is required"),
});

const AnimalForm = ({ route }) => {
  const { imageFileName, isFound } = route.params;
  console.log("found  " + isFound);
  console.log("file  " + imageFileName);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  async function handleFormSubmit(values) {
    const animalData = {
      animalName: values.animalName,
      animalInfo: values.animalInfo,
      breed: values.breed,
      color: values.color,
      age: parseInt(values.age),
      species: values.species,
      isFound: isFound,
      username: storedCredentials.username,
      fileName: imageFileName,
    };
    try {
      console.log(animalData);
      const response = await baseAxios.post("animal", animalData);
      console.log(response);
    } catch (error) {
      console.log("eroare la create animal");
      console.error(error.message);
    }
  }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <SubTitle>Please provide animal info</SubTitle>
        <Formik
          initialValues={{
            animalName: "",
            animalInfo: "",
            breed: "",
            color: "",
            age: "",
            species: "",
          }}
          onSubmit={handleFormSubmit}
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
                placeholder="Breed"
                value={values.breed}
                onChangeText={handleChange("breed")}
                onBlur={handleBlur("breed")}
              />
              {errors.breed && touched.breed && (
                <StyledErrorText>{errors.breed}</StyledErrorText>
              )}
              <StyledTextInputForm
                placeholder="Color"
                value={values.color}
                onChangeText={handleChange("color")}
                onBlur={handleBlur("color")}
              />
              {errors.color && touched.color && (
                <StyledErrorText>{errors.color}</StyledErrorText>
              )}
              <StyledTextInputForm
                placeholder="Age"
                value={values.age}
                onChangeText={handleChange("age")}
                onBlur={handleBlur("age")}
              />
              {errors.animalName && touched.age && (
                <StyledErrorText>{errors.age}</StyledErrorText>
              )}
              <StyledTextInputForm
                placeholder="Species"
                value={values.species}
                onChangeText={handleChange("species")}
                onBlur={handleBlur("species")}
              />
              {errors.animalName && touched.species && (
                <StyledErrorText>{errors.species}</StyledErrorText>
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
              />
              {errors.animalName && touched.animalName && (
                <StyledErrorText>{errors.animalName}</StyledErrorText>
              )}
              <CuteButton onPress={handleSubmit}>
                <ButtonText style={{ color: "white" }}>Submit</ButtonText>
              </CuteButton>
            </StyledFormArea>
          )}
        </Formik>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default AnimalForm;
