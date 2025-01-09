import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthLayout from "./auth/_layout";
import FeaturesLayout from "./features/_layout";
import CustomSplashScreen from "./auth/customSplash";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Lato-Bold": require("@/assets/fonts/Lato-Bold.ttf"),
    "Lato-Black": require("@/assets/fonts/Lato-Black.ttf"),
    "Lato-Light": require("@/assets/fonts/Lato-Light.ttf"),
    "Lato-Regular": require("@/assets/fonts/Lato-Regular.ttf"),
    "Lato-Thin": require("@/assets/fonts/Lato-Thin.ttf"),
  });

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(!!token); // Set login state based on token existence
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false); // Stop loading after check
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Show a loading screen while checking login status or loading fonts
  if (isLoading || !fontsLoaded) {
    return (
        <CustomSplashScreen />
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? "features" : "auth"} // Dynamically set initial route
    >
      <Stack.Screen name="auth" component={AuthLayout} />
      <Stack.Screen name="features" component={FeaturesLayout} />
    </Stack.Navigator>
  );
};

export default RootLayout;
