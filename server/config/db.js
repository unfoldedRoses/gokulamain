import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect("mongodb+srv://praveendb009:worldatpeace123456@cluster0.skmqw.mongodb.net/test", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`mongodb connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB;