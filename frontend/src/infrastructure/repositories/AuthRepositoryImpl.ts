import axiosInstance from '../api/axiosInstance'; 
import { AxiosError } from 'axios'; 
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { User } from '../../domain/entities/User';


interface LoginAPIResponse {
    ok: boolean;
    data: {
        token: string;
        user: {
            id: string | number;
            nombre: string;
            email: string;
            
        }
    }
}
export class AuthRepositoryImpl implements AuthRepository {
    
    async login(email: string, password: string): Promise<User> {
        try {
            const response = await axiosInstance.post<LoginAPIResponse>('/auth/login', { email, password });
            
            const payload = response.data.data;

            

            const userEntity: User = {
                id: Number(payload.user.id), // Backend manda "id" (string '1'), lo convertimos a número
                name: payload.user.nombre,   // Backend manda "nombre"
                email: payload.user.email,   // Backend manda "email"
                
                role: payload.user.email.includes('admin') ? 'ADMIN' : 'MAESTRO',
                
                token: payload.token
            };

            return userEntity;

        } catch (error) {
            console.error("🔥 ERROR REAL DEL REPOSITORIO:", error);

            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Error de autenticación');
            }

            throw new Error('Error inesperado al conectar con el servidor');
        }
    }

}