import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user, isAuthenticated, loading } = useAuth();

    // 1. Mientras carga, mostramos algo simple o un Spinner
    if (loading) {
        return <div className="h-screen flex items-center justify-center">Cargando...</div>;
    }

    // 2. SI YA ESTÁ LOGUEADO -> LO REDIRIGIMOS (Lo sacamos del Login)
    if (isAuthenticated && user) {
        if (user.role === 'ADMIN') {
            return <Navigate to="/admin/dashboard" replace />;
        } else if (user.role === 'MAESTRO') {
            return <Navigate to="/maestro/dashboard" replace />;
        }
        // Si tiene un rol desconocido, podrías dejarlo pasar o mandarlo a una página de error
    }


    return <>{children}</>;
};