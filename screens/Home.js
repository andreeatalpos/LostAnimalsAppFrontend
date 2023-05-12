import React, { useContext } from "react";
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
} from "./../components/styles";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "./../components/CredentialsContext";
import AnimalPage from "./AnimalPage";

const Home = ({ navigation }) => {
  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { email, fullName, phoneNumber, role, username } = storedCredentials;
  const formattedPhoneNumber = phoneNumber
    ? phoneNumber.toString().substring(1)
    : "";

  const clearLogin = () => {
    AsyncStorage.removeItem("currentUserCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <StatusBar style="purple" />
      <InnerContainer>
        <HomeImage source={require("./../assets/images/home9.jpg")} />
        <HomeContainer>
          <PageTitle home={true}>
            Welcome, {fullName || "James Smith"}!
          </PageTitle>
          <SubTitle home={true}>
            {"Helping you to reunite with your furry friend"}
          </SubTitle>
          {/* <SubTitle home={true}>{username || 'james.smith'}</SubTitle>
                    <SubTitle home={true}>{email || 'james.smith@gmail.com'}</SubTitle>
                    <SubTitle home={true}>{formattedPhoneNumber || '0123456789'}</SubTitle>  */}
          <StyledFormArea>
            <View>
              <SubTitle>Lost or Found an Animal?</SubTitle>
              <HomeStyledButton
                onPress={() =>
                  navigation.navigate("AnimalPage", { isFound: false })
                }
              >
                <ButtonText>I lost my pet</ButtonText>
              </HomeStyledButton>
              <HomeStyledButton
                // onPress={() => navigation.navigate('FoundAnimal')}
                onPress={() =>
                  navigation.navigate("AnimalPage", { isFound: true })
                }
              >
                <ButtonText>I found a pet</ButtonText>
              </HomeStyledButton>
              <HomeStyledButton
                // onPress={() => navigation.navigate('FoundAnimal')}
                onPress={() =>
                  navigation.navigate("AnimalsList", { isFound: false })
                }
              >
                <ButtonText>Show all lost animals</ButtonText>
              </HomeStyledButton>
            </View>
            {/* <Avatar source={require('./../assets/images/logo.png')}/> */}
            <Line />
          </StyledFormArea>
        </HomeContainer>
      </InnerContainer>
    </>
  );
};

export default Home;
