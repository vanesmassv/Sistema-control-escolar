import AdminServices from "../services/admin.services.js";

export const eliminarCalificacion = async (req, res, next) => {
    try {
        const { calificacion_id } = req.params;
        const usuario_id = req.user.usuario_id;

        const resultado = await AdminServices.eliminarCalificacion(calificacion_id, usuario_id);

        res.json({
            ok: true,
            message: resultado.message
        });

    } catch (error) {
    next(error);
  }
};

export const obtenerReporteGlobal = async (req, res, next) => {
  try {
    const usuario_id = req.user.usuario_id;

    const reporte = await AdminServices.obtenerReporteGlobal(usuario_id);

    res.json({
      ok: true,
      data: reporte
    });

  } catch (error) {
    next(error);
  }
};


