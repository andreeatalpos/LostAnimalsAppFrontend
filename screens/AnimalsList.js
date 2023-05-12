import React, { useContext, useState } from "react";
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  ButtonText,
  StyledButton,
  Colors,
  Line,
  HomeContainer,
  HomeImage,
  HomeStyledButton,
  CuteButton,
} from "./../components/styles";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "./../components/CredentialsContext";
import AnimalPage from "./AnimalPage";
import baseAxios from "../components/axios/ApiManager";
import AnimalItem from "../components/AnimalItem";

const AnimalsList = ({ navigation, route }) => {
  const { isFound } = route.params;
  const [animals, setAnimals] = useState([]);
  async function getAnimals() {
    try {
      const response = await baseAxios.get("/animal/" + isFound);
      // console.log(response.data);
      setAnimals(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View>
      <CuteButton onPress={getAnimals}>
        <ButtonText>Show animals</ButtonText>
      </CuteButton>
      {animals.map((animal, index) => (
        <AnimalItem key={index} animal={animal} />
      ))}
    </View>
  );
};

export default AnimalsList;
