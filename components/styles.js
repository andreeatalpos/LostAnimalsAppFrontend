import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors

export const Colors = {
    white: "#FFFFFF",
    black: "#000000",
    pink: "#FFD1DC",
    orange: "#FFA07A",
    light_yellow: "#FFF8DC",
    blue: "#ADD8E6",
    purple: "#B19CD9",
    grey: "#C9C9C9",
    green: "#B4E197",
    red: "#FF6961",
    light_green: 'rgba(16, 185, 129, 0.1)'
}


const {white, pink, orange, light_yellow, blue, purple, grey, green, red, light_green, black} = Colors

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight +30}px;
    padding-bottom: 45%;
    background-color: ${white};
    flexGrow: 1;
`;

export const StyledContainerAnimal = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: 5%;
    background-color: ${white};
    flexGrow: 1;
`;

export const StyledTextInputForm = styled.TextInput`
    background-color: ${light_yellow};
    padding: 15px;
    padding-left: 20px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 15px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${black};
`;

export const StyledTextInputFormBigger = styled.TextInput`
    background-color: ${light_yellow};
    padding: 15px;
    padding-left: 20px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 15px;
    height: 100px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${black};
`;


export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 200px;
    height: 175px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${purple};
    padding: 15px;

    ${(props) => props.home == true && `
        font-size: 35px;
    `}

`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1.5px;
    font-weight: bold;
    color: ${blue};
    text-align: center;

    ${(props) => props.home == true && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 80%;
    margin-left: 10%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${light_yellow};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 15px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${purple};
`;

export const StyledInputLabel = styled.Text`
    color: ${purple};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38%;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38%;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${pink};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    // ${(props) => props.google == true && `
    //     background-color: ${green};
    //     flex-direction: row;
    //     justify-content: center;
    // `}
`;

export const ButtonText = styled.Text`
    color: ${purple};
    font-size: 16px;

    ${(props) => props.google == true && `
    padding: 3%;
    padding-left: 25px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? green : red };
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${blue};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${blue};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${purple};
    font-size: 18px;

    ${(props) => {
        const {resendStatus } = props;
        if (resendStatus === 'Failed') {
            return `color: ${red}`;
        } else if (resendStatus === 'Sent!') {
            return `color: ${green}`;
        }
    }}
`;

export const HomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${pink};
    margin-bottom: 10px;
    margin-top: 10px;
`

export const HomeImage = styled.Image`
    height: 30%;
    min-width: 100%;
`
// verification components
export const TopHalf = styled.View`
    flex: 1;
    justify-content: center;
    align-content: center;
    padding: 100px;
`;

export const BottomHalf = styled.View`
    justify-content: space-around;
`;

export const IconBg = styled.View`
    background-color: ${light_green};
    border-radius: 250px;
    height: 250px;
    width: 250px;
    justify-content: center; //centers icon vertically
    align-items: center; //centers icon horizontally
    margin-top: -60px; //moves IconBg up by half its height to center it vertically
    display: flex;
    justify-content: center;
`;

export const InfoText = styled.Text`
    color: ${grey};
    font-size: 15px;
    text-align: center;
`;

export const EmphasizeText = styled.Text`
    font-weight: bold;
    font-style: italic;
`;

export const InlineGroup = styled.View`
    flex-direction: 'row';
    padding: 10px;
    justify-content: center;
    align-content: center;
`;

export const AppBackground = styled.View`
  flex: 1;
  background-color: ${white};
`;

export const HomeStyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${light_green};
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    margin-vertical: 10px;
    height: 60px;
`;

export const ImageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export const SelectedImage = styled.Image`
  max-width: 100%;
  max-height: 250px;
`;

export const CuteButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${pink};
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    margin-vertical: 10px;
    margin-left: 20%;
    margin-right: 20%;
    height: 60px;
`


