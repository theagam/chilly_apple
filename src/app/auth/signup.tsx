import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    TextInput,
  } from 'react-native';
  import React, { useState } from 'react';
  import axios from 'axios';
  import uuid from 'react-native-uuid';
  import PasswordInput from '@/src/components/passwordInput';
  import CustomTextInput from '@/src/components/customText';
import { useNavigation } from '@react-navigation/native';
  
  const SignUpScreen = (props: any) => {
    const { name, email, mobile } = props.route?.params || {}; // Safe access
  
    const [username, setUsername] = useState(name || '');
    const [userEmail, setUserEmail] = useState(email || '');
    const [mobileNumber, setMobileNumber] = useState(mobile || '');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [isOtpValid, setIsOtpValid] = useState(false); // Tracks if OTP is valid
  
    const validateMobileNumber = () => {
      return mobileNumber.length === 10 && /^[0-9]+$/.test(mobileNumber);
    };
  
    const sendOtp = async () => {
      if (!validateMobileNumber()) {
        Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
        return;
      }
  
      try {
        const response = await axios.get(
          `https://chillyapple.com/SN-CH-Test/api/send-signup-otp?mobile=${mobileNumber}`
        );
        if (response.status === 200) {
          Alert.alert('Success', 'OTP Sent');
        } else {
          Alert.alert('Error', response.data.message || 'Failed to send OTP');
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Network error');
      }
    };
  
    // const verifyOtp = async () => {
    //   if (!otp) {
    //     Alert.alert('Error', 'Please enter the OTP');
    //     return;
    //   }
  
    //   try {
    //     const response = await axios.post(
    //       'https://chillyapple.com/SN-CH-Test/api/verify-otp',
    //       { mobile: mobileNumber, otp }
    //     );
    //     if (response.data.success) {
    //       setIsOtpValid(true);
    //       Alert.alert('Success', response.data.message || 'OTP Verified');
    //     } else {
    //       Alert.alert('Error', response.data.message || 'OTP Verification Failed');
    //     }
    //     console.log(response.data.success, "d.sd.s.");
    //   } catch (error: any) {
    //     Alert.alert('Error', error.message || 'Network error');
    //   }
      
    // };
    const navigation = useNavigation(); // Initialize the navigation object


    const handleOtpChange = (value: string) => {
      setOtp(value);
      setIsOtpValid(false); // Reset OTP validity
    };
  
    const signUpCustomer = async () => {
      if (!username || !password || !confirmpassword) {
        Alert.alert(
          'Error',
          'Please fill in all required fields (Name, Password, Confirm Password)'
        );
        return;
      }
    
      if (password !== confirmpassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
    
      if (!otp) {
        Alert.alert('Error', 'Please enter the OTP');
        return;
      }
    
      try {
        // Verify OTP before signing up
        const verifyResponse = await axios.post(
          'https://chillyapple.com/SN-CH-Test/api/verify-otp',
          { mobile: mobileNumber, otp }
        );
    
        if (!verifyResponse.data.success) {
          Alert.alert('Error', verifyResponse.data.message || 'OTP Verification Failed');
          return;
        }
    
        const device_id = uuid.v4();
        const device_token = 'Sameer';
    
        // Proceed with sign-up
        const signUpResponse = await axios.post(
          'https://chillyapple.com/SN-CH-Test/api/sign-up-customer',
          {
            username,
            password,
            name: username,
            device_id,
            device_token,
            received_referral_code: referralCode,
            email: userEmail,
            otp,
          }
        );
    
        if (signUpResponse.status === 200) {
          Alert.alert('Success', 'SignUp Successful');
          // props.navigation.navigate('Drawer');
          navigation.navigate('auth', { screen: 'login' }) 

        } else {
          Alert.alert('Error', signUpResponse.data.message || 'SignUp failed');
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Network error');
      }
    };
    
    
  
    return (
      <ImageBackground source={require('@/assets/images/signup_bg.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.signUpText}>SIGN UP</Text>
            <View style={styles.lineStyle}></View>
            <Text style={styles.subText}>Give us some Valuable Information</Text>
          </View>
          <View style={{ gap: 10 }}>
            <CustomTextInput placeholder="Name" value={username} onChangeText={setUsername} />
            <CustomTextInput placeholder="Email (Optional)" value={userEmail} onChangeText={setUserEmail} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.mobileInput}
                placeholder="Mobile No."
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="number-pad"
              />
              <TouchableOpacity onPress={sendOtp}>
                <Text style={styles.sendOtpText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.mobileInput}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="number-pad"
              />
              {/* <TouchableOpacity onPress={verifyOtp}>
                <Text style={styles.verifyOtpText}>Verify OTP</Text>
              </TouchableOpacity> */}
            </View>
            <PasswordInput label="Password" placeholder="Password" value={password} onChangeText={setPassword} />
            <CustomTextInput placeholder="Confirm Password" value={confirmpassword} onChangeText={setConfirmPassword} />
            <CustomTextInput placeholder="Referral Code (Optional)" value={referralCode} onChangeText={setReferralCode} />
            <TouchableOpacity style={styles.signupButton} onPress={signUpCustomer}>
              <Text style={styles.signupButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };
  
  export default SignUpScreen;
  
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
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
    inputContainer: {
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
      color: '#28850b',
      fontWeight: 'bold',
    },
    signupButton: {
      backgroundColor: '#28850b',
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginVertical: 10,
    },
    signupButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    verifyOtpText: {
        paddingRight: 10,
        color: '#007BFF',
        fontWeight: 'bold',
      },
  });
  