import {Encriptar} from "./encriptacion.js";
import dotenv from "dotenv";


dotenv.config();

const Api_Inicio_Sesion = process.env.API_INICIO_SESION;


export async function Leer_Cuenta(req,res){

    const Parametro = req.body;

    try {

        const Solicitud = await fetch(Api_Inicio_Sesion + "/Leer/"+ Parametro.Usuario,{
            method: "GET",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            }
        });

        const Respuesta_Servidor = await Solicitud.json();


        if(Solicitud.status === 200){


            const Respuesta = {
                Estado: true,
                Existe: true,
                Respuesta: Respuesta_Servidor.Respuesta,
                Contenido: Respuesta_Servidor.Contenido
            }
    
            return Respuesta;

        }



        if(Solicitud.status === 404){
           

            const Respuesta = {
                Estado: true,
                Existe: false,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;


        }


        else{

            const Respuesta = {
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;
        }

       
    } catch (error) {
     

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo"
        }

        return Respuesta;
    }

}



export async function Crear_Usuario(req,res) {

    const Parametro = req.body;

    try {

        const Clave_Encriptada = Encriptar(Parametro.Clave);
        const Telefono_Encriptada = Encriptar(Parametro.Telefono);


        const Solicitud = await fetch(Api_Inicio_Sesion + "/Crear_Usuario",{
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({

                Id: Parametro.Usuario,
                Telefono: Telefono_Encriptada.encriptado,
                Clave: Clave_Encriptada.encriptado,
                IV: Clave_Encriptada.iv

            })
        });

        const Respuesta_Servidor = await Solicitud.json();


        if(Respuesta_Servidor.Estado){
           
            const Respuesta = {
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;

        }

        else{
            
            const Respuesta = {
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;

        }

       
    } catch (error) {
     
        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo"
        }

        return Respuesta;
    }
    
}



export async function Actualizar_Usuario(req,res) {

    const Parametro = req.body;

    try {

        
        const Clave_Encriptada = Encriptar(Parametro.Clave);
        const Telefono_Encriptada = Encriptar(Parametro.Telefono);


        const Solicitud = await fetch(Api_Inicio_Sesion + "/Actualizar_Usuario",{
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({

                Id: Parametro.Usuario,
                Telefono: Telefono_Encriptada.encriptado,
                Clave: Clave_Encriptada.encriptado,
                IV: Clave_Encriptada.iv

            })
        });

        const Respuesta_Servidor = await Solicitud.json();


        if(Respuesta_Servidor.Estado){
           
            const Respuesta = {
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;

        }

        else{
            
            const Respuesta = {
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;

        }

       
    } catch (error) {
     
        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo"
        }

        return Respuesta;
    }
    
}



export async function Eliminar_Usuario(req,res) {

    const Parametro = req.body;

    try {

        const Solicitud = await fetch(Api_Inicio_Sesion + "/Eliminar_Usuario",{
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({

                Id: Parametro.Usuario,                

            })
        });

        const Respuesta_Servidor = await Solicitud.json();


        if(Respuesta_Servidor.Estado){
           
            const Respuesta = {
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;

        }

        else{
            
            const Respuesta = {
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
            return Respuesta;

        }

       
    } catch (error) {
     
        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo"
        }

        return Respuesta;
    }
    
}


