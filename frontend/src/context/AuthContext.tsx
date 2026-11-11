import { createContext, useState, type ReactNode } from "react";

export const AuthProvider = createContext();

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthContext({ children }: AuthProviderProps) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    return (
        <AuthProvider.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthProvider.Provider>
    )
}    