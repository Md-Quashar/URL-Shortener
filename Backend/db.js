import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config('./.env');

//console.log(process.env.MONGO_URL);


const connectDB = async () => {
  //const Mongo_Local_url=process.env.MONGO_URL_LOCAL
  const Mongo_Atlas_url=process.env.MONGO_URL_ATLAS
  try {
    const conn = await mongoose.connect(Mongo_Atlas_url, {
        
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;