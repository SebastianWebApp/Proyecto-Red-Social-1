import  connectToDB  from "../Database/conectar_mysql.js";

export const Leer_Base_ID = async (req,res) => {

    const Id = req.params.Id;

    try {

        const [rows] = await connectToDB.query("SELECT Id, Teléfono, Clave FROM Lista_Usuarios WHERE Id = ?", [Id]);

        if(rows.length > 0){

            const Usuario = rows[0];

            res.status(200).json({

                Estado: true,
                Respuesta: "Usuario encontrado",
                Contenido: {
                    Id: Usuario.Id,
                    Telefono: Usuario.Teléfono,
                    Clave: Usuario.Clave
                }
    
            });

        }
        else{
            
            res.status(404).json({  // En caso de no encontrar el documento
                Estado: false,
                Respuesta: "Usuario no encontrado"
            });

        }

        
    } catch (error) {

        res.status(400).json({ 

            Estado: false, 
            Respuesta: "Error al leer la base de datos, intente de nuevo"
            
        });

    }

}


export const Crear_Usuario = async (req, res) =>{

    const Parametros = req.body;

    try {
        const [result] = await connectToDB.query("INSERT INTO Lista_Usuarios (Id, Teléfono, Clave) VALUES (?, ?, ?)", [Parametros.Id, Parametros.Telefono, Parametros.Clave]);
        res.status(200).json({

            Estado: true,
            Respuesta: "Se creo correctamente el usuario"

        });    
    
    } catch (error) {
        res.status(400).json({  
            Estado: false,
            Respuesta: "Intente de nuevo, error al crear al usuario"
        });
    }
}

export const Actualizar_Usuario = async (req, res) =>{

    const Parametros = req.body;

    try {
        const [result] = await connectToDB.query("UPDATE Lista_Usuarios SET Teléfono = ?, Clave = ? WHERE Id = ?", [Parametros.Telefono, Parametros.Clave, Parametros.Id]);
        if (result.affectedRows > 0) {

            res.status(200).json({

                Estado: true,
                Respuesta: "Usuario Actualizado correctamente"
    
            }); 


        } else {
            res.status(404).json({

                Estado: false,
                Respuesta: "Usuario no encontrado"
    
            }); 
        }
    } catch (error) {
        res.status(400).json({

            Estado: false,
            Respuesta: "Intente de nuevo, error al actualizar la información"

        }); 
    }
}


export const Eliminar_Usuario = async (req, res) =>{

    const Parametros = req.body;

    try {
        const [result] = await connectToDB.query("DELETE FROM Lista_Usuarios WHERE Id = ?", [Parametros.Id]);
        if (result.affectedRows > 0) {
            res.status(200).json({

                Estado: true,
                Respuesta: "Usuario Eliminado"
    
            });         
        
        } else {
            res.status(404).json({

                Estado: false,
                Respuesta: "Usuario no encontrado"
    
            });         
        }
    } catch (error) {
        res.status(400).json({

            Estado: false,
            Respuesta: "Intente de nuevo, error al eliminar el usuario"

        });     
    }

}