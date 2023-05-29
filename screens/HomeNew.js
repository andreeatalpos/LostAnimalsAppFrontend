import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import AnimalPage from "./AnimalPage";
import AnimalForm from "../components/AnimalForm";

const HomeNew = () => {
  const navigation = useNavigation();
  const [isFound, setIsFound] = useState(false); // Default value is false
  const [fileName, setFileName] = useState("");
  const [showAnimalPage, setShowAnimalPage] = useState(false);
  const [showAnimalForm, setShowAnimalForm] = useState(false);

  const handleShowAnimalPage = (isFound) => {
    setShowAnimalPage(true);
    setIsFound(isFound);
  };

  const handleShowAnimalForm = (fileName) => {
    setFileName(fileName);
    setShowAnimalPage(false);
    setShowAnimalForm(true);
  };

  const handleCancelAnimalForm = () => {
    setShowAnimalForm(false);
  };

  const handleAnimalFormSubmit = () => {
    setShowAnimalForm(false);
  };

  const handleCancelAnimalPage = () => {
    setShowAnimalPage(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/home.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {!showAnimalPage && !showAnimalForm && (
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
        </View>
      </ImageBackground>

      {/* Add the BottomBar component */}
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
    padding: 20,
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
