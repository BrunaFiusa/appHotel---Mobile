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
    inputGroup: {
        marginBottom: height * 0.02,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#120715ff",
        marginBottom: height * 0.01
    },
    inputIcon: {
        backgroundColor: "#fff",
        paddingLeft: width * 0.02 ,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#420350ff",
        borderRadius: 10
    },
    inputError: {
        backgroundColor: "#fed5d5ff",
        borderColor: "rgba(139, 0, 0, 1)",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        fontWeight: "600",
        paddingHorizontal: width * 0.02
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
        top: 42
    },
    errorText: {
        color: "red",
        fontWeight: "600",
        fontSize: 13,
        marginTop: height * 0.01
    },
     primaryButton: {
        backgroundColor: "#420350ff",
        borderRadius: 10,
        padding: width * 0.025,
        marginTop: width * 0.02,
        alignItems: "center"
    },
    primaryButtonDisabled: {
        backgroundColor: "#9ca3af",
        borderRadius: 10,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: 600
    }
})