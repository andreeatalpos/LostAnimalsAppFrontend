import React, { useContext, useEffect } from "react";
import { Colors, AppBackground } from "../components/styles";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { CredentialsContext } from "./../components/CredentialsContext";
import BottomBar from "../screens/BottomBar";
import Home from "./../screens/Home";
import AnimalForm from "../components/AnimalForm";
import AnimalPage from "../screens/AnimalPage";
import AnimalsList from "../screens/AnimalsList";
import HomeNew from "../screens/HomeNew";
import Login from "./../screens/Login";
import Register from "./../screens/Register";
import LostAndFound from "../screens/LostAndFound";
import UserAccountPage from "../screens/UserAccountPage";
import MyPets from "../screens/MyPets";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const { exp } = jwtDecode(token);
        const expirationDate = new Date(exp * 1000);

        console.log(expirationDate);
        console.log(exp);
        if (Date.now() >= exp * 1000) {
          console.log("EXPIREEED");
          // Token has expired
          setStoredCredentials(null);
        }
      }
    };

    checkTokenExpiration();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {storedCredentials ? (
        <DrawerItem label="Logout" onPress={() => setStoredCredentials(null)} />
      ) : null}
    </DrawerContentScrollView>
  );
};

const RootStack = () => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  return (
    <AppBackground>
      <NavigationContainer>
        {storedCredentials ? (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen name="HomeNew" component={HomeNew} />
            <Drawer.Screen name="AnimalForm" component={AnimalForm} />
            <Drawer.Screen
              name="AnimalPage"
              component={AnimalPage}
              initialParams={{ isFound: false }}
            />
            <Drawer.Screen name="AnimalsList" component={AnimalsList} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="LostAndFound" component={LostAndFound} />
            <Drawer.Screen name="UserAccountPage" component={UserAccountPage} />
            <Drawer.Screen name="MyPets" component={MyPets} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerTransparent: true,
              headerTitle: "",
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        )}
        <BottomBar />
      </NavigationContainer>
    </AppBackground>
  );
};

export default RootStack;
