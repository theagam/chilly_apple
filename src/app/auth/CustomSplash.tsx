import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
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
    backgroundColor: '#fff',
  },
  logo: {
    width: 260,
    height: 165,
  },
});
