export interface ActualizarCalificacionDTO  {
    calificacion_id: number,
    nota: number,
    observaciones: string
    
}

export interface CrearCalificacionDTO {
    nota: number,
    observaciones: string,
    inscripcion_id: number,
    
}

export interface Alumno{
    alumno_id: number; 
    nombre: string;
    matricula?: string;
    inscripcion_id: number; 
    calificacion?: string |number | null;
    calificacion_id?: number | null;
    observaciones?: string | null;
    materia?: string;
}



export interface MaestroRepository{

    editarCalificacion(datos: ActualizarCalificacionDTO): Promise<boolean>;
    crearCalificacion(datos: CrearCalificacionDTO): Promise<void>;
    obtenerAlumnos(): Promise<Alumno[]>;
}

