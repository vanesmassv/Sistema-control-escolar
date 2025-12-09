import MaestroService from "../services/maestro.services.js";

export const obtenerMisAlumnos = async (req, res, next) => {
  try {
    
    const usuario_id = req.user.usuario_id; // viene del JWT

    const alumnos = await MaestroService.obtenerAlumnos(usuario_id);

    res.json({
      ok: true,
      data: alumnos
    });

  } catch (error) {
    next(error);
  }
};

export const crearCalificacion = async(req, res ,next) => {
  try {

    const {nota, observaciones, inscripcion_id} = req.body;

    const usuario_id = req.user.usuario_id;
    
    const calificacion = await MaestroService.crearCalificacion(
      nota,
      observaciones,
      inscripcion_id,
      usuario_id
    );

    res.status(201).json({
      ok: true,
      message: 'Calificacion registrada con exito',
      data: calificacion
    })

  }catch(error){
    next(error);
  }
};


export const editarCalificacion = async (req, res, next) =>{
  try{
    const {nota, observaciones, calificacion_id} = req.body
    const usuario_id = req.user.usuario_id;

    const calificacion = await MaestroService.editarCalificacion(
      calificacion_id,
      nota,
      observaciones,
      usuario_id
    );

    res.status(200).json({
      ok: true,
      message: 'Calificacion registrada con exito',
      data: calificacion
    })
  }catch(error){
    next(error);
  }
}