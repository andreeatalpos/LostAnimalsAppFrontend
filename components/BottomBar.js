import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const BottomBar = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState(null);

  const buttons = [
    {
      title: "Home",
      iconName: "home",
      backgroundColor: "#E0E0E0",
      isActive: false,
      screen: "HomeScreen",
    },
    {
      title: "Lost & Found",
      iconName: "search",
      backgroundColor: "#E0E0E0",
      isActive: false,
      screen: "LostAndFound",
    },
    {
      title: "My pets",
      iconName: "paw",
      backgroundColor: "#E0E0E0",
      isActive: false,
      screen: "MyPets",
    },
  ];

  const handleButtonPress = (index, screen) => {
    setActiveButton(index === activeButton ? null : index);
    navigation.navigate(screen);
    setActiveButton(null);
  };
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            {
              backgroundColor:
                activeButton === index ? "#4CAF50" : button.backgroundColor,
            },
          ]}
          onPress={() => {
            handleButtonPress(index, button.screen);
          }}
        >
          <Ionicons name={button.iconName} size={24} color="#fff" />
          <Text style={styles.buttonText}>{button.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#F5F5F5",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  buttonText: {
    fontSize: 12,
    marginTop: 4,
    color: "#000",
  },
});

export default BottomBar;
