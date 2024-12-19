
import {Crear_Codigo_Verificacion, Leer_Codigo_Verificacion, Eliminar_Codigo_Verificacion} from "../Servicios/codigo_verificacion.js";
import {Leer_Cuenta, Crear_Usuario, Eliminar_Usuario} from "../Servicios/crear_cuenta.js";




export const Nueva_Cuenta = async (req, res) => {

    const Leer_Usuarios = await Leer_Cuenta(req,res);

    if(Leer_Usuarios.Estado && Leer_Usuarios.Existe){

        res.status(404).json({

            Estado: false,
            Respuesta: "Usuario existente"

        });
        
        return;

    }

    if(Leer_Usuarios.Estado == false){

        res.status(400).json({

            Estado: false,
            Respuesta: Leer_Usuarios.Respuesta

        }); 

        return;

    }


    // No existe el Usuario

    const Crear_Codigo = await Crear_Codigo_Verificacion(req,res);

    if(Crear_Codigo.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Crear_Codigo.Respuesta

        }); 

        return;
    }
    else{

        res.status(404).json({

            Estado: false,
            Respuesta: Crear_Codigo.Respuesta

        }); 

        return;
    }


}


export const Verificar_Codigo = async(req,res) => {


    // Leer Código Verificación

    const Leer_Codigo = await Leer_Codigo_Verificacion(req,res);

    if(Leer_Codigo.Estado == false){
        res.status(400).json({

            Estado: false,
            Respuesta: Leer_Codigo.Respuesta

        }); 

        return;
    }


    // Leer que no exista el usuario

    const Leer_Usuarios = await Leer_Cuenta(req,res);

    if(Leer_Usuarios.Estado && Leer_Usuarios.Existe){


        res.status(404).json({

            Estado: false,
            Respuesta: "Usuario existente"

        });
        
        return;

    }

    if(Leer_Usuarios.Estado == false){

        res.status(400).json({

            Estado: false,
            Respuesta: Leer_Usuarios.Respuesta

        }); 

        return;

    }



    // Crear Usuario

    const Crear_Cuenta = await Crear_Usuario(req,res);


    if(Crear_Cuenta.Estado == false){

        res.status(400).json({

            Estado: false,
            Respuesta: Crear_Cuenta.Respuesta

        }); 

        return;

    }


    // Borrar Código de verificación

    const Borrar_Codigo = await Eliminar_Codigo_Verificacion(req.body.Telefono);

    if(Borrar_Codigo.Estado){
        
        res.status(200).json({

            Estado: true,
            Respuesta: "Usuario creado correctamente"

        }); 

        return;
    }
    else{
        
        res.status(400).json({

            Estado: false,
            Respuesta: Borrar_Codigo.Respuesta

        }); 

        return;
    }


}