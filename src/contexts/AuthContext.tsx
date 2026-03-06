import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/api';

type CartReservations = {
    roomId: number;
    nome: string;
    qtd_cama_casal: number;
    qtd_cama_solteiro: number;
    preco: number;
    dataInicio: string;
    dataFim: string;
    quantidade: number
}

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, senha: string) => Promise<void>;
    signOut: () => void;
    createAccount: (nome: string, email: string, senha: string, cpf: string, telefone: string) => Promise<void>;
    searchRoom: (
        dataInicio: string,
        dataFim: string,
        quantidade: number,
    ) => Promise<any[]>;

    CartReservations: CartReservations[];
    addReservationToCart: (reservation: CartReservations) => void;
    //Remover um item específico do carrinho
    clearCart: () => void;
    //Criar a ordem de pedido com as reservas => forma de pagamento e adicional

}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartReservations, setCartReservations] = useState<CartReservations[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem("token");
                if (stored) setToken(stored);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    //SignIn
    async function signIn(email: string, senha: string) {

        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        })
        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || 'Credenciais inválidas');
        }

        const tokenAPI: string = await res.json();

        await AsyncStorage.setItem("token", tokenAPI);
        setToken(tokenAPI);
    }

    //SingOut
    async function signOut() {
        await AsyncStorage.removeItem("token");
        setToken(null);
    }

    //CreateAccount
    async function createAccount(nome: string, email: string, senha: string, cpf: string, telefone: string) {
        const res = await fetch(`${API_URL}/login/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, cpf, telefone }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || 'Erro ao criar conta');
        }
        const tokenAPI: string = await res.json();
        await AsyncStorage.setItem("token", tokenAPI);
        setToken(tokenAPI);
    }

    async function searchRoom(
        dataInicio: string,
        dataFim: string,
        quantidade: number,
    ) {
        const res = await fetch(`${API_URL}/quartosDisponiveis`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dataInicio, dataFim, quantidade }),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            throw new Error(
                error?.erro || error?.mensagem || "Erro ao buscar quartos",
            );
        }
        return await res.json();
    }

    const addReservationToCard = (reservation: CartReservations) => {

    }

    const clearCart = () => {}

    const value = useMemo(
        () => ({ token, isLoading, signIn, signOut, createAccount, searchRoom, addReservationToCard, cartReservations, clearCart }), [token, isLoading]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}

export default AuthProvider;