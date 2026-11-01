import {config} from "./config.js"
import mongoose from "mongoose";

export async function connectToDatabase() {
    try{
        await mongoose.connect(config.MONGODB_URI);
        console.log("MongoDB is Connected to the Server.")
    }
    catch(error){
        console.error("Error connecting to the database:", error);
        process.exit(1);
    } 
}
