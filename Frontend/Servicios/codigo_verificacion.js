import dotenv from "dotenv";
import crypto from "node:crypto";


dotenv.config();

const Api_Verificacion_2Pasos = process.env.API_VERIFICACION_2PASOS;


export async function Crear_Codigo_Verificacion(req, res) {

    const Parametros = req.body;


    try {

        const Codigo = generarCodigoDe6Digitos(Parametros.Telefono);

        
        const Solicitud = await fetch(`${Api_Verificacion_2Pasos}/Crear`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                _id: Parametros.Telefono,
                Codigo: Codigo  // Los datos que deseas enviar en el cuerpo de la solicitud
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


function generarCodigoDe6Digitos(Telefono) {
    // Usar el número de teléfono y la fecha actual
    const fecha = new Date().toISOString(); // Fecha en formato ISO para mayor precisión
    const telefonoNumerico = Telefono.toString(); // Convertir el teléfono a cadena

    // Concatenar el teléfono y la fecha para crear un texto base
    const textoBase = telefonoNumerico + fecha;

    // Crear un hash usando SHA256 para obtener una cadena de caracteres encriptada
    const hash = crypto.createHash('sha256').update(textoBase).digest('hex');

    // Tomar los primeros 6 dígitos numéricos del hash
    const codigo = parseInt(hash.replace(/\D/g, '').slice(0, 6), 10);

    // Asegurarse de que sea un código de 6 dígitos y rellenar con ceros si es necesario
    return codigo.toString().padStart(6, '0');
}

