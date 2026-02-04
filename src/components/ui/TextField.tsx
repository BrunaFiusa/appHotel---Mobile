import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInputProps, View, Text, TextInput } from "react-native";
import { global } from "./styles";
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

type NameIcon = 
    | { lib: "MaterialIcons"; name: keyof typeof MaterialIcons.glyphMap }
    | { lib: "FontAwesome6"; name: keyof typeof FontAwesome6.glyphMap }
    | { lib: "FontAwesome5"; name: keyof typeof FontAwesome5.glyphMap };

type Props = TextInputProps & {
    label: string,
    errorText?: string;
    icon?: NameIcon;
    isMasked?: boolean;
    type?: any;
    options?: any;
}

const TextField = ({label, errorText, icon, style, isMasked,type, options, ...restInputProps} : Props) => {
    return (
        <View style={global.inputGroup}>
            <Text style={global.label}>{label}</Text>
            <View style={[global.inputIcon, errorText ? global.inputError : null]}>
                {!! icon && (
                    <View>
                        {icon.lib === "MaterialIcons" && (
                            <MaterialIcons name={icon.name} size={23} color="purple"/>
                        )}
                        {icon.lib === "FontAwesome5" && (
                            <FontAwesome5 name={icon.name} size={23} color="purple"/>
                        )}
                        {icon.lib === "FontAwesome6" && (
                            <FontAwesome6 name={icon.name} size={23} color="purple"/>
                        )}
                    </View>
                )}

                {isMasked ? (
                    <TextInputMask
                        type={type}
                        options={options}
                        style={[global.input, style]}
                        placeholderTextColor="#a7a7a7ff"
                        {...restInputProps as any}
                    />
                ) : (

                <TextInput
                    keyboardAppearance="dark"
                    placeholderTextColor="#9ca3af"
                    style={[global.input, style]}
                    /* Restante de TextInputProps */
                    {...restInputProps}
                />
                )}
            </View>
            {!! errorText && <Text style={global.errorText}>{errorText}</Text>}
        </View>
    );
};

export default TextField;