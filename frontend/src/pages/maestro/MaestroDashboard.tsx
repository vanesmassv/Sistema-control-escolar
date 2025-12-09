import { useState } from 'react';
import { useMaestro } from '../../hooks/useMaestro'; 
import { useAuth } from '../../contexts/AuthContext';
import { LogoutButton } from '../../components/buttons/LogoutButton';
import { MaestroRegistry } from '../../components/maestro/MaestroRegistry'; 
import { MaestroSummary } from '../../components/maestro/MaestroSummary';

export const MaestroDashboard = () => {
    const { user } = useAuth();
    const { alumnos, loading, error, calificarAlumno, recargar } = useMaestro();
    const [activeTab, setActiveTab] = useState<'registro' | 'resumen'>('registro');

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">Mis Alumnos</h1>
                        <p className="text-xs text-gray-500">Profesor: {user?.name}</p>
                    </div>
                    <LogoutButton />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Navegación y Botón Actualizar */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                    <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                        <button 
                            onClick={() => setActiveTab('registro')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === 'registro' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >Captura</button>
                        <button 
                            onClick={() => setActiveTab('resumen')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === 'resumen' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >Resumen</button>
                    </div>
                    <button onClick={recargar} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                        Actualizar Datos
                    </button>
                </div>

                {/* --- RENDERIZADO CONDICIONAL --- */}
                {activeTab === 'registro' ? (
                    <MaestroRegistry alumnos={alumnos} onCalificar={calificarAlumno} />
                ) : (
                    <MaestroSummary alumnos={alumnos} />
                )}
            </main>
        </div>
    );
};