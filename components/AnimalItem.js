import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const AnimalItem = ({ animal }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: animal.imageUri }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{animal.name}</Text>
        <Text style={styles.info}>{animal.breed} | {animal.color} | {animal.age} | {animal.species}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
  },
});

export default AnimalItem;
