import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  BottomHalf,
  IconBg,
  StyledContainer,
  TopHalf,
  Colors,
  PageTitle,
  InfoText,
  EmphasizeText,
  StyledButton,
  ButtonText,
  InlineGroup,
  TextLink,
  TextLinkContent,
} from "../components/styles";
//icons
import { Octicons, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import ResendTimer from "./../components/ResendTimer";

//colors
const { purple, light_yellow, grey, orange, blue, green } = Colors;

const Verification = () => {
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  //timer
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);

  const [activeResend, setActiveResend] = useState(false);
  let resendTimerInterval;

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      setTimeLeft(null);
      clearInterval(resendTimerInterval);
      setActiveResend(true);
    }
  };

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => {
      calculateTimeLeft(finalTime), 1000;
    });
  };

  useEffect(() => {
    triggerTimer();
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  const resendEmail = async () => {};
  return (
    <StyledContainer
      style={{
        alignItems: "center",
      }}
    >
      <TopHalf>
        <IconBg style={{ justifyContent: "center", alignItems: "center" }}>
          <StatusBar style="dark" />
          <Ionicons name="md-mail-open-outline" size={125} color={purple} />
        </IconBg>
      </TopHalf>
      <BottomHalf>
        <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>
        <InfoText>
          {" "}
          Please verify your email using the link sent to
          <EmphasizeText> {"test.lostanimalsapp@gmail.com"}</EmphasizeText>
        </InfoText>
        <StyledButton
          onPress={() => {}}
          style={{ backgroundColor: green, flexDirection: "row" }}
        >
          <ButtonText>Proceed </ButtonText>
          <Ionicons name="arrow-forward-circle" size={25} color={purple} />
        </StyledButton>
        <ResendTimer
          activeResend={activeResend}
          resendingEmail={resendingEmail}
          resendStatus={resendStatus}
          timeLeft={timeLeft}
          targetTime={targetTime}
          resendEmail={resendEmail}
        />
      </BottomHalf>
    </StyledContainer>
  );
};

export default Verification;
