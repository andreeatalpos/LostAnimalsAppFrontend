import React, { useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  BottomHalf,
  StyledInputLabel,
  ImageContainer,
  SelectedImage,
  StyledTextInput,
  IconBg,
  StyledContainer,
  TopHalf,
  Colors,
  PageTitle,
  InfoText,
  EmphasizeText,
  StyledButton,
  ButtonText,
  InlineGroup,
  TextLink,
  TextLinkContent,
  SubTitle,
  StyledContainerAnimal,
  StyledTextInputForm,
  CuteButton,
} from "../components/styles";
import { CredentialsContext } from "../components/CredentialsContext";
import AnimalForm from "../components/AnimalForm";

import * as ImagePicker from "expo-image-picker";
import baseAxios from "../components/axios/ApiManager";
//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import * as FileSystem from "expo-file-system";
import { Modal } from "react-native";

const AnimalPage = ({ navigation, route }) => {
  const [animalData, setAnimalData] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { email, fullName, phoneNumber, role, username } = storedCredentials;
  const formattedPhoneNumber = phoneNumber
    ? phoneNumber.toString().substring(1)
    : "";
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [showAnimalForm, setShowAnimalForm] = useState(false);
  const { isFound } = route.params;
  console.log("found " + isFound);

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to grant permission to access your photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImageUri(result.uri);
      setIsImageSelected(true);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to grant permission to access your camera."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImageUri(result.uri);
      setIsImageSelected(true);
    }
  };

  // const downloadImage = async (uri) => {
  //   const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  //   return base64;
  // };

  const handleAnimalFormSubmit = (data) => {
    setAnimalData(data);
  };

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Please fill all the fields and attach a photo");
      return;
    }
    // const base64 = await downloadImage(imageUri);
    await uploadPhoto(imageUri, imageDescription);
  };

  async function uploadPhoto(uri, description) {
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    formData.append("description", description);

    try {
      const response = await baseAxios.post("image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setImageFileName(response.data);
      Alert.alert("Success", "Image uploaded successfully");
      setImageUri("");
      setImageDescription("");
      setShowAnimalForm(true);
      console.log("am trimissss" + imageFileName);
      navigation.navigate("AnimalForm", {
        imageFileName: response.data,
        isFound: isFound,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to upload image");
    }
  }

  const handleCancel = () => {
    setIsImageSelected(false);
  };

  async function onSubmitAnimalForm(animalData) {
    try {
      const response = await baseAxios.post("animal", animalData, {});
      console.log(response);
    } catch (error) {
      console.log("eroare la create animal");
      // console.error(error);
    }
    console.log("we have animal dataaa");
  }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainerAnimal>
        <PageTitle>Report a Lost Animal</PageTitle>
        <StyledTextInputForm
          placeholder="Image Description"
          value={imageDescription}
          onChangeText={setImageDescription}
        />
        {!isImageSelected && (
          <>
            <CuteButton onPress={handleChoosePhoto}>
              <ButtonText>Choose from gallery</ButtonText>
            </CuteButton>
            <CuteButton onPress={handleTakePhoto}>
              <ButtonText>Take a photo</ButtonText>
            </CuteButton>
          </>
        )}
        <ImageContainer>
          {imageUri && isImageSelected && (
            <SelectedImage
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </ImageContainer>
        {isImageSelected && (
          <CuteButton onPress={handleCancel}>
            <ButtonText>Cancel</ButtonText>
          </CuteButton>
        )}
        <CuteButton onPress={handleSubmit}>
          <ButtonText>Submit Details</ButtonText>
        </CuteButton>
        {/* {
        showAnimalForm && (
          <AnimalForm /> 
        )
      } */}
        {/* <Modal 
        visible = {showAnimalForm} 
        animationType="slide"
        transparent={true}
        style={{justifyContent: 'center', alignItems: 'center'}}
        >
        <AnimalForm/>
      </Modal> */}
      </StyledContainerAnimal>
    </KeyboardAvoidingWrapper>
  );
};

export default AnimalPage;
