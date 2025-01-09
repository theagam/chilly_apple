import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import CustomTextInput from '@/src/components/customText';
import PasswordInput from '@/src/components/passwordInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/src/constants';


const LoginScreen = (props: any) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigation: NavigationProp<any, any> = useNavigation();


  //  handle login function
  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
  
    try {
      const response = await axios.post(`${API_BASE_URL}login`, {
        username,
        password,
      });
  
      if (response.status === 200 && response.data.success) {
        Alert.alert('Success', 'Login successful!');
        console.log('Login successful:', response.data);
        ``
        // Store the token in AsyncStorage after successful login
        const userToken = response.data.customerMaster.token;
        if (userToken) {
          await AsyncStorage.setItem('userToken', userToken); 
          console.log("loggedIn")
          navigation.navigate('features', { screen: 'header' });
        }
        
       
      } else if (response.data.message === 'User not registered') {
        Alert.alert('Error', 'You are not registered. Please sign up first.');
      } else {
        Alert.alert('Error', response.data.message || 'Login failed!');
      }
    } catch (error:any) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while logging in');
      console.error('Login error:', error);
    }
  };

  
  
  return (
    <ImageBackground
      source={require('@/assets/images/login1.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        {/* Login Title */}
        <Text style={styles.loginTitle}>LOGIN</Text>
        <View style={{ gap: 10 }}>
          {/* Username Input */}
          <CustomTextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          {/* Password Input */}
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Forgot Password Link */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <TouchableOpacity onPress={() => navigation.navigate('auth', { screen: 'signup' })}>
          <Text style={styles.signup}>
            New to Chilly Apple?{' '}
            <Text style={styles.signupNow}>Signup Now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  loginTitle: {
    fontSize: 24,
    color: '#B61515',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#28850b',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  signup: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
  signupNow: {
    color: '#B61515',
  },
});

export default LoginScreen;
