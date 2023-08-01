import React, { useContext } from "react";
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  ButtonText,
  HomeContainer,
  HomeStyledButton,
} from "./../components/styles";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
//credentials context
import { CredentialsContext } from "./../components/CredentialsContext";

const Home = ({ handleShowAnimalPage }) => {
  //context
  const { storedCredentials } = useContext(CredentialsContext);
  const { fullName } = storedCredentials;

  return (
    <>
      <StatusBar style="purple" />
      <InnerContainer>
        <HomeContainer>
          <PageTitle home={true}>
            {fullName != null ? "Welcome, " + fullName : "Welcome to PetFinder"}
            !
          </PageTitle>
          <SubTitle home={true}>
            {"Helping you to reunite with your furry friend"}
          </SubTitle>
          <StyledFormArea>
            <View>
              <SubTitle>Lost or Found an Animal?</SubTitle>
              <HomeStyledButton onPress={() => handleShowAnimalPage(false)}>
                <ButtonText>I lost my pet</ButtonText>
              </HomeStyledButton>
              <HomeStyledButton onPress={() => handleShowAnimalPage(true)}>
                <ButtonText>I found a pet</ButtonText>
              </HomeStyledButton>
            </View>
          </StyledFormArea>
        </HomeContainer>
      </InnerContainer>
    </>
  );
};

export default Home;
