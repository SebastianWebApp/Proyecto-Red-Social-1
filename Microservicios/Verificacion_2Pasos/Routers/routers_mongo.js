import { Router } from 'express';
import {Leer_Codigo, Crear_Codigo, Eliminar_Codigo} from "../Controlador/mongo_crud.js"
const router = Router();

// Rutas de usuarios
router.get('/Leer/:telefono/:codigo', Leer_Codigo);

router.post('/Crear', Crear_Codigo);

router.delete('/Eliminar/:parametro', Eliminar_Codigo);



export default router;

