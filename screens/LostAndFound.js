import React, { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  ImageContainer,
  SelectedImage,
  PageTitle,
  ButtonText,
  StyledContainerAnimal,
  StyledTextInputForm,
  CuteButton,
  StyledContainer,
  ButtonContainer,
  LoadingContainer,
} from "../components/styles";
import { CredentialsContext } from "../components/CredentialsContext";
import AnimalItem from "../components/AnimalItem";

import * as ImagePicker from "expo-image-picker";
import baseAxios from "../components/axios/ApiManager";
//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const LostAndFound = () => {
  const [isFound, setIsFound] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("lost");

  async function getAnimals(isFound) {
    try {
      setLoading(true);
      console.log(isFound);
      const response = await baseAxios.get("/animal/" + isFound);
      console.log(response.data);
      setAnimals(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  const handleButtonPress = async (button) => {
    if (!loading) {
      const newIsFound = button === "found";
      setIsFound(newIsFound);
      await getAnimals(newIsFound);
      setActiveButton(button);
    }
  };

  useEffect(() => {
    getAnimals(isFound);
  }, []);

  return (
    <ScrollView>
      <StyledContainer>
        <ButtonContainer>
          <CuteButton
            active={activeButton === "lost"}
            onPress={() => {
              if (!loading) {
                setIsFound(false);
                handleButtonPress("lost");
              }
            }}
            disabled={loading} // Disable button during loading
          >
            <ButtonText>Lost Animals</ButtonText>
          </CuteButton>
          <CuteButton
            active={activeButton === "found"}
            onPress={() => {
              if (!loading) {
                setIsFound(true);
                handleButtonPress("found");
              }
            }}
            disabled={loading} // Disable button during loading
          >
            <ButtonText>Found Animals</ButtonText>
          </CuteButton>
        </ButtonContainer>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="blue" />
          </LoadingContainer>
        ) : (
          <>
            {animals !== null && animals.length > 0 ? (
              animals.map((animal, index) => (
                <AnimalItem key={index} animal={animal} />
              ))
            ) : (
              <PageTitle>There are no animals in this list.</PageTitle>
            )}
          </>
        )}
      </StyledContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
});

export default LostAndFound;
