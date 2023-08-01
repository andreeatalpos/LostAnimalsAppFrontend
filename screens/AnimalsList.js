import React, { useState } from "react";
import { ButtonText, CuteButton } from "./../components/styles";
import { View } from "react-native";
import baseAxios from "../components/axios/baseAxios";
import AnimalItem from "../components/AnimalItem";
import { ScrollView } from "react-native-gesture-handler";

const AnimalsList = ({ navigation, route }) => {
  const [animals, setAnimals] = useState([]);
  async function getAnimals() {
    try {
      const response = await baseAxios.get(
        "/animal/similar/" + "animal_276bfd63.jpeg"
      );
      setAnimals(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <ScrollView>
      <View>
        <CuteButton onPress={getAnimals}>
          <ButtonText>Show animals</ButtonText>
        </CuteButton>
        {animals.map((animal, index) => (
          <AnimalItem
            key={index}
            animal={animal}
            filename={"animal_276bfd63.jpeg"}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default AnimalsList;
