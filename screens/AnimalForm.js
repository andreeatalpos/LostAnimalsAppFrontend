import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { BottomHalf, StyledInputLabel, StyledTextInput, IconBg, StyledContainer, TopHalf, Colors, PageTitle, InfoText, EmphasizeText, StyledButton, ButtonText, InlineGroup, TextLink, TextLinkContent, SubTitle, StyledContainerAnimal, StyledTextInputForm } from "../components/styles";
import { CredentialsContext } from './../components/CredentialsContext';

import * as ImagePicker from 'expo-image-picker';
import baseAxios from '../components/axios/ApiManager';
//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import * as FileSystem from 'expo-file-system';


const  AnimalForm = ({navigation}) => {
  const [animalName, setAnimalName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [age, setAge] = useState('');
  const [species, setSpecies] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  //context
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {email, fullName, phoneNumber, role, username} = storedCredentials;
  const formattedPhoneNumber = phoneNumber ? phoneNumber.toString().substring(1) : '';

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to grant permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to grant permission to access your camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const downloadImage = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    return base64;
  };

  const uploadImage = async (imageDTO, base64) => {
    console.log(base64)
    const data = {
      ...imageDTO,
      file: {
        data: base64,
        type: 'image/jpeg',
        name: 'animal-photo.jpg',
      },
    };
  
    const response = await baseAxios.post('/image/upload', data);
    return response.data;
  };

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please fill all the fields and attach a photo');
      return;
    }
  
    const imageDTO = {
      description: imageDescription,
    };
  
    try {
      const base64 = await downloadImage(imageUri);
      await uploadPhoto(imageUri, imageDescription);
      Alert.alert('Success', 'Image uploaded successfully');
      // Clear the form after submission
      // setAnimalName('');
      // setBreed('');
      // setColor('');
      // setAge('');
      // setSpecies('');
      setImageUri('');
      setImageDescription('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };
  


  async function uploadPhoto(uri, description) {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('description', description);
  
    try {
      const response = await baseAxios.post('image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }
  }
  

  return (
    <KeyboardAvoidingWrapper>
    <StyledContainerAnimal>
      <PageTitle>Report a Lost Animal</PageTitle>
      {/* <StyledTextInputForm
        placeholder="Animal Name"
        value={animalName}
        onChangeText={setAnimalName}
      />
      <StyledTextInputForm
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <StyledTextInputForm
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <StyledTextInputForm
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <StyledTextInputForm
        placeholder="Species"
        value={species}
        onChangeText={setSpecies}
      /> */}
      <StyledTextInputForm
        placeholder="Image Description"
        value={imageDescription}
        onChangeText={setImageDescription}
      />
      <StyledButton onPress={handleChoosePhoto}>
        <ButtonText>Choose from gallery</ButtonText>
      </StyledButton>
      <StyledButton onPress={handleTakePhoto}>
        <ButtonText>Take a photo</ButtonText>
      </StyledButton>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <StyledButton onPress={handleSubmit}>
        <ButtonText>Submit Details</ButtonText>
      </StyledButton>
    </StyledContainerAnimal>
    </KeyboardAvoidingWrapper>
  );
}

export default AnimalForm;
