import { useAdminReporte } from '../../hooks/useAdminReporte'; 
import { LogoutButton } from '../../components/buttons/LogoutButton';
export const AdminDashboard = () => {

    const { reporte, loading, error, borrarCalificacion, recargar } = useAdminReporte();

    // --- ESTADO DE CARGA (Minimalista) ---
    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 mb-4"></div>
            <p className="text-gray-500 font-light">Cargando reporte...</p>
        </div>
    );
    
    // --- ESTADO DE ERROR (Suave) ---
    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 text-center max-w-md">
                <div className="text-red-400 text-5xl mb-4">☹️</div>
                <h3 className="text-gray-800 font-medium text-lg mb-2">Algo salió mal</h3>
                <p className="text-gray-500 text-sm mb-6">{error}</p>
                <button 
                    onClick={recargar} 
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm hover:bg-black transition-all"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );

    // --- ESTADO VACÍO ---
    if (!reporte) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">
            No hay datos disponibles.
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-700 pb-20">
            
            {/* --- HEADER --- */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Panel Escolar</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Vista de Administrador</p>
                    </div>
                    {/* Aquí integramos tu botón de salir */}
                    <LogoutButton />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">
                
                {/* --- SECCIÓN 1: KPI PRINCIPAL Y RESUMEN --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                    
                    {/* Tarjeta Destacada (Promedio General) */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Promedio General</h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-5xl font-light text-gray-900">{reporte.promedioGeneral}</span>
                            <span className="text-sm text-green-500 font-medium">pts</span>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-800 rounded-full" style={{ width: `${parseFloat(reporte.promedioGeneral)}%` }}></div>
                        </div>
                    </div>

                    {/* Grid de Materias (Scroll horizontal en móviles) */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {reporte.resumenPorMateria.map((mat, index) => (
                            <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        {/* Icono Libro SVG */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-semibold text-gray-800">{mat.promedio}</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">{mat.materia}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SECCIÓN 2: TABLA DE DETALLES --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header de la Tabla */}
                    <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Detalle de Alumnos</h2>
                            <p className="text-sm text-gray-400 mt-1">Listado completo de calificaciones registradas</p>
                        </div>
                        <button 
                            onClick={recargar} 
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Actualizar
                        </button>
                    </div>

                    {/* Tabla */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                                    <th className="px-8 py-4">Matrícula</th>
                                    <th className="px-8 py-4">Alumno</th>
                                    <th className="px-8 py-4">Grupo</th>
                                    <th className="px-8 py-4">Materia</th>
                                    <th className="px-8 py-4 text-center">Promedio</th>
                                    <th className="px-8 py-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {reporte.detallesPorAlumnoYMateria.map((fila, index) => (
                                    <tr 
                                        key={fila.calificacion_id || index} 
                                        className="hover:bg-blue-50/30 transition-colors duration-150 group"
                                    >
                                        <td className="px-8 py-4 text-sm font-medium text-gray-600 font-mono">
                                            {fila.matricula}
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar generado con iniciales */}
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {fila.alumno.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{fila.alumno}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                {fila.grupo || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-sm text-gray-500">
                                            {fila.materia}
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${parseFloat(fila.promedio) >= 90 ? 'bg-green-100 text-green-800' : 
                                                  parseFloat(fila.promedio) >= 70 ? 'bg-blue-100 text-blue-800' : 
                                                  'bg-red-100 text-red-800'}`}>
                                                {fila.promedio}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            {/* Botón Minimalista: Solo Icono */}
                                            <button 
                                                onClick={() => borrarCalificacion(fila.calificacion_id)} 
                                                className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                                                title="Eliminar Calificación"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Footer de Tabla (Paginación visual o contador) */}
                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
                        Mostrando {reporte.detallesPorAlumnoYMateria.length} registros
                    </div>
                </div>
            </main>
        </div>
    );
};