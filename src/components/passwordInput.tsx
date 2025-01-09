import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PasswordInputProps extends TextInputProps {
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={handleClickShowPassword}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#B61515"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.passwordHint}>
        Password should not be less than 8 characters
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#F7E8E8',
  },
  passwordHint: {
    color: '#777',
    fontSize: 12,
    marginLeft: 10,
  },
  passwordInput: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  inputError: {
    color: '#810707',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});

export default PasswordInput;
