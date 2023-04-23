import React, {useState, useContext} from 'react';
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
import { View, ActivityIndicator } from 'react-native';

//icons
import {Octicons, Ionicons, Fontisto, MaterialIcons} from '@expo/vector-icons';

//formik
import {Formik} from 'formik';

//colors
const {purple, light_yellow, grey, orange, blue} = Colors;

//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
//axios
import authAxios from '../components/axios/authAxios';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Register = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    

    const handleRegister = async (credentials, setSubmitting) => {
        handleMessage(null);
        try {
            const response = await authAxios.post("/register", {
                username: credentials.username,
                fullName: credentials.fullName,
                email: credentials.email,
                password: credentials.password,
                confirmedPassword: credentials.confirmPassword,
                phoneNumber: credentials.phoneNumber
            });
            console.log(response.data.userDTO)
            const token = response.data;
            await saveToken(token);

            persistLogin(response.data.userDTO, response.message, response.status )
            
            } catch (error) {
            if (error.response && error.response.status === 401) {
                handleMessage("Invalid username or password.", "FAILED");
            } else {
                console.log(error)
                handleMessage(
                "An error occurred. Check your network and try again!",
                "FAILED"
                );
            }
            }
        setSubmitting(false);
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

        // Save the token in storage
    const saveToken = async (token) => {
        try {
        await AsyncStorage.setItem('token', JSON.stringify(token));
        } catch (e) {
        console.error('Error saving token to storage:', e);
        }
    }
    
    // Retrieve the token from storage
    const getToken = async () => {
        try {
        const token = await AsyncStorage.getItem('token');
        return token;
        } catch (e) {
        console.error('Error getting token from storage:', e);
        }
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('currentUserCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Persisted login failed!');
        })
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="purple"/>
                <InnerContainer>
                    <PageTitle>Lost Animals App</PageTitle>
                    <SubTitle>Account Signup</SubTitle>

                    <Formik
                        initialValues={{fullName: '', username: '', email: '', password: '', confirmPassword: '', phoneNumber: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.username == '' || values.password == '' || values.fullName == '' || values.email == '' || values.confirmPassword == '' || values.phoneNumber == '') {
                                handleMessage("Please fill all the fields");
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage("Passwords do not match!");
                                setSubmitting(false);
                            }
                            else {
                                handleRegister(values, setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    label="Full Name"
                                    icon="person"
                                    placeholder="James Smith"
                                    placeholderTextColor={grey}
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                />

                                <MyTextInput 
                                    label="Username"
                                    icon="person"
                                    placeholder="james.smith12"
                                    placeholderTextColor={grey}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />

                                <MyTextInput 
                                    label="Phone Number"
                                    icon = "device-mobile"
                                    placeholder="40765123456"
                                    placeholderTextColor={grey}
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    value={values.phoneNumber}
                                    keyboardType="phone-pad"
                                />


                                <MyTextInput 
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="example@domain.com"
                                    placeholderTextColor={grey}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />

                                <MyTextInput 
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={grey}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <MyTextInput 
                                    label="Confirm Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={grey}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <MsgBox type = {messageType}>{message}</MsgBox>
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Register</ButtonText>
                                </StyledButton>}

                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color= {blue}  />
                                </StyledButton>}
                                <Line />
                                <ExtraView>
                                    <ExtraText> Already have an account? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Login")}>
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>

                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
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

export default Register;