// Importamos el módulo mongoose, que se utiliza para interactuar con bases de datos MongoDB.
import mongoose from "mongoose";

// Extraemos los objetos necesarios desde mongoose:
// - model: para definir nuevos modelos de datos.
// - models: para acceder a modelos previamente definidos.
// - Schema: para definir la estructura de los documentos en una colección.
const {model, models, Schema} = mongoose;

const Schema_mongo = new Schema({

    // Campo `_id`: Identificador único para cada documento.
    // - Tipo: String.
    // - required: Indica que este campo es obligatorio.
    // - unique: Garantiza que no se repitan los valores.

    _id: {type: String, required: true, unique: true},
    Codigo: {type: String, required: true},

},{
    // Opciones del esquema:
    // - collection: Especifica el nombre de la colección en MongoDB donde se almacenarán los documentos.
    collection: "Codigos"
});

// Exportamos el modelo `Mongo_CRUD`:
// - Si ya existe un modelo llamado "Mongo_CRUD" en `models`, lo reutilizamos.
// - Si no existe, creamos un nuevo modelo con el esquema `Schema_mongo`.
export const Mongo_CRUD = models.Mongo_CRUD || new model("Mongo_CRUD", Schema_mongo);


