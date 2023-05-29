import React, { useContext, useState, useEffect } from "react";
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
  LoadingContainer,
} from "./../components/styles";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// credentials context
import { CredentialsContext } from "./../components/CredentialsContext";
import AnimalPage from "./AnimalPage";
import baseAxios from "../components/axios/ApiManager";
import AnimalItem from "../components/AnimalItem";
import { ScrollView } from "react-native-gesture-handler";

const MyPets = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { email, fullName, phoneNumber, role, username } = storedCredentials;

  useEffect(() => {
    getAnimals();
  }, []);

  async function getAnimals() {
    try {
      setLoading(true);
      const response = await baseAxios.get("/animal/pets/" + username);
      setAnimals(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  return (
    <ScrollView>
      <PageTitle>The animals you helped since now :)</PageTitle>
      <View>
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
              <PageTitle>No animals found.</PageTitle>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default MyPets;
