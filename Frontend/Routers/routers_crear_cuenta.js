import { Router } from 'express';
import {Crear, Leer} from "../Controlador/codigo_verificacion.js";
const router = Router();

// Rutas de usuarios
router.post('/Crear', Crear);

router.post('/Leer', Leer);


export default router;
