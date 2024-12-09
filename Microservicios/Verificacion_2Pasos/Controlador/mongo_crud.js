import {Mongo_CRUD} from "../Modelos/estructura_mongo.js";
import {EnviarCodigo} from "../Controlador/envio_codigo.js";


export const Leer_Codigo = async(req, res) =>{

    const Telefono = req.params.telefono;
    const Codigo = req.params.codigo;

    try {
     
        const Lectura_Db = await Mongo_CRUD.findById(Telefono);


        // Verificamos no se encontró el documento
        if (!Lectura_Db) {

            res.status(404).json({  // En caso de no encontrar el documento
                Estado: false,
                Respuesta: "Documento no encontrado"
            });

            return;
        }

        if(Codigo == Lectura_Db.Codigo){

            res.status(200).json({

                Estado: true,
                Respuesta: "Acceso Permitido"
    
            });

        }
        else{

            res.status(200).json({
                Estado: false,
                Respuesta: "Código Incorrecto"
            });
        }


    } catch (error) {
        res.status(400).json({ 

            Estado: false, 
            Respuesta: "Error al leer la base de datos, intente de nuevo"
            
        });
    }
};

export const Crear_Codigo = async(req, res) =>{


    const Parametros = req.body;

    try {

         // Intentamos buscar el documento por _id y actualizarlo, si no existe, se crea uno nuevo
         const Crear_Db = await Mongo_CRUD.findOneAndUpdate(
            { _id: Parametros._id }, // Condición para encontrar el documento
            { Codigo: Parametros.Codigo }, // Datos que se actualizarán (o se crearán si el documento no existe)
            {
                new: true,    // Devuelve el documento después de la actualización (si es encontrado)
                upsert: true, // Si no encuentra el documento, lo crea con el _id y Codigo
                runValidators: true // Ejecuta las validaciones de Mongoose en el documento
            }
        );


        EnviarCodigo(Parametros._id,Parametros.Codigo)
        .then(EnviarCodigo => {

            if(EnviarCodigo){
                // Respondemos con el documento actualizado o creado
                res.status(200).json({
                    Estado: true,
                    Respuesta: "Clave creada correctamente"
                });
            }
            else{
                res.status(400).json({
                    Estado: false,
                    Respuesta: "Intente de nuevo código no enviado"
                });
            }


        }).catch(error => {
            res.status(400).json({
                Estado: false,
                Respuesta: "Intente de nuevo código no enviado"
            });
        });
            

    } catch (error) {
        
        res.status(400).json({

            Estado: false,
            Respuesta: "Error al crear el campo, intente de nuevo"

        });

    }


};

export const Eliminar_Codigo = async (req, res) =>{

    const Parametro = req.params.parametro;

    try {
        
        const Eliminar_Db = await Mongo_CRUD.findByIdAndDelete(Parametro);
        
        // Verificamos no se encontró el documento
        if (!Eliminar_Db) {

            res.status(404).json({  // En caso de no encontrar el documento
                Estado: false,
                Respuesta: "Documento no encontrado"
            });

            return;
        }

        res.status(200).json({
            Estado: true,
            Respuesta: "Se elimino correctamente"
        });



    } catch (error) {
        
        res.status(400).json({

            Estado: false,
            Respuesta: "Error al crear el campo, intente de nuevo"

        });

    }


};




