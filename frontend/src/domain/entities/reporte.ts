// Pieza 1: Para la lista pequeña "resumenPorMateria"
export interface ResumenMateria {
    materia: string;
    promedio: string; // Viene como string del back ("89.87")
}

// Pieza 2: Para la lista grande "detallesPorAlumnoYMateria"
export interface DetalleAlumno {
    calificacion_id: number;
    grupo: string;
    alumno: string;
    matricula: string;
    materia: string;
    promedio: string;
}

// Pieza 3: El objeto PAPÁ que contiene a los dos anteriores
export interface ReporteGlobal {
    promedioGeneral: string;
    resumenPorMateria: ResumenMateria[];        
    detallesPorAlumnoYMateria: DetalleAlumno[]; 
}

