import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ActivityIndicator } from "react-native";
import { ButtonText, CuteButton2 } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const AnimalItem = ({
  animal,
  showContactDetails,
  onPressCheckAgain,
  onPressTrash,
  showCheckAgainButton,
}) => {
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    const convertImage = async () => {
      if (animal.file && animal.file.length > 0) {
        setImageUri(animal.file);
      }
    };

    convertImage();
  }, [animal.file]);

  const handleTrashPress = () => {
    console.log("pressed");
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${imageUri}`,
              }}
              style={styles.image}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.name}>{animal.species}</Text>
          <Text style={styles.name}>{animal.breed}</Text>
          <Text style={styles.name}>{animal.animalInfo}</Text>
          <Text
            style={[styles.name, animal.isFound ? styles.found : styles.lost]}
          >
            {animal.isFound ? "found" : "lost"}
          </Text>
        </View>
      </View>
      {showContactDetails && (
        <View style={styles.contactContainer}>
          <Text style={styles.subTitle}>Contact details:</Text>
          <Text style={styles.info}>{animal.fullName}</Text>
          <Text style={styles.info}>{animal.phoneNumber}</Text>
          <Text style={styles.info}>{animal.email}</Text>
        </View>
      )}
      {showCheckAgainButton && (
        <View style={styles.buttonContainer}>
          <CuteButton2 onPress={onPressCheckAgain}>
            <ButtonText>Check again</ButtonText>
          </CuteButton2>
          <TouchableOpacity style={styles.trashButton} onPress={onPressTrash}>
            <Ionicons name="trash" size={35} color="#000"></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  dataContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
  },
  contactContainer: {
    flex: 1,
    marginLeft: 20,
    marginBottom: 60,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  found: {
    color: "green",
  },
  lost: {
    color: "red",
  },
  buttonContainer: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    right: 0,
    flexDirection: "row",
  },
  trashButton: {
    flex: 1,
    top: 25,
  },
  similar: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AnimalItem;
