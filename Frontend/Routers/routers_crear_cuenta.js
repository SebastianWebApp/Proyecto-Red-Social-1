import { Router } from 'express';
import {Nueva_Cuenta, Verificar_Codigo, Leer_Usuario, Olvide_Password, Verificar_Codigo_Verificar} from "../Controlador/login.js";
const router = Router();


// Iniciar Sesion
router.post('/Nueva_Cuenta', Nueva_Cuenta);
router.post('/Verificar_Codigo',Verificar_Codigo);
router.post('/Leer_Cuenta',Leer_Usuario);
router.post('/Olvide_Password',Olvide_Password);
router.post('/Olvide_Password_Verificar',Verificar_Codigo_Verificar);


export default router;
