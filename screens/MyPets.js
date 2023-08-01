import React, { useContext, useState, useEffect } from "react";
import { PageTitle, LoadingContainer } from "./../components/styles";
import { View, ActivityIndicator } from "react-native";
import { CredentialsContext } from "./../components/CredentialsContext";
import baseAxios from "../components/axios/baseAxios";
import AnimalItem from "../components/AnimalItem";
import { ScrollView } from "react-native-gesture-handler";
import SimilarAnimalsList from "../components/SimilarAnimalsList";

const MyPets = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilename, setSelectedFilename] = useState("");
  const [showSimilarImages, setShowSimilarImages] = useState(false);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { email, fullName, phoneNumber, role, username } = storedCredentials;

  useEffect(() => {
    const reloadAnimals = navigation.addListener("focus", () => {
      getAnimals();
    });

    return reloadAnimals;
  }, [navigation]);

  async function getAnimals() {
    try {
      setLoading(true);
      const response = await baseAxios.get("/animal/pets/" + username);
      setAnimals(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message + "aici oare");
      setLoading(false);
    }
  }

  const handleCheckAgain = (filename) => {
    setSelectedFilename(filename);
    setShowSimilarImages(true);
  };

  async function handlePressTrash(filename) {
    try {
      setLoading(true);
      await baseAxios.delete("/animal/" + filename);
      getAnimals();
      setLoading(false);
    } catch (error) {
      console.log(error.message + "ceeeee");
      setLoading(false);
    }
  }

  const handleExitSimilarImagesList = () => {
    setShowSimilarImages(false);
  };

  return (
    <ScrollView>
      {!showSimilarImages && (
        <PageTitle>The animals you helped over time :)</PageTitle>
      )}
      <View>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="blue" />
          </LoadingContainer>
        ) : (
          <>
            {!showSimilarImages && animals !== null && animals.length > 0 ? (
              animals.map((animal, index) => (
                <AnimalItem
                  key={index}
                  animal={animal}
                  showContactDetails={false}
                  onPressCheckAgain={() => handleCheckAgain(animal.filename)}
                  onPressTrash={() => handlePressTrash(animal.filename)}
                  showCheckAgainButton={true}
                />
              ))
            ) : (
              <>
                {!showSimilarImages && <PageTitle>No animals found.</PageTitle>}
              </>
            )}
          </>
        )}
      </View>
      {showSimilarImages && (
        <SimilarAnimalsList
          route={{
            params: { imageFileName: selectedFilename },
          }}
          handleExitSimilarImagesList={handleExitSimilarImagesList}
        />
      )}
    </ScrollView>
  );
};

export default MyPets;
