// ==========================================
// 1. USUARIOS Y AUTH
// ==========================================

export interface Rol {
    id: number;       // BD: rol_id
    nombre: string;   // BD: nombre
}

export interface User {
    id: number;           // BD: usuario_id
    nombre: string;       // BD: nombre
    email: string;        // BD: email
    rolId: number;        // BD: rol_id
    
    // Opcionales del sistema
    createdAt?: string;   
    updatedAt?: string;

    // Relaciones
    rol?: Rol;
    maestro?: Maestro;
}

// ==========================================
// 2. ESTRUCTURA ACADÉMICA
// ==========================================

export interface Maestro {
    id: number;         // BD: maestro_id
    usuarioId: number;  // BD: usuario_id
    matricula: string;  // BD: matricula
    
    // Relaciones
    usuario?: User;
    grupos?: Grupo[];
}

export interface Grupo {
    id: number;         // BD: grupo_id
    nombre: string;     // BD: nombre
    maestroId?: number; // BD: maestro_id
    
    // Relaciones
    maestro?: Maestro;
    alumnos?: Alumno[];
}

export interface Alumno {
    id: number;              // BD: alumno_id
    nombre: string;          // BD: nombre
    matricula: string;       // BD: matricula
    fechaNacimiento: string; // BD: fecha_nacimiento
    grupoId: number;         // BD: grupo_id
    
    createdAt?: string;
    updatedAt?: string;

    // Relaciones
    grupo?: Grupo;
    inscripciones?: Inscripcion[];
}

// ==========================================
// 3. MATERIAS Y SEMESTRES
// ==========================================

export interface Materia {
    id: number;           // BD: materia_id
    nombre: string;       // BD: nombre
    codigo: string;       // BD: codigo
    descripcion?: string; // BD: descripcion
    
    createdAt?: string;
    updatedAt?: string;
}

export interface Semestre {
    id: number;          // BD: semestre_id
    nombre: string;      // BD: nombre
    fechaInicio: string; // BD: fecha_inicio
    fechaFin: string;    // BD: fecha_fin
}

// ==========================================
// 4. INSCRIPCIONES Y CALIFICACIONES
// ==========================================

export interface Inscripcion {
    id: number;         // BD: inscripcion_id
    alumnoId: number;   // BD: alumno_id
    materiaId: number;  // BD: materia_id
    semestreId: number; // BD: semestre_id

    // Relaciones
    alumno?: Alumno;
    materia?: Materia;
    semestre?: Semestre;
    calificaciones?: Calificacion[];
}

export interface Calificacion {
    id: number;            // BD: calificacion_id
    inscripcionId: number; // BD: inscripcion_id
    fechaRegistro: string; // BD: fecha_registro
    observaciones?: string;// BD: observaciones
    nota?: number;         // BD: nota
    
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    // Soft delete

    // Relaciones
    inscripcion?: Inscripcion;
}





// ==========================================
// TIPOS AUXILIARES
// ==========================================

export type UserRole = 'ADMIN' | 'MAESTRO' ;