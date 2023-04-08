import React, {useState} from 'react';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    ButtonText,
    StyledButton, 
    StyledInputLabel,
    StyledTextInput,    
    Colors,
    MsgBox, 
    Line,
    ExtraText, 
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

//formik
import {Formik} from 'formik';

//colors
const {purple, light_yellow, grey, orange, blue} = Colors;


const Login = () => {
        const [hidePassword, setHidePassword] = useState(true);
    return (
        <StyledContainer>
            <StatusBar style="purple"/>
            <InnerContainer>
                <PageLogo source={require('./../assets/images/logo.png')}/>
                <PageTitle>Lost Animals App</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label="Email Address"
                                icon="mail"
                                placeholder="example@domain.com"
                                placeholderTextColor={purple}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />

                            <MyTextInput 
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={purple}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                            </StyledButton>
                            <Line />
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={purple} size={25} />
                                <ButtonText google={true}>
                                    Sign in with Google
                                </ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText> Don't have an account already? </ExtraText>
                                <TextLink>
                                    <TextLinkContent>Signup</TextLinkContent>
                                </TextLink>
                            </ExtraView>

                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={purple} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword? 'md-eye-off' : 'md-eye'} size={30} color={grey} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login;