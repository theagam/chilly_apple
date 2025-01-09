import { Image, StyleSheet, Text, View, useColorScheme } from 'react-native';
import React from 'react';

const CustomSplashScreen = () => {
   // Detect the current theme (light/dark)
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        // Ensure white background
        { backgroundColor: colorScheme === 'dark' ? '#ffff' : '#ffff' }, 
      ]}
    >
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
    </View>
  );
};

export default CustomSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 145,
    resizeMode: 'contain',
  },
  
});
