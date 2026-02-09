import AuthProvider from "@/contexts/AuthContext";
import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <AuthProvider>
            <Stack screenOptions_{{ HeaderShown: false }} />
        </AuthProvider>
    );
}

export default RootLayout;