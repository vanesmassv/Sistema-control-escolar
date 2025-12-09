import { useState, useEffect, useCallback } from 'react';
import { MaestroRepositoryImpl } from '../infrastructure/repositories/MaestroRepositoryImpl'; // Ajusta la ruta si es necesario
import type { Alumno } from '../domain/repositories/MaestroRepository';

// Instancia del repositorio
const maestroRepo = new MaestroRepositoryImpl();

export const useMaestro = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Cargar la lista de alumnos
    const cargarAlumnos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await maestroRepo.obtenerAlumnos();
            setAlumnos(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error al cargar alumnos');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. Efecto inicial
    useEffect(() => {
        cargarAlumnos();
    }, [cargarAlumnos]);

    const calificarAlumno = async (alumno: Alumno, nuevaNota: number, observaciones: string = '') => {
        try {
            // Validaciones básicas
            if (nuevaNota < 0 || nuevaNota > 100) throw new Error("La nota debe ser entre 0 y 100");
            //comprobar si tiene calificacion
            if (alumno.calificacion_id) {

                await maestroRepo.editarCalificacion({
                    calificacion_id: alumno.calificacion_id,
                    nota: nuevaNota,
                    observaciones
                });
            } else {
                await maestroRepo.crearCalificacion({
                    inscripcion_id: alumno.inscripcion_id,
                    nota: nuevaNota,
                    observaciones
                });
            }
            //recarga para comprobar cambios
            await cargarAlumnos();
            return true;

        } catch (err) {
            // Manejo de errores limpio
            const mensaje = err instanceof Error ? err.message : "Error al guardar calificación";
            alert(mensaje); 
            return false;
        }
    };

    return {
        alumnos,
        loading,
        error,
        calificarAlumno,
        recargar: cargarAlumnos
    };
};