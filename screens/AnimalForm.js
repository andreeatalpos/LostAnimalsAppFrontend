import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { BottomHalf, StyledInputLabel, StyledTextInput, IconBg, StyledContainer, TopHalf, Colors, PageTitle, InfoText, EmphasizeText, StyledButton, ButtonText, InlineGroup, TextLink, TextLinkContent, SubTitle, StyledContainerAnimal, StyledTextInputForm } from "../components/styles";
import { CredentialsContext } from './../components/CredentialsContext';

import * as ImagePicker from 'expo-image-picker';

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

  const handleSubmit = () => {
    // Submit the animal's details and photo to the server
    console.log('Submitting animal details:', { animalName, breed, color, age, species, imageUri, imageDescription });
    // Clear the form
    setAnimalName('');
    setBreed('');
    setColor('');
    setAge('');
    setSpecies('');
    setImageUri('');
    setImageDescription('');
    Alert.alert('Success', 'Your report has been submitted.');
  };

  return (
    <StyledContainerAnimal>
      <PageTitle>Report a Lost Animal</PageTitle>
      <StyledTextInputForm
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
      />
      <StyledTextInputForm
        placeholder="Image Description"
        value={imageDescription}
        onChangeText={setImageDescription}
      />
      <StyledButton onPress={handleChoosePhoto}>
        {imageUri ? (
          <Image source={{ uri: imageUri }}  />
        ) : (
          <ButtonText >Attach a photo</ButtonText>
        )}
      </StyledButton>
      <StyledButton onPress={handleSubmit}>
        <ButtonText>Submit Details</ButtonText>
      </StyledButton>
    </StyledContainerAnimal>
  );
}

export default AnimalForm;
