import { useAuth } from '../../contexts/AuthContext';

export const LogoutButton = () => {
    
    // 1. Traemos la función logout del contexto
    const { logout } = useAuth();

    // 2. Manejador del click
    const handleLogout = () => {
        if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
            logout();
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            title="Salir del sistema"
        >
            {/* Ícono SVG de 'Puerta/Salida' (Sin instalar librerías) */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-5 h-5"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" 
                />
            </svg>
            
            <span>Cerrar Sesión</span>
        </button>
    );
};