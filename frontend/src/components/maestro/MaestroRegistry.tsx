import { useState } from 'react';
import type { Alumno } from '../../domain/repositories/MaestroRepository';

interface Props {
    alumnos: Alumno[];
    onCalificar: (alumno: Alumno, nota: number, obs: string) => Promise<boolean>;
}

export const MaestroRegistry = ({ alumnos, onCalificar }: Props) => {
    const [notasLocales, setNotasLocales] = useState<{ [key: number]: string }>({});
    const [obsLocales, setObsLocales] = useState<{ [key: number]: string }>({});

    const handleGuardar = async (alumno: Alumno) => {
        
        const valorNota = notasLocales[alumno.inscripcion_id];
        
        
        const textoObs = obsLocales[alumno.inscripcion_id] !== undefined 
            ? obsLocales[alumno.inscripcion_id] 
            : (alumno.observaciones || '');

        if (!valorNota) return;

        const exito = await onCalificar(alumno, parseFloat(valorNota), textoObs);
        
        if (exito) {
           
            setNotasLocales(prev => { const c = {...prev}; delete c[alumno.inscripcion_id]; return c; });
            setObsLocales(prev => { const c = {...prev}; delete c[alumno.inscripcion_id]; return c; });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Matrícula</th>
                            <th className="px-6 py-4">Alumno</th>
                            <th className="px-6 py-4">Materia</th>
                            <th className="px-6 py-4 text-center">Nota Actual</th>
                            <th className="px-6 py-4 text-center">Nueva Nota</th>
                            <th className="px-6 py-4 text-center">Observaciones</th>
                            <th className="px-6 py-4 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {alumnos.map((alumno) => {
                            const notaNum = alumno.calificacion ? parseFloat(alumno.calificacion.toString()) : 0;
                            
                            // Valor inicial del input 
                            const obsValue = obsLocales[alumno.inscripcion_id] ?? alumno.observaciones ?? '';

                            return (
                                <tr key={alumno.inscripcion_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{alumno.matricula}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{alumno.nombre}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                            {alumno.materia || 'General'}
                                        </span>
                                    </td>
                                    
                                    <td className="px-6 py-4 text-center">
                                        {alumno.calificacion ? (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                                                ${notaNum >= 70 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                                            `}>
                                                {alumno.calificacion}
                                            </span>
                                        ) : <span className="text-gray-300 text-xs italic">--</span>}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <input 
                                            type="number" min="0" max="100" placeholder={alumno.calificacion ? "0-100" : "Nueva"}
                                            className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center text-sm"
                                            value={notasLocales[alumno.inscripcion_id] ?? ''}
                                            onChange={(e) => setNotasLocales({...notasLocales, [alumno.inscripcion_id]: e.target.value})}
                                        />
                                    </td>

                                    {/* INPUT OBSERVACIONES MEJORADO */}
                                    <td className="px-6 py-4 text-center">
                                        <input 
                                            type="text" 
                                            placeholder="Comentarios..."
                                            className="w-48 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            value={obsValue} 
                                            onChange={(e) => setObsLocales({...obsLocales, [alumno.inscripcion_id]: e.target.value})}
                                        />
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <button 
                                            onClick={() => handleGuardar(alumno)}
                                            disabled={!notasLocales[alumno.inscripcion_id]}
                                            className={`text-xs px-4 py-2 rounded font-medium transition-all
                                                ${notasLocales[alumno.inscripcion_id] ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                                            `}
                                        >Guardar</button>
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