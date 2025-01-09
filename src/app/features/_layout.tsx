import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
// import MyDrawer from './drawer';
import Header from './drawer';

export default function FeaturesLayout() {
    const Stack = createStackNavigator();
    
  return (
    <Stack.Navigator initialRouteName='drawer'>
      <Stack.Screen
        name="drawer"
        component={Header}
        options={{ headerShown: false }}
      />
    <Stack.Screen
      name="home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    
  </Stack.Navigator>
  )
}