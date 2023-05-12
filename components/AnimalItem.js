import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { ActivityIndicator } from "react-native";

const AnimalItem = ({ animal }) => {
  console.log(animal.description);
  const [imageUri, setImageUri] = useState("");
  useEffect(() => {
    const convertImage = async () => {
      if (animal.file && animal.file.length > 0) {
        setImageUri(animal.file);
      }
    };

    convertImage();
  }, [animal.file]);
  return (
    <View style={styles.container}>
      <View>
        {imageUri ? (
          <Image
            source={{
              uri: `data:image/jpeg;base64,${imageUri}`,
            }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <ActivityIndicator />
        )}
        <Text style={styles.name}>{animal.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
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
  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
  },
});

export default AnimalItem;
