import {Router} from "express";
import {Leer_Base_ID,Crear_Usuario,Actualizar_Usuario,Eliminar_Usuario} from "../Controladores/crud_mysql.js";

const router = Router();

// Rutas
router.get("/Leer/:Id",Leer_Base_ID);

router.post("/Crear_Usuario",Crear_Usuario);

router.post("/Actualizar_Usuario",Actualizar_Usuario);

router.delete("/Eliminar_Usuario",Eliminar_Usuario);

export default router;

