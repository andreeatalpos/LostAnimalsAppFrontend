import React from "react";
import { Colors, AppBackground } from "../components/styles";
//colors
const { purple, light_yellow, grey, orange, blue, white } = Colors;
// react navigation
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
//screens
import Login from "./../screens/Login";
import Register from "./../screens/Register";
import Home from "./../screens/Home";
import AnimalPage from "../screens/AnimalPage";
//credentials context
import { CredentialsContext } from "./../components/CredentialsContext";
import AnimalForm from "../components/AnimalForm";

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
      {({ storedCredentials, setStoredCredentials }) => (
        <AppBackground>
          <NavigationContainer>
            {storedCredentials ? (
              <Drawer.Navigator
                drawerContent={(props) => (
                  <CustomDrawerContent
                    storedCredentials={storedCredentials}
                    onLogout={() => setStoredCredentials(null)}
                    {...props}
                  />
                )}
              >
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="AnimalForm" component={AnimalForm} />
                <Stack.Screen name="AnimalPage" component={AnimalPage} />
              </Drawer.Navigator>
            ) : (
              <Stack.Navigator
                name="stack-navigator"
                screenOptions={{
                  headerTintColor: orange,
                  headerTransparent: true,
                  headerTitle: "",
                  headerLeftContainerStyle: {
                    paddingLeft: 20,
                  },
                }}
                initialRouteName="Login"
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </AppBackground>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
