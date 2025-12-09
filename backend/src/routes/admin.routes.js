import { eliminarCalificacion, obtenerReporteGlobal } from "../controllers/admin.controller.js";
import { Router } from "express";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.delete('/eliminar-calificacion/:calificacion_id',auth,eliminarCalificacion);
router.get('/reporte', auth, obtenerReporteGlobal);


export default router;