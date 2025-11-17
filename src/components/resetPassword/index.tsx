import { Dimensions, Text, TouchableOpacity, View, ViewComponent} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RenderResetPassword = () => {

    const router = useRouter();   
    
    return (
        <AuthContainer 
            icon="arrow-left"   
            title="Redefinição de senha"
            subtitle="Digite seu email para redefinir sua senha"
        >

            <TextField
                label="Seu e-mail"
                placeholder="user@email.com"
                keyboardType="email-address"
            />

        <TouchableOpacity style={[global.primaryButton]}>
            <Text style={global.primaryButtonText}>Enviar e-mail</Text>
        </TouchableOpacity>
        </AuthContainer>
)};

export default RenderResetPassword;