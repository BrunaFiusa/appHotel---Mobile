import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartReservations = {
  roomId: number;
  nome: string;
  qtd_cama_casal: number;
  qtd_cama_solteiro: number;
  preco: number;
  dataInicio: string;
  dataFim: string;
  quantidade: number;
};

type AuthContextProps = {
  token: string | null;
  isLoading: boolean;

  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  createAccount: (
    nome: string,
    email: string,
    senha: string,
    cpf: string,
    telefone: string
  ) => Promise<void>;

  searchRoom: (
    dataInicio: string,
    dataFim: string,
    quantidade: number
  ) => Promise<any[]>;

  cartReservations: CartReservations[];
  addReservationToCart: (reservation: CartReservations) => void;
  clearCart: () => void;

  createReserve: (
    pagamento: string, 
    adicionais: number, 
    quartos: any[]) => 
      Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartReservations, setCartReservations] = useState<CartReservations[]>([]);

  // Carregar token ao iniciar o app
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

  // LOGIN
  async function signIn(email: string, senha: string) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.erro || "Credenciais inválidas");
    }

    const tokenAPI: string = await res.json();

    await AsyncStorage.setItem("token", tokenAPI);
    setToken(tokenAPI);
  }

  // LOGOUT
  async function signOut() {
    await AsyncStorage.removeItem("token");
    setToken(null);
  }

  // CRIAR CONTA
  async function createAccount(
    nome: string,
    email: string,
    senha: string,
    cpf: string,
    telefone: string
  ) {
    const res = await fetch(`${API_URL}/login/cadastro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha, cpf, telefone }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.erro || "Erro ao criar conta");
    }

    const tokenAPI: string = await res.json();

    await AsyncStorage.setItem("token", tokenAPI);
    setToken(tokenAPI);
  }

  // BUSCAR QUARTOS
  async function searchRoom(
    dataInicio: string,
    dataFim: string,
    quantidade: number
  ) {
    const res = await fetch(`${API_URL}/quartosDisponiveis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dataInicio, dataFim, quantidade }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(
        error?.erro || error?.mensagem || "Erro ao buscar quartos"
      );
    }

    return await res.json();
  }

  // CRIAR RESERVA
  async function createReserve(pagamento: string, adicionais: number, quartos: any[]) {
        if (!token) throw new Error("Usuário não autenticado");

        try {
            const res = await fetch(`${API_URL}/reserva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // O token que você já tem no context
                },
                body: JSON.stringify({
                    pagamento,
                    adicionais,
                    quartos
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Erro ao realizar reserva');
            }

            return data;
        } catch (error: any) {
            console.error("Erro na reserva:", error);
            throw error;
        }
    }

  // ADICIONAR RESERVA NO CARRINHO
  const addReservationToCart = (reservation: CartReservations) => {
    setCartReservations((prev) => [...prev, reservation]);
  };

  // LIMPAR CARRINHO
  const clearCart = () => {
    setCartReservations([]);
  };

  const value = useMemo(
    () => ({
      token,
      isLoading,
      signIn,
      signOut,
      createAccount,
      searchRoom,
      cartReservations,
      addReservationToCart,
      clearCart,
      createReserve
    }),
    [token, isLoading, cartReservations]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() deve ser usado dentro de AuthProvider");
  return ctx;
};

export default AuthProvider;