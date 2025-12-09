import axiosInstance from "../api/axiosInstance";
import { AxiosError } from 'axios';
import type { MaestroRepository, ActualizarCalificacionDTO, CrearCalificacionDTO, Alumno } from "../../domain/repositories/MaestroRepository"; 
    
export class MaestroRepositoryImpl implements MaestroRepository {
    async editarCalificacion(datos: ActualizarCalificacionDTO): Promise<boolean> {
        try{
            const response = await axiosInstance.put('/maestro/editar-calificacion',datos);

            return response.data.ok;

        }catch(error){
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Error al editar calificación');
            }
            throw new Error('Error inesperado');
        }
    }
    async crearCalificacion(datos: CrearCalificacionDTO){
        try{
            const response = await axiosInstance.post('/maestro/crear-calificacion',datos);

            return response.data;


        }catch(error){
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Error al editar calificación');
            }
            throw new Error('Error inesperado');
        }
    }
    async obtenerAlumnos(): Promise<Alumno[]> {
        try {
            const response = await axiosInstance.get<{ ok: boolean, data: Alumno[] }>('/maestro/alumnos');

            return response.data.data;

        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'No se puede obtener los alumnos');
            }
            throw new Error('Error inesperado al cargar alumnos');
        }
        
    }
}