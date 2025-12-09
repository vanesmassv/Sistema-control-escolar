import { useMemo } from 'react';
import type { Alumno } from '../../domain/repositories/MaestroRepository';

interface Props {
    alumnos: Alumno[];
}

export const MaestroSummary = ({ alumnos }: Props) => {
    
    const estadisticas = useMemo(() => {
        if (!alumnos.length) return { promedio: 0, aprobados: 0, reprobados: 0 };
        const calificados = alumnos.filter(a => a.calificacion !== null && a.calificacion !== undefined);
        if (!calificados.length) return { promedio: 0, aprobados: 0, reprobados: 0 };
        const suma = calificados.reduce((acc, curr) => acc + Number(curr.calificacion), 0);
        const aprobados = calificados.filter(a => Number(a.calificacion) >= 70).length;
        return {
            promedio: (suma / calificados.length).toFixed(1),
            aprobados,
            reprobados: calificados.length - aprobados
        };
    }, [alumnos]);

    return (
        <div className="space-y-6 animate-fade-in-up">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-bold">Promedio Grupo</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{estadisticas.promedio}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-bold">Aprobados</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{estadisticas.aprobados}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-bold">Reprobados</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{estadisticas.reprobados}</p>
                </div>
            </div>

            {/* Tabla de Resumen */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Matrícula</th>
                            <th className="px-6 py-4">Alumno</th>
                            <th className="px-6 py-4">Materia</th>
                            <th className="px-6 py-4 text-center">Nota Final</th>
                            <th className="px-6 py-4">Observaciones Registradas</th> 
                            <th className="px-6 py-4 text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {alumnos.map((alumno) => {
                            const notaNum = alumno.calificacion ? parseFloat(alumno.calificacion.toString()) : 0;
                            const tieneNota = alumno.calificacion !== null && alumno.calificacion !== undefined;
                            
                            return (
                                <tr key={alumno.inscripcion_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{alumno.matricula}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{alumno.nombre}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {alumno.materia}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {tieneNota ? (
                                            <span className="text-lg font-bold text-gray-700">{alumno.calificacion}</span>
                                        ) : <span className="text-gray-300">--</span>}
                                    </td>
                                    
                                    {/* Muestra la observación real */}
                                    <td className="px-6 py-4 text-sm text-gray-600 italic">
                                        {alumno.observaciones 
                                            ? `"${alumno.observaciones}"` 
                                            : <span className="text-gray-300 text-xs">Sin comentarios</span>
                                        }
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {tieneNota ? (
                                            notaNum >= 70 
                                                ? <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Aprobado</span>
                                                : <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-bold">Reprobado</span>
                                        ) : <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Pendiente</span>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};