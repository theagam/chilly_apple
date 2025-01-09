import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home";
import Headers from "./header";

export default function FeaturesLayout() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="header">
      <Stack.Screen
        name="header"
        component={Headers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
