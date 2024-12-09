import dotenv from "dotenv";

dotenv.config();

const Api_Verificacion_whatsapp = process.env.API_VERIFICACION_WHATSAPP;

export async function EnviarCodigo(Telefono,Codigo){

    try {


        const Solicitud = await fetch(`${Api_Verificacion_whatsapp}`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                telefono: Telefono,
                mensaje: "Código de verificación: "+Codigo  // Los datos que deseas enviar en el cuerpo de la solicitud
            })
        });
               

        const Respuesta_Servidor = await Solicitud.json();

        if(Respuesta_Servidor.Estado){
          return true;
        }
        else{
            return false;
        }



    } catch (error) {
        console.log(error)
        return false;        
    }

}