import { createContext, useContext, useState, ReactNode } from "react";
import { router } from "expo-router";

interface AuthContextData {
  user: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setLoading(true);

    // Simulação de login
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // 👇 LOGIN FIXO DEFINIDO
    if (email === "admin" && password === "1234") {
      setUser(email);
      router.replace("/(tabs)/home");
      
    } else {
      setLoading(false);
      throw new Error("Login inválido");
    }

    setLoading(false);
  }

  function signOut() {
    setUser(null);
    router.replace("/");
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}