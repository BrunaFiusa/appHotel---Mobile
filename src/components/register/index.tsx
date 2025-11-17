import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";

const RenderRegister = () => {

    const router = useRouter(); 
    const { height } = Dimensions.get("window");   
    
    return (
        <AuthContainer
            title="Cadastre-se agora!"
            icon="hotel">

            <TextField
                label="Nome"
                placeholder="Digite seu nome"
            />

            <TextField
                label="CPF"
                placeholder="000.000.000-00"
            />

            <TextField
                label="Telefone"
                placeholder="99 99999-9999"
            />

            {/* children */}    
            <TextField
                label="E-mail"
                icon="email"
                placeholder="user@email.com"
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                icon="lock"
                placeholder="*********"
            />

            <PasswordField
                label="Confirme sua senha"
                icon="lock"
                placeholder="*********"
            />


        <TouchableOpacity style={[global.primaryButton]}>
            <Text style={global.primaryButtonText}>Criar Conta</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center", marginTop: height * 0.03}}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginTop: height * 0.00000001}}>
                <Text style={{color: "#1f1e1eff", fontWeight: 600, fontSize: 15}}>Já possui uma conta? Faça login!</Text>
            </TouchableOpacity>
        </View>

        </AuthContainer>
)};

export default RenderRegister;