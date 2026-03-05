import { useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import AuthContainer from '../ui/AuthContainer';
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import { global } from "../ui/styles";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const RenderAccount = () => {
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [telefone, setTelefone] = useState("");
    const { width, height } = Dimensions.get('window');
    const { signOut } = useAuth();
    const router = useRouter();
    const logout = async () => {
        await signOut();
        router.replace("/(auth)");
    };

    return (
        <AuthContainer
            title="Perfil"
            subtitle="Altere seus dados"
            icon="user-alt">

            <TextField
                label="Nome:"
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextField
                label="E-mail"
                icon={{ lib: "MaterialIcons", name: "email" }}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
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

            <TouchableOpacity style={[global.primaryButton]}>
                <Text style={global.primaryButtonText}>Editar Dados</Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={passwordModalVisible}
                onRequestClose={() => setPasswordModalVisible(false)}
            >

                <Pressable
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                    onPress={() => setPasswordModalVisible(false)}
                >
                    <Pressable
                        onPress={() => { }}
                        style={{
                            width: width * 0.85,
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            padding: 20,
                        }}
                    >
                        <Text style={[global.label, { marginBottom: 15 }]}>
                            Alterar senha
                        </Text>

                        <PasswordField
                            label="Senha atual"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />

                        <PasswordField
                            label="Nova senha"
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <PasswordField
                            label="Confirmar nova senha"
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                        />

                        <TouchableOpacity
                            style={[global.primaryButton, { marginTop: 20 }]}
                            onPress={() => {
                                setPasswordModalVisible(false);
                            }}
                        >
                            <Text style={global.primaryButtonText}>Salvar senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ marginTop: 10, alignItems: "center" }}
                            onPress={() => setPasswordModalVisible(false)}
                        >
                            <Text style={{ color: "#888" }}>Cancelar</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>

            <TouchableOpacity
                style={[global.primaryButton]}
                onPress={() => setPasswordModalVisible(true)}
            >
                <Text style={global.primaryButtonText}>Privacidade e Segurança</Text>
            </TouchableOpacity>

            <View>
                <TouchableOpacity onPress={logout}>
                    <Text style={{ color: "#922222" }}>Sair</Text>
                </TouchableOpacity>
            </View>



            <View style={{ alignItems: "center", marginTop: height * 0.03 }}>
                <View style={{
                    backgroundColor: "#7c8390ff", width: width * 0.5, height: height * 0.001,
                    borderRadius: 10, marginTop: height * 0.03
                }}></View>
            </View>

        </AuthContainer>
    )
};

export default RenderAccount;