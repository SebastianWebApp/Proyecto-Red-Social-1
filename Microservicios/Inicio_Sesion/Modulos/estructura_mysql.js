import  connectToDB  from "../Database/conectar_mysql.js";

// Crear base de datos

const crearDatabase = async () => {

    try {

        // Creamos la tabla con nombre PrograRed
        await connectToDB.query("CREATE DATABASE IF NOT EXISTS PrograRed;");
        console.log("Base de datos PrograRed creada (si no existía)");

        
    } catch (error) {
        console.error("Error al crear la base de datos:", error.message);
    }


}


const crearTabla = async () => {

    try {
        
        // Cambiar a la base de datos 'node_sql' después de crearla
        await connectToDB.query("USE PrograRed;")

        // Crear Tabla 
        await connectToDB.query(`CREATE TABLE IF NOT EXISTS Lista_Usuarios (
            Id VARCHAR(100) PRIMARY KEY,
            Teléfono VARCHAR(100) NOT NULL,
            Clave VARCHAR(100) NOT NULL
            );`
        );
        console.log("Tabla 'Lista_Usuarios' creada (si no existía).");


    } catch (error) {
        console.error("Error al crear la tabla:", error.message);
    }

}

export const InicializarDatabase = async () => {

    await crearDatabase();
    await crearTabla();

}