import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { CredentialsContext } from "../components/CredentialsContext";
import {
  ButtonContainer,
  InnerContainer,
  PageTitle,
  StyledContainer,
  SubTitle,
  CuteButton,
  ButtonText,
  PageLogo,
  InnerContainerLeft,
  InnerItem,
  CuteButton2,
} from "../components/styles";

const UserAccountPage = () => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { email, fullName, phoneNumber, role, username } = storedCredentials;

  const handleLogout = () => {
    setStoredCredentials(null);
  };

  return (
    <StyledContainer>
      <PageTitle>Account Page</PageTitle>

      <InnerContainer>
        <PageLogo source={require("./../assets/images/userlogo.png")} />
        <InnerItem>
          <InnerContainerLeft>
            <SubTitle>Account details: </SubTitle>
            <SubTitle>Username: {username}</SubTitle>
            <SubTitle>Email: {email}</SubTitle>
            <SubTitle>Full Name: {fullName}</SubTitle>
            <SubTitle>Phone Number: {phoneNumber}</SubTitle>
          </InnerContainerLeft>
        </InnerItem>
        <InnerItem>
          <CuteButton2 onPress={handleLogout}>
            <ButtonText>Logout</ButtonText>
          </CuteButton2>
        </InnerItem>
      </InnerContainer>
    </StyledContainer>
  );
};

export default UserAccountPage;
