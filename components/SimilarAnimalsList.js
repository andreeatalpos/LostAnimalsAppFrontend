import React, { useState, useEffect } from "react";
import { PageTitle, StyledContainerSimilar } from "./styles";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
//credentials context
import baseAxios from "./axios/baseAxios";
import AnimalItem from "./AnimalItem";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const SimilarAnimalsList = ({ route, handleExitSimilarImagesList }) => {
  const { imageFileName } = route.params;
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAnimals();
  }, []);

  async function getAnimals() {
    try {
      const response = await baseAxios.get("/animal/similar/" + imageFileName);
      setAnimals(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }

  return (
    <ScrollView>
      <StyledContainerSimilar>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleExitSimilarImagesList}
            style={{ marginLeft: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <PageTitle>Similar Animal Search Results</PageTitle>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          animals.map((animal, index) => (
            <AnimalItem
              key={index}
              animal={animal}
              showContactDetails={true}
              showCheckAgainButton={false}
            />
          ))
        )}
      </StyledContainerSimilar>
    </ScrollView>
  );
};

export default SimilarAnimalsList;
