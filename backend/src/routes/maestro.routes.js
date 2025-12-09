import auth from '../middleware/auth.middleware.js'
import { obtenerMisAlumnos, crearCalificacion,editarCalificacion } from "../controllers/maestro.controller.js";
import { Router } from "express";

const router = Router();

router.get('/alumnos',auth,obtenerMisAlumnos);
router.post('/crear-calificacion',auth,crearCalificacion);
router.put('/editar-calificacion',auth,editarCalificacion);


export default router;