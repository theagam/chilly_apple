import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
    editable?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    editable = true,
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={editable?styles.input:styles.inputUneditable}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderColor: "gray",
        borderRadius: 30,
        alignItems: "center",
        backgroundColor: "#F7E8E8",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    inputHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputUneditable: {
        color:"#575e5e",
        width: "100%",
        borderColor: "gray",
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#F4F5F6",
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
});

export default CustomTextInput;
