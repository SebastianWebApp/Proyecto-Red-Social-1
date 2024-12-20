import dotenv from "dotenv";
import {Encriptar} from "./encriptacion.js";


dotenv.config();

const Api_Verificacion_2Pasos = process.env.API_VERIFICACION_2PASOS;


export async function Crear_Codigo_Verificacion(req, res) {

    const Parametros = req.body;


    try {

        var random = generarAleatorio(16);

        const  Codigo_Encriptado = Encriptar(Parametros.Telefono + random);


        // Tomar los primeros 6 dígitos numéricos del hash
        const Codigo = parseInt(Codigo_Encriptado.encriptado.replace(/\D/g, '').slice(0, 6), 10);

        

        
        const Solicitud = await fetch(`${Api_Verificacion_2Pasos}/Crear`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                _id: Parametros.Telefono,
                Codigo: Codigo.toString().padStart(6, '0')  // Los datos que deseas enviar en el cuerpo de la solicitud
            })
        });

        const Respuesta_Servidor = await Solicitud.json();

        if(Respuesta_Servidor.Estado){    
            
            const Respuesta = {
                Estado: true,
                Respuesta: "Se le enviara el código de acceso a su WhatsApp"
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


export async function Leer_Codigo_Verificacion(req, res){ 
    
    const Parametros = req.body;

    try {


        const Leer_Codigo = await fetch(`${Api_Verificacion_2Pasos}/Leer/${encodeURIComponent(Parametros.Telefono)}/${encodeURIComponent(Parametros.Codigo)}`,{
            method: "GET"
        });

        const Respuesta_Servidor = await Leer_Codigo.json();


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

export async function Eliminar_Codigo_Verificacion(Telefono) {

    try {
        
        const Eliminar_Codigo = await fetch(`${Api_Verificacion_2Pasos}/Eliminar/${encodeURIComponent(Telefono)}`,{
            method: "DELETE"
        });
        
        const Respuesta_Servidor = await Eliminar_Codigo.json();
    
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


function generarAleatorio(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < longitud; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
}
