import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./styles";

type Props = {
    title: string,
    subtitle?: string;
    icon?: keyof typeof FontAwesome5.glyphMap;
    children: React.ReactNode;
}

export default function AuthContainer({title, subtitle, icon, children}: Props) {
    return (
        <SafeAreaView style={global.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={global.KeyboardAvoiding}>
                <ScrollView style={global.container}> 
                    <View style={global.header} >
                        {!!icon && <FontAwesome5 name={icon} size={25} color={"purple"}/>}
                        <Text style={global.title}>{title}</Text>
                        {!!subtitle && <Text style={global.subtitle}>{subtitle}</Text>}
                    </View>
                    <View style={global.content}>
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}