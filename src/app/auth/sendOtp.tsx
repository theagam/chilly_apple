import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import axios from 'axios';
import CustomTextInput from '@/src/components/customText';
  
  const SendOTP = (props: any) => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
  
    const sendOtp = async () => {
      try {
        const response = await axios.get(
          `https://chillyapple.com/SN-CH-Test/api/send-signup-otp?mobile=${mobileNumber}`,
        );
        if (response.status === 200) {
          // Alert.alert('Success', 'OTP Sent');
          props.navigation.navigate('Sign',{
              name: username,
              email: userEmail,
              mobile: mobileNumber
          });
        } else {
          Alert.alert('Error', response.data.message || 'Failed to send OTP');
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Network error');
      }
    };
    return (
      <ImageBackground
        source={require('@/assets/images/signup_bg.png')}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.signUpText}>SIGN UP</Text>
            <View style={styles.lineStyle}></View>
            <Text style={styles.subText}>Give us some Valuable Information</Text>
          </View>
          <View style={{gap: 10}}>
            <CustomTextInput
              placeholder="Name"
              value={username}
              onChangeText={setUsername}
            />
            <CustomTextInput
              placeholder="Email (Optional)"
              value={userEmail}
              onChangeText={setUserEmail}
            />
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.mobileInput}
                placeholder="Mobile No."
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
              <TouchableOpacity onPress={sendOtp}>
                <Text style={styles.sendOtpText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };
  
  export default SendOTP;
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 35,
    },
    headerContainer: {
      gap: 5,
    },
    signUpText: {
      color: '#B61515',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    lineStyle: {
      borderBottomWidth: 2,
      width: 50,
      borderBottomColor: '#B61515',
      alignSelf: 'center',
    },
    subText: {
      textAlign: 'center',
      marginBottom: 20,
    },
    InputContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 10,
      borderRadius: 30,
      alignItems: 'center',
      backgroundColor: '#F7E8E8',
      marginBottom: 10,
    },
    mobileInput: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 8,
    },
    sendOtpText: {
      paddingRight: 10,
    },
  });
  