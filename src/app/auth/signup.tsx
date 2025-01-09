import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-native-uuid";
import PasswordInput from "@/src/components/passwordInput";
import CustomTextInput from "@/src/components/customText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "@/src/constants";

const SignUpScreen = (props: any) => {
  const { name, email, mobile } = props.route?.params || {};

  const [username, setUsername] = useState(name || "");
  const [userEmail, setUserEmail] = useState(email || "");
  const [mobileNumber, setMobileNumber] = useState(mobile || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false); // Tracks if OTP is valid
  const [timer, setTimer] = useState(59); // Timer for OTP resend
  const [isOtpSent, setIsOtpSent] = useState(false); // Tracks if OTP has been sent

  const navigation: NavigationProp<any, any> = useNavigation();

  //validation phone number
  const validateMobileNumber = () => {
    return mobileNumber.length === 10 && /^[0-9]+$/.test(mobileNumber);
  };

  //otp send function
  const sendOtp = async () => {
    if (!validateMobileNumber()) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}send-signup-otp?mobile=${mobileNumber}`
      );
      if (response.status === 200) {
        Alert.alert("Success", "OTP Sent");
        setIsOtpSent(true);
        startTimer(); // Start the timer after OTP is sent
      } else {
        Alert.alert("Error", response.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Network error");
    }
  };

  // Timer countdown function
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalId); 
          setIsOtpSent(false); // Enable OTP resend button after countdown ends
          return 59; // Reset the timer
        }
        return prevTimer - 1; // Decrease the timer by 1 every second
      });
    }, 1000);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setIsOtpValid(false); // Reset OTP validity
  };

  //signup
  const signUpCustomer = async () => {
    if (!username || !password || !confirmpassword) {
      Alert.alert(
        "Error",
        "Please fill in all required fields (Name, Password, Confirm Password)"
      );
      return;
    }

    if (password !== confirmpassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    try {
      // Verify OTP before signing up
      const verifyResponse = await axios.post(`${API_BASE_URL}verify-otp`, {
        mobile: mobileNumber,
        otp,
      });

      if (!verifyResponse.data.success) {
        Alert.alert(
          "Error",
          verifyResponse.data.message || "OTP Verification Failed"
        );
        return;
      }

      // Check if the user already exists

      const device_id = uuid.v4();
      const device_token = "Sameer";

      // Proceed with sign-up
      const signUpResponse = await axios.post(
        `${API_BASE_URL}sign-up-customer`,
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

      if (signUpResponse.data.success) {
        Alert.alert("Success", "SignUp Successful");
        navigation.navigate("auth", { screen: "login" });
      } else {
        Alert.alert(
          signUpResponse.data.message,
          signUpResponse.data.errors.username.unique || "SignUp failed"
        );
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Network error");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/signup_bg.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.signUpText}>SIGN UP</Text>
          <View style={styles.lineStyle}></View>
          <Text style={styles.subText}>Give us some Valuable Information</Text>
        </View>
        <View style={{ gap: 10 }}>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.mobileInput}
              placeholder="Mobile No."
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="number-pad"
            />
            <TouchableOpacity onPress={sendOtp} disabled={isOtpSent}>
              <Text style={styles.sendOtpText}>
                {isOtpSent ? `Resend OTP in ${timer}s` : "Send OTP"}
              </Text>
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
          </View>
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChangeText={setConfirmPassword}
          />
          <CustomTextInput
            placeholder="Referral Code (Optional)"
            value={referralCode}
            onChangeText={setReferralCode}
          />
          <TouchableOpacity
            style={styles.signupButton}
            onPress={signUpCustomer}
          >
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
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 35,
    justifyContent: "center",
  },
  headerContainer: {
    gap: 5,
  },
  signUpText: {
    color: "#B61515",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  lineStyle: {
    borderBottomWidth: 2,
    width: 50,
    borderBottomColor: "#B61515",
    alignSelf: "center",
  },
  subText: {
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#F7E8E8",
    marginBottom: 10,
  },
  mobileInput: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  sendOtpText: {
    paddingRight: 10,
    color: "#28850b",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#28850b",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
