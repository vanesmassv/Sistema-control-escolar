import Alumno from "./Alumno.js"
import Materia from "./Materia.js"
import Calificacion from "./Calificacion.js"
import Inscripcion from "./Inscripcion.js"
import Maestro from "./Maestro.js"
import Semestre from "./Semestre.js"
import Grupo from "./Grupo.js"
import Usuario from "./Usuario.js"
import Rol from "./Rol.js"
import sequelize from "../config/sequelize.js"


//USUARIOS ⇄ ROLES
Rol.hasMany(Usuario, {
  foreignKey: 'rol_id',
  as: 'usuarios'
});

Usuario.belongsTo(Rol, {
  foreignKey: 'rol_id',
  as: 'rol'
});

//USUARIOS ⇄ MAESTROS
Usuario.hasOne(Maestro, {
  foreignKey: 'usuario_id',
  as: 'maestro'
});

Maestro.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

//MAESTROS ⇄ GRUPOS
Maestro.hasMany(Grupo, {
  foreignKey: 'maestro_id',
  as: 'grupos'
});

Grupo.belongsTo(Maestro, {
  foreignKey: 'maestro_id',
  as: 'maestro'
});


//GRUPOS ⇄ ALUMNOS
Grupo.hasMany(Alumno, {
  foreignKey: 'grupo_id',
  as: 'alumnos'
});

Alumno.belongsTo(Grupo, {
  foreignKey: 'grupo_id',
  as: 'grupo'
});


//ALUMNOS ⇄ INSCRIPCIONES
Alumno.hasMany(Inscripcion, {
  foreignKey: 'alumno_id',
  as: 'inscripciones'
});

Inscripcion.belongsTo(Alumno, {
  foreignKey: 'alumno_id',
  as: 'alumno'
});


//MATERIAS ⇄ INSCRIPCIONES
Materia.hasMany(Inscripcion, {
  foreignKey: 'materia_id',
  as: 'inscripciones'
});

Inscripcion.belongsTo(Materia, {
  foreignKey: 'materia_id',
  as: 'materia'
});


//SEMESTRE ⇄ INSCRIPCIONES
Semestre.hasMany(Inscripcion, {
  foreignKey: 'semestre_id',
  as: 'inscripciones'
});

Inscripcion.belongsTo(Semestre, {
  foreignKey: 'semestre_id',
  as: 'semestre'
});

//INSCRIPCIONES ⇄ CALIFICACIONES
Inscripcion.hasMany(Calificacion, {
  foreignKey: 'inscripcion_id',
  as: 'calificaciones'
});

Calificacion.belongsTo(Inscripcion, {
  foreignKey: 'inscripcion_id',
  as: 'inscripcion'
});


//RELACIÓN INDIRECTA
Alumno.belongsToMany(Materia, {
  through: Inscripcion,
  foreignKey: 'alumno_id',
  otherKey: 'materia_id',
  as: 'materias'
});

Materia.belongsToMany(Alumno, {
  through: Inscripcion,
  foreignKey: 'materia_id',
  otherKey: 'alumno_id',
  as: 'alumnos'
});


const models = {
    sequelize, 
    Rol, 
    Usuario, 
    Maestro, 
    Grupo, 
    Alumno,
    Calificacion, 
    Materia,
    Semestre,
    Inscripcion,
};

export default models;
