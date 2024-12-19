import { Router } from 'express';
import {Nueva_Cuenta,Verificar_Codigo} from "../Controlador/login.js";
const router = Router();


// Iniciar Sesion
router.post('/Nueva_Cuenta', Nueva_Cuenta);
router.post('/Verificar_Codigo',Verificar_Codigo);


export default router;
