import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import {
  ImageContainer,
  SelectedImage,
  PageTitle,
  ButtonText,
  StyledContainerAnimal,
  StyledTextInputForm,
  CuteButton,
} from "../components/styles";
import { CredentialsContext } from "../components/CredentialsContext";
import * as ImagePicker from "expo-image-picker";
import baseAxios from "../components/axios/baseAxios";
//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const AnimalPage = ({
  navigation,
  route,
  handleShowAnimalForm,
  handleCancelAnimalPage,
}) => {
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

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Please fill all the fields and attach a photo");
      return;
    }
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
      const response = await baseAxios.post("/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageFileName(response.data);
      Alert.alert("Success", "Image uploaded successfully");
      setImageUri("");
      setImageDescription("");
      setShowAnimalForm(true);
      handleShowAnimalForm(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to upload image");
    }
  }

  const handleCancel = () => {
    setIsImageSelected(false);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainerAnimal>
        <PageTitle>Report a Lost Animal</PageTitle>
        <StyledTextInputForm
          placeholder="Image Description"
          value={imageDescription}
          onChangeText={setImageDescription}
          multiline={true}
          numberOfLines={4}
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
            <ButtonText>Wrong photo</ButtonText>
          </CuteButton>
        )}
        <CuteButton onPress={handleSubmit}>
          <ButtonText>Submit Details</ButtonText>
        </CuteButton>
        <CuteButton onPress={handleCancelAnimalPage}>
          <ButtonText>Cancel</ButtonText>
        </CuteButton>
      </StyledContainerAnimal>
    </KeyboardAvoidingWrapper>
  );
};

export default AnimalPage;
