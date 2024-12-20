
import {Crear_Codigo_Verificacion, Leer_Codigo_Verificacion, Eliminar_Codigo_Verificacion} from "../Servicios/codigo_verificacion.js";
import {Leer_Cuenta, Crear_Usuario, Eliminar_Usuario} from "../Servicios/crear_cuenta.js";
import {Desencriptar} from "../Servicios/encriptacion.js";


export const Leer_Usuario = async (req,res) => {

    const Leer_Usuarios = await Leer_Cuenta(req,res);

    if(Leer_Usuarios.Estado && Leer_Usuarios.Existe){


        const Clave_Desencriptar = Desencriptar({
            iv: Leer_Usuarios.Contenido.IV,
            encriptado: Leer_Usuarios.Contenido.Clave
        });


        if(req.body.Clave == Clave_Desencriptar){

            res.status(200).json({

                Estado: true,
                Respuesta: "Credenciales correctas"
    
            });
            
            return;

        }

        else{

            res.status(200).json({

                Estado: true,
                Respuesta: "Contraseña Incorrecta"
    
            });
            
            return;

        }

        

    }

    else if(Leer_Usuarios.Estado && Leer_Usuarios.Existe == false){

        res.status(404).json({

            Estado: false,
            Respuesta: "El usuario no existe"

        });
        
        return;
    }

    else if(Leer_Usuarios.Estado == false){

        res.status(400).json({

            Estado: false,
            Respuesta: Leer_Usuarios.Respuesta

        }); 

        return;

    }

}


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

        while (true){        

            const Eliminar_Cuenta = await Eliminar_Usuario(req,res);

            if(Eliminar_Cuenta.Estado == true){

                res.status(400).json({

                    Estado: false,
                    Respuesta: Borrar_Codigo.Respuesta
        
                }); 

                return;

            }

        }
        
    }


}


export const Olvide_Password  = async (req,res) => {

    const Leer_Usuarios = await Leer_Cuenta(req,res);

    if(Leer_Usuarios.Estado && Leer_Usuarios.Existe == false){

        res.status(404).json({

            Estado: false,
            Respuesta: "El usuario no existe"

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


    const Telefono_Desencriptar = Desencriptar({
        iv: Leer_Usuarios.Contenido.IV,
        encriptado: Leer_Usuarios.Contenido.Telefono
    });


    req.body.Telefono = Telefono_Desencriptar;


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


export const Verificar_Codigo_Verificar = async(req,res) => {


    const Leer_Usuarios = await Leer_Cuenta(req,res);

    if(Leer_Usuarios.Estado && Leer_Usuarios.Existe == false){

        res.status(404).json({

            Estado: false,
            Respuesta: "El usuario no existe"

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


    const Telefono_Desencriptar = Desencriptar({
        iv: Leer_Usuarios.Contenido.IV,
        encriptado: Leer_Usuarios.Contenido.Telefono
    });


    req.body.Telefono = Telefono_Desencriptar;

    // Leer Código Verificación

    const Leer_Codigo = await Leer_Codigo_Verificacion(req,res);


    if(Leer_Codigo.Estado == false){
        res.status(400).json({

            Estado: false,
            Respuesta: Leer_Codigo.Respuesta

        }); 

        return;
    }


    
    const Borrar_Codigo = await Eliminar_Codigo_Verificacion(req.body.Telefono);

    if(Borrar_Codigo.Estado){
        
        res.status(200).json({

            Estado: true,
            Respuesta: "Acceso Permitido"

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