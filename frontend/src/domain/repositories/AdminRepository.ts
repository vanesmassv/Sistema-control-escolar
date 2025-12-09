import type { ReporteGlobal } from '../../domain/entities/reporte'

export interface AdminRepository{
    
    obtenerReporteGlobal(): Promise<ReporteGlobal>;
    eliminarCalificacion(calificacion_id: number): Promise<boolean>;
}