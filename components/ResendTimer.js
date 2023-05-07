import React from "react";
import { View } from "react-native";
import {
  Colors,
  BottomHalf,
  IconBg,
  StyledContainer,
  TopHalf,
  PageTitle,
  InfoText,
  EmphasizeText,
  StyledButton,
  ButtonText,
  InlineGroup,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import { defaults } from "react-native-axios";
import { ActivityIndicator } from "react-native-web";

const { purple } = Colors;

const ResendTimer = ({
  activeResend,
  resendEmail,
  resendingEmail,
  resendStatus,
  timeLeft,
  targetTime,
}) => {
  return (
    <View>
      <InlineGroup>
        <InfoText>Didn't received the email? </InfoText>
        {!resendingEmail && (
          <TextLink
            style={{ opacity: !activeResend && 0.5 }}
            disabled={!activeResend}
            onPress={resendEmail}
          >
            <TextLinkContent resendStatus={resendStatus}>
              {resendStatus}
            </TextLinkContent>
          </TextLink>
        )}

        {resendingEmail && (
          <TextLink disabled>
            <TextLinkContent>
              <ActivityIndicator color={purple} />
            </TextLinkContent>
          </TextLink>
        )}
      </InlineGroup>
      {!activeResend && (
        <InfoText>
          in <EmphasizeText> {timeLeft || targetTime}</EmphasizeText> second(s)
        </InfoText>
      )}
    </View>
  );
};

export default ResendTimer;
