import { Text, TouchableOpacity, View} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RenderResetPassword = () => {

    const router = useRouter();   
    
    return (
        <View style={global.screenContainer}> 

            <View style={global.divTurnLeft}> 
                <TouchableOpacity onPress={() => router.push("/(auth)")}> 
                    <MaterialCommunityIcons name="arrow-left" size={25} color="#4b0505" />
                </TouchableOpacity>
            </View>

            <AuthContainer    
                title="Redefinição de senha"
            >

            <View style={global.divText}>
                    <Text style={global.text}>
                        Digite seu e-mail para redefir sua senha.
                    </Text>
                </View>

            <TextField
                label=""
                placeholder="user@email.com"
                keyboardType="email-address"
            />

        <TouchableOpacity style={[global.primaryButton]}>
            <Text style={global.primaryButtonText}>Enviar e-mail</Text>
        </TouchableOpacity>
        </AuthContainer>
        </View>
)};

export default RenderResetPassword;


        
    