import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB).then( res => {
        console.log("Base de datos conectada");
    }).catch(async error => {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Espera 10 segundos antes de reintentar
        console.log("Reintentando conectar a la base de datos...");
        await connectToDB();
    });
}

export default connectToDB;