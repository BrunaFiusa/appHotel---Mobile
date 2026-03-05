import { TouchableOpacity, View, Text, Dimensions, ScrollView, Alert } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function isValidEmail(email: string) {
    return /^[^\s@&='"!]@[^\s@&='"!].[^\s@&='"!]$/.test(email);
}

const RenderRegister = () => {
    const { createAccount } = useAuth();
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [cpf, setCPF] = useState("");
    const [telefone, setTelefone] = useState("");
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<{ email?: boolean; password?: boolean; passwordConfirm?: boolean, cpf?: boolean; telefone?: boolean }>({});

    const errors = useMemo(() => {
        const error: Record<string, string> = {};
        if (touched.email && !email) error.email = "E-mail obrigatório"
        if (touched.password && !password) error.password = "Senha obrigatória"
        if (touched.password && password && password.length < 6) error.password = "No mínimo 6 caracteres para a senha";
        if (touched.email && email && !isValidEmail(email)) error.email = "Digite um e-mail válido";

        return error;
    }, [email, password, touched])

    const handleSubmit = async () => {
        if (!nome || !email || !password || !cpf || !telefone) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        if (password !== passwordConfirm) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        try {
            setLoading(true);
            await createAccount(
                nome.trim(),
                email.trim(),
                password.trim(),
                cpf.replace(/\D/g, ''),
                telefone.replace(/\D/g, '')
            );

            Alert.alert("Sucesso", "Conta criada com sucesso!");
            router.replace("/(tabs)/explorer");
        } catch (erro: any) {
            Alert.alert("Erro", erro.message || "Falha ao tentar cadastrar!");
        } finally {
            setLoading(false);
        }
    };

    const { width, height } = Dimensions.get('window');
    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Faça seu cadastro para continuar!"
            icon="hotel">

            <ScrollView showsVerticalScrollIndicator={false}>

                <TextField
                    label="Nome:"
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <TextField
                    label="CPF:"
                    placeholder="CPF"
                    keyboardType="numeric"
                    isMasked={true}
                    type={'cpf'}
                    onChangeText={setCPF}
                />

                <TextField
                    label="Telefone:"
                    icon={{ lib: "MaterialIcons", name: "call" }}
                    autoComplete="tel"
                    placeholder="Telefone"
                    isMasked={true}
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                    value={telefone}
                    onChangeText={setTelefone}
                />

                <TextField
                    label="E-mail"
                    icon={{ lib: "MaterialIcons", name: "email" }}
                    placeholder="user@email.com"
                    value={email}
                    onChangeText={setEmail}
                />

                <PasswordField
                    label="Senha"
                    icon={{ lib: "MaterialIcons", name: "password" }}
                    placeholder="*********"
                    value={password}
                    onChangeText={setPassword}
                />

                <PasswordField
                    label="Senha"
                    icon={{ lib: "MaterialIcons", name: "password" }}
                    placeholder="*********"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                />

                <TouchableOpacity
                    style={[global.primaryButton, loading && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={global.primaryButtonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 10, alignItems: "center" }}
                    onPress={() => router.push("/(auth)")}>
                    <Text style={{ color: "#888" }}>Já possui uma conta? Faça login!</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: height * 0.03 }}>
                    <View style={{
                        backgroundColor: "#7c8390ff", width: width * 0.5, height: height * 0.001,
                        borderRadius: 10, marginTop: height * 0.03
                    }}></View>
                </View>
            </ScrollView>
        </AuthContainer>
    )
};

export default RenderRegister;