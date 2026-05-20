import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
      await  mongoose.connect(process.env.MONGO)
      console.log("MongoDB is connected")
      console.log("DB NAME:", mongoose.connection.name);
    } catch (error) {
        console.error("MongoDB connection error:", error.message)
        

    }
}
export default connectDB;