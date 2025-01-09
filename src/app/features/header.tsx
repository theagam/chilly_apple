import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { API_BASE_URL } from "@/src/constants";
import HomeScreen from "./home";
import CustomDrawerContent from "@/src/components/customDrawer";
import { LinearGradient } from "expo-linear-gradient";


const Headers = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} screenOptions={{}} />
      )}
    >
      <Drawer.Screen
  name="Home"
  component={HomeScreen}
  options={{
    headerTintColor: "#fff",
    headerBackground: () => (
      <LinearGradient
        colors={["#FF5739", "#B61515"]} // Gradient colors
        style={{ flex: 1 }} // Ensure it covers the entire header
        start={{ x: 0, y: 0 }} // Starting point (top-left)
        end={{ x: 1, y: 0 }} // Ending point (top-right)
      />
    ),
    headerRight: () => (
      <View style={styles.iconContainer}>
        <TouchableOpacity>
            
          <Icon
            name="notifications-outline"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="cart-outline"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    ),
  }}
/>

    </Drawer.Navigator>
  );
};

export default Headers;

const styles = StyleSheet.create({

  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
  },
});
