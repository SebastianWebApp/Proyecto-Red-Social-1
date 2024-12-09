import dotenv from "dotenv";
import crypto from "node:crypto";


dotenv.config();

const Api_Verificacion_2Pasos = process.env.API_VERIFICACION_2PASOS;


export const Crear = async(req, res) =>{

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

            res.status(200).json({  // En caso de no encontrar el documento
                Estado: true,
                Respuesta: "Se le enviara el código de acceso a su WhatsApp"
            });
        
        }
        else{

            res.status(400).json({  // En caso de no encontrar el documento
                Estado: false,
                Respuesta: "Intente de nuevo"
            });

        }



    } catch (error) {

        res.status(400).json({  // En caso de no encontrar el documento
            Estado: false,
            Respuesta: error.message || error
        });

    }

}


export const Leer = async(req, res) =>{ 
    
    const Parametros = req.body;

    try {

        const Leer_Codigo = await fetch(`${Api_Verificacion_2Pasos}/Leer/${encodeURIComponent(Parametros.Telefono)}/${encodeURIComponent(Parametros.Codigo)}`,{
            method: "GET"
        });

        const Respuesta_Servidor = await Leer_Codigo.json();

        if(Respuesta_Servidor.Estado){

            Eliminar(Parametros.Telefono).then(Respuesta => {

                if(Respuesta){
                    res.status(200).json({  // En caso de no encontrar el documento
                        Estado: true,
                        Respuesta: "Listo Iniciar"
                    });
                }
                else{
                    res.status(400).json({  // En caso de no encontrar el documento
                        Estado: false,
                        Respuesta: "Intente de nuevo"
                    });
                }

            }).catch(error => {
                res.status(400).json({  // En caso de no encontrar el documento
                    Estado: false,
                    Respuesta: "Intente de nuevo"
                });
            })

        }

        else{

            res.status(400).json({  // En caso de no encontrar el documento
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
            });

        }

    } catch (error) {        
        res.status(400).json({  // En caso de no encontrar el documento
            Estado: false,
            Respuesta: "Intente de nuevo"
        });
    }
}

async function Eliminar(Telefono) {

    try {
        
        const Eliminar_Codigo = await fetch(`${Api_Verificacion_2Pasos}/Eliminar/${encodeURIComponent(Telefono)}`,{
            method: "DELETE"
        });
        
        const Respuesta_Servidor = await Eliminar_Codigo.json();
    
        if(Respuesta_Servidor.Estado){

            return true;
    
    
        }
        else{

            return false;
    

        }

    } catch (error) {
        
        return false;


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