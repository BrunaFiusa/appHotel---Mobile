import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInputProps, View, Text, TextInput } from "react-native";
import { global } from "./styles";


type Props = TextInputProps & {
    label: string,
    errorText?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
}

const TextField = ({label, errorText, icon, style, ...restInputProps} : Props) => {
    return (
        <View style={global.inputGroup}>
            <Text style={global.label}>{label}</Text>
            <View style={[global.inputIcon, errorText ? global.inputError : null]}>
                {!! icon && (
                    <View>
                        <MaterialIcons name={icon} size={21} color="purple"/>
                    </View>
                )}
                <TextInput
                    keyboardAppearance="dark"
                    placeholderTextColor="#9ca3af"
                    style={[global.input, style]}
                    /* Restante de TextInputProps */
                    {...restInputProps}
                />
            </View>
            {!! errorText && 
                <Text style={global.errorText}>{errorText}</Text>
            }
        </View>
    )
}

export default TextField;