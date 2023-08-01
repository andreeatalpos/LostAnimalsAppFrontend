import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import {
  PageTitle,
  ButtonText,
  CuteButton,
  ButtonContainer,
  LoadingContainer,
  StyledContainerLF,
} from "../components/styles";
import AnimalItem from "../components/AnimalItem";
import baseAxios from "../components/axios/baseAxios";

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
      <StyledContainerLF>
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
                <AnimalItem
                  key={index}
                  animal={animal}
                  showContactDetails={true}
                  showCheckAgainButton={false}
                />
              ))
            ) : (
              <PageTitle>There are no animals in this list.</PageTitle>
            )}
          </>
        )}
      </StyledContainerLF>
    </ScrollView>
  );
};

export default LostAndFound;
