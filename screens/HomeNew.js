import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import AnimalPage from "./AnimalPage";
import AnimalForm from "../components/AnimalForm";
import SimilarAnimalsList from "../components/SimilarAnimalsList";
import baseAxios from "../components/axios/baseAxios";

const HomeNew = () => {
  const navigation = useNavigation();
  const [isFound, setIsFound] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showAnimalPage, setShowAnimalPage] = useState(false);
  const [showAnimalForm, setShowAnimalForm] = useState(false);
  const [showSimilarImages, setShowSimilarImages] = useState(false);

  const handleShowAnimalPage = (isFound) => {
    setShowAnimalPage(true);
    setIsFound(isFound);
  };

  const handleShowAnimalForm = (fileName) => {
    setFileName(fileName);
    setShowAnimalPage(false);
    setShowAnimalForm(true);
  };

  async function handleCancelAnimalForm() {
    try {
      const response = await baseAxios.delete("/image/" + fileName);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete image");
    }
    setShowAnimalForm(false);
  }

  const handleAnimalFormSubmit = () => {
    setShowAnimalForm(false);
    setShowSimilarImages(true);
  };

  const handleCancelAnimalPage = () => {
    setShowAnimalPage(false);
  };

  const handleExitSimilarImagesList = () => {
    setShowSimilarImages(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/home.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {!showAnimalPage && !showAnimalForm && !showSimilarImages && (
            <Home handleShowAnimalPage={handleShowAnimalPage} />
          )}
          {showAnimalPage && (
            <View style={styles.overlay2}>
              <AnimalPage
                navigation={navigation}
                route={{ params: { isFound: isFound } }}
                handleCancelAnimalPage={handleCancelAnimalPage}
                handleShowAnimalForm={handleShowAnimalForm}
              />
            </View>
          )}

          {showAnimalForm && (
            <View style={styles.overlay2}>
              <AnimalForm
                route={{
                  params: { isFound: isFound, imageFileName: fileName },
                }}
                handleCancelAnimalForm={handleCancelAnimalForm}
                handleAnimalFormSubmit={handleAnimalFormSubmit}
              />
            </View>
          )}
          {showSimilarImages && (
            <View style={styles.similar}>
              <SimilarAnimalsList
                route={{
                  params: { imageFileName: fileName },
                }}
                handleExitSimilarImagesList={handleExitSimilarImagesList}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    justifyContent: "center",
  },
  overlay2: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
  similar: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default HomeNew;
