import axiosInstance from "../api/axiosInstance"; 
import { AxiosError } from 'axios';               
import type { AdminRepository} from "../../domain/repositories/AdminRepository";
import type { ReporteGlobal } from "../../domain/entities/reporte"; 

export class AdminRepositoryImpl implements AdminRepository {
    
    async obtenerReporteGlobal(): Promise<ReporteGlobal> {
        try {
            
            const response = await axiosInstance.get<{ ok: boolean, data: ReporteGlobal }>('/admin/reporte'); 

            return response.data.data; 

        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Error al obtener el reporte');
            }
            throw new Error('Error inesperado al cargar el reporte');
        }
    }
    async eliminarCalificacion(calificacion_id: number): Promise<boolean> {
        try {
            const response = await axiosInstance.delete(`/admin/eliminar-calificacion/${calificacion_id}`);

            return response.data.ok;

        } catch (error) {
            
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'No se pudo eliminar la calificación');
            }
            throw new Error('Error inesperado al intentar eliminar');
        }
    }
}