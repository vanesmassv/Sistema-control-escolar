export type UserRole = 'ADMIN' | 'MAESTRO' ;

export interface User {
    id: number;      // En la BD es 'usuario_id',  as 'id'
    name: string;    // En la BD es 'nombre'
    email: string;   // En la BD es 'email'
    role: UserRole;  // En la BD es 'rol_id' (número), aquí será texto
    token?: string;  // El JWT
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}