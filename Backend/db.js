import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config('./.env');

//console.log(process.env.MONGO_URL);


const connectDB = async () => {
  const Local_url=process.env.MONGO_URL
  try {
    const conn = await mongoose.connect(Local_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;