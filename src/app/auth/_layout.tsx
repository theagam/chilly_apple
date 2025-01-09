import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./login";
import SignUpScreen from "./signup";
import CustomSplashScreen from "./customSplash";

const Stack = createStackNavigator();

function AuthLayout() {
  return (
    <Stack.Navigator initialRouteName="splashScreen">
      <Stack.Screen
        name="splashScreen"
        component={CustomSplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      /> 
    </Stack.Navigator>
  );
}

export default AuthLayout;

