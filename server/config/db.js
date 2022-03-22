import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let url="mongodb+srv://praveendb009:worldatpeace123456@cluster0.skmqw.mongodb.net/gokuladb";
let url2="mongodb://127.0.0.1:27017/mydb"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
