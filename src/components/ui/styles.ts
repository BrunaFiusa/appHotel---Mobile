import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const global = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    KeyboardAvoiding: {
        flex: 1
    },
    container: {
        paddingHorizontal: width * 0.07,
        paddingTop: 25,
        paddingBottom: 32
    },
    header: {
        alignItems: "center",
        marginBottom: 16

    },
    title: {
        fontSize: 25,
        fontWeight: "800",
    },
    subtitle: {
        fontSize: 25,
        color: "purple",
        marginTop: 6,
    },
    content: {
        backgroundColor: "#ebe0faff",
        borderRadius: 10,
        padding: width * 0.02,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },
})