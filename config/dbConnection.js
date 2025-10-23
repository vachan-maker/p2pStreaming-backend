import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connectDB = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected:",connectDB.connection.host);
    }catch(error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;