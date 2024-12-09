import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB).then( res => {
        console.log("Base de datos conectada");
    });
}

export default connectToDB;