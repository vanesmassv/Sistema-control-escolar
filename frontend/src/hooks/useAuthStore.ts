import { useState } from 'react';
import type { User, AuthContextType } from '../domain/entities/User';
import { AuthRepositoryImpl } from '../infrastructure/repositories/AuthRepositoryImpl';

const authRepo = new AuthRepositoryImpl();

export const useAuthStore = (): AuthContextType => {
    
    // 1. SOLUCIÓN: Leemos el localStorage DENTRO del useState.
    // Esto se ejecuta solo la primera vez que se carga la app.
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('usuario_sesion');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return null;
        }
    });


    const [loading, setLoading] = useState(false);

    // Función de Login (
    const login = async (email: string, pass: string) => {
        setLoading(true); 
        try {
            const userEntity = await authRepo.login(email, pass);
            
            setUser(userEntity);
            localStorage.setItem('usuario_sesion', JSON.stringify(userEntity));
            
            if (userEntity.token) {
                localStorage.setItem('token', userEntity.token);
            }
        } catch (error) {
            console.log("Error en el login",error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Función de Logout (Igual que antes)
    const logout = () => {
        setUser(null);
        localStorage.removeItem('usuario_sesion');
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    };

    return {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading
    };
};