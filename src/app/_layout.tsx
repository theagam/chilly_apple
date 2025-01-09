import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import AuthLayout from './auth/_layout';  // Your Auth layout
import CustomSplashScreen from './auth/customSplash';
import FeaturesLayout from './features/_layout';
import {Stack} from "expo-router"

// const Stack = createStackNavigator();

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null for loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsLoggedIn(true); // If token exists, user is logged in
        } else {
          setIsLoggedIn(false); // No token, user is not logged in
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false); // Handle error, default to false
      }
    };

    checkLoginStatus(); // Run the check when the component mounts
  }, []);

  if (isLoggedIn === null) {
    // Show a loading spinner while checking the login status
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <ActivityIndicator size="large" color="#0000ff" />
      // </View>
      <CustomSplashScreen/>
    );
  }

  return (
    
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="features"  />
      ) : (
        <Stack.Screen name="auth"  />
      )}
    </Stack>
  );
};

export default RootLayout;
