//obtener todos los alumnos asignados al maestro
import models from "../models/index.js";
import { BadRequestError } from '../errors/BadRequest.js';
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';


class MaestroService{
async obtenerAlumnos(usuario_id) {
        // identificar al Maestro
        const maestro = await models.Maestro.findOne({
            where: { usuario_id },
            attributes: ['maestro_id']
        });

        if (!maestro) {
            throw new NotFoundError('No existe ese perfil de maestro');
        }

        // Obtener los Grupos del Maestro
        const grupos = await models.Grupo.findAll({
            where: { maestro_id: maestro.maestro_id },
            attributes: ['grupo_id']
        });

        const grupo_ids = grupos.map(g => g.grupo_id);

        if (grupo_ids.length === 0) {
            return []; 
        }

        // BUSCAR INSCRIPCIONES (CORREGIDO)
        const inscripciones = await models.Inscripcion.findAll({
            
            include: [
                {
                    model: models.Alumno,
                    as: 'alumno',
                    where: { grupo_id: grupo_ids }, 
                    attributes: ['alumno_id', 'nombre', 'matricula']
                },
                {
                    model: models.Materia,
                    as: 'materia', 
                    attributes: ['nombre'] 
                },
                {
                    model: models.Calificacion,
                    as: 'calificaciones', 
                    required: false, 
                    attributes: ['calificacion_id', 'nota','observaciones']
                }
            ]
        });

        return inscripciones.map(item => {
            const calificacionData = (item.calificaciones && item.calificaciones.length > 0) 
                ? item.calificaciones[0] 
                : {};

            return {
                alumno_id: item.alumno.alumno_id,
                nombre: item.alumno.nombre,
                matricula: item.alumno.matricula,
                
                inscripcion_id: item.inscripcion_id, 
                
                calificacion: calificacionData.nota !== undefined ? calificacionData.nota : null,
                calificacion_id: calificacionData.calificacion_id || null,
                observaciones: calificacionData.observaciones || null,
                materia: item.materia ? item.materia.nombre : 'Sin Asignar',
            };
        });
    }
    async crearCalificacion(nota,  observaciones, inscripcion_id, usuario_id) {

        if (nota === undefined || !inscripcion_id) {
            throw new BadRequestError('La nota y la inscripción son obligatorias');
        }

        const maestro = await models.Maestro.findOne({
            where: { usuario_id }
        });

        if (!maestro) {
            throw new UnauthorizedError('No tienes permiso para calificar');
        }

        
        const inscripcion = await models.Inscripcion.findOne({
            where: { inscripcion_id },
            include: [{
            model: models.Alumno,
            as: 'alumno',
            include: [{
                model: models.Grupo,
                as: 'grupo',   
                where: { maestro_id: maestro.maestro_id }
            }]
            }]
        });

        if (!inscripcion) {
            throw new UnauthorizedError('No puedes calificar a este alumno');
        }

        
        const calificacionExistente = await models.Calificacion.findOne({
            where: { inscripcion_id }
        });

        if (calificacionExistente) {
            throw new BadRequestError('Esta inscripción ya tiene una calificación registrada');
        }

        
        const calificacion = await models.Calificacion.create({
            nota,
            observaciones,
            inscripcion_id,
            fecha_registro: new Date()
        });

        return calificacion;
    }
    async editarCalificacion(calificacion_id, nota, observaciones, usuario_id) {

        if (!calificacion_id || nota === undefined) {
            throw new BadRequestError('El ID de calificación y la nota son obligatorios');
        }

        
        const maestro = await models.Maestro.findOne({
            where: { usuario_id }
        });

        if (!maestro) {
            throw new UnauthorizedError('No tienes permiso para editar calificaciones');
        }

        
        const calificacion = await models.Calificacion.findOne({
            where: { calificacion_id },
                attributes: ['calificacion_id', 'nota', 'observaciones', 'fecha_registro'],
                include: [{
                    model: models.Inscripcion,
                    as: 'inscripcion',
                    attributes: ['inscripcion_id'],
                        include: [{
                            model: models.Alumno,
                            as: 'alumno',
                            attributes: ['alumno_id', 'nombre', 'matricula'],
                        include: [{
                            model: models.Grupo,
                            as: 'grupo',
                            attributes: ['nombre']
                        }]
                    }]
                }]
            });

        if (!calificacion) {
            throw new UnauthorizedError('No puedes modificar esta calificación');
        }

        
        calificacion.nota = nota;
        if (observaciones !== undefined) {
            calificacion.observaciones = observaciones;
        }

        
        await calificacion.save();

        return calificacion;
    }

}


export default new MaestroService();