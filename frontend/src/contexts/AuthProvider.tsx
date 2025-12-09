import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthStore } from '../hooks/useAuthStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 1. Ejecutamos tu custom hook que tiene toda la lógica
    const authLogic = useAuthStore();

    // 2. Inyectamos esa lógica en el Proveedor del Contexto
    return (
        <AuthContext.Provider value={authLogic}>
            {children}
        </AuthContext.Provider>
    );
};