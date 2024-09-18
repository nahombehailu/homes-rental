import { log } from "console"
import mongoose from "mongoose"

export const mongodbConnection=async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("succesfully connected to mongodb")
     })
    } catch (error) {
        console.log(error)
    }
    
}