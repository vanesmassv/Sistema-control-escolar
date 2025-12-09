import { useState, useEffect, useCallback } from 'react';
import { AdminRepositoryImpl } from '../infrastructure/repositories/AdminRepositoryImpl';
import type { ReporteGlobal } from '../domain/entities/reporte';


const adminRepo = new AdminRepositoryImpl();

export const useAdminReporte = () => {
    
    // 1. Estados
    const [reporte, setReporte] = useState<ReporteGlobal | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Cargar Datos
    const cargarDatos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await adminRepo.obtenerReporteGlobal();
            setReporte(data);
        } catch (err) {
            // 2. VERIFICAMOS EL TIPO
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error desconocido al cargar reporte');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. Eliminar
    const borrarCalificacion = async (calificacion_id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar esta calificación?')) return;

        try {
            const exito = await adminRepo.eliminarCalificacion(calificacion_id);
            if (exito) {
                await cargarDatos(); 
                alert('Calificación eliminada');
            }
        } catch (err) { 
            // 4. VERIFICAMOS EL TIPO
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert('No se pudo eliminar la calificación');
            }
        }
    };

    // Efecto
    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    return {
        reporte,
        loading,
        error,
        borrarCalificacion,
        recargar: cargarDatos
    };
};