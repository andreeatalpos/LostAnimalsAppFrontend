import React from 'react';
import { Colors, AppBackground } from '../components/styles';
//colors
const {purple, light_yellow, grey, orange, blue, white} = Colors;
// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
//screens
import Login from './../screens/Login';
import Register from './../screens/Register';
import Home from './../screens/Home';
import AnimalForm from '../screens/AnimalForm';
//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
    const { storedCredentials, onLogout } = props;

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {storedCredentials ? (
                <DrawerItem label="Logout" onPress={() => onLogout()} />
            ) : null}
        </DrawerContentScrollView>
    );
};

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials, setStoredCredentials}) => (
                <AppBackground>
                    <NavigationContainer>
                        {storedCredentials ? (
                            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent storedCredentials={storedCredentials} onLogout={() => setStoredCredentials(null)} {...props} />}>
                                <Drawer.Screen name="Home" component={Home} />
                                <Stack.Screen name="AnimalForm" component={AnimalForm} />
                            </Drawer.Navigator>
                        ) : (
                            <Stack.Navigator
                                name = "stack-navigator"
                                screenOptions={{
                                    headerStyled: {
                                        brackgroundColor: 'transparent'
                                    },
                                    headerTintColor: orange,
                                    headerTransparent: true,
                                    headerTitle: '',
                                    headerLeftContainerStyle: {
                                        paddingLeft: 20
                                    }
                                }}
                                initialRouteName='Login'
                            >
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Register" component={Register} />
                            </Stack.Navigator>
                        )}
                    </NavigationContainer>
                </AppBackground>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack;
