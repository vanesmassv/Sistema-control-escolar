import models from "../models/index.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequest.js";

class AdminServices {
    
    // ESTE YA ESTABA PERFECTO
    async eliminarCalificacion(calificacion_id, usuario_id) {
        if (!calificacion_id) {
            throw new BadRequestError('El ID de la calificación es obligatorio');
        }

        const usuario = await models.Usuario.findByPk(usuario_id, {
            include: [{ model: models.Rol, as: 'rol' }]
        });

        if (!usuario || usuario.rol.nombre !== 'ADMIN') {
            throw new UnauthorizedError('No tienes permiso para eliminar calificaciones');
        }

        const calificacion = await models.Calificacion.findByPk(calificacion_id);

        if (!calificacion) {
            throw new NotFoundError('La calificación no existe');
        }

        await calificacion.destroy();

        return { message: 'Calificación eliminada correctamente' };
    }

    async obtenerReporteGlobal() {

        // DETALLES POR ALUMNO Y MATERIA
        const promediosPorAlumnoMateria = await models.Calificacion.findAll({
            attributes: [
                'calificacion_id',
                [models.sequelize.fn('AVG', models.sequelize.col('nota')), 'promedio']
            ],
            include: [{
                model: models.Inscripcion,
                as: 'inscripcion',
                required: true,
                attributes: [],
                include: [
                    {
                        model: models.Alumno,
                        as: 'alumno',
                        attributes: ['alumno_id', 'nombre', 'matricula'],
                        include: [{
                            model: models.Grupo,
                            as: 'grupo',
                            attributes: ['nombre']
                        }]
                    },
                    {
                        model: models.Materia,
                        as: 'materia',
                        attributes: ['materia_id', 'nombre']
                    }
                ]
            }],
            group: [
                'calificacion_id', 
                'inscripcion.alumno.alumno_id',
                'inscripcion.alumno.nombre',
                'inscripcion.alumno.matricula',
                'inscripcion.alumno.grupo.grupo_id', 
                'inscripcion.alumno.grupo.nombre',
                'inscripcion.materia.materia_id',
                'inscripcion.materia.nombre'
            ],
            raw: true
        });


        // PROMEDIO GENERAL DE TODAS LAS CALIFICACIONES
        const promedioGeneralData = await models.Calificacion.findOne({
            attributes: [
                [models.sequelize.fn('AVG', models.sequelize.col('nota')), 'promedio_general']
            ],
            raw: true
        });


        // PROMEDIO GENERAL POR MATERIA 
        const promediosPorMateria = await models.Calificacion.findAll({
            attributes: [
                [models.sequelize.fn('AVG', models.sequelize.col('nota')), 'promedio']
            ],
            include: [{
                model: models.Inscripcion,
                as: 'inscripcion',
                attributes: [],
                required: true,
                include: [{
                    model: models.Materia,
                    as: 'materia',
                    attributes: ['materia_id', 'nombre']
                }]
            }],
            group: [
                'inscripcion.materia.materia_id',
                'inscripcion.materia.nombre'
            ],
            raw: true
        });


        // FORMATEO FINAL DEL REPORTE
        return {
            promedioGeneral: promedioGeneralData.promedio_general
                ? parseFloat(promedioGeneralData.promedio_general).toFixed(2)
                : "N/A",

            resumenPorMateria: promediosPorMateria.map(item => ({
                materia: item['inscripcion.materia.nombre'],
                promedio: parseFloat(item.promedio).toFixed(2)
            })),

            detallesPorAlumnoYMateria: promediosPorAlumnoMateria.map(item => ({
                calificacion_id: item['calificacion_id'],
                grupo: item['inscripcion.alumno.grupo.nombre'], 
                alumno: item['inscripcion.alumno.nombre'],
                matricula: item['inscripcion.alumno.matricula'],
                materia: item['inscripcion.materia.nombre'],
                promedio: parseFloat(item.promedio).toFixed(2)
            }))
        };
    }
}

export default new AdminServices();