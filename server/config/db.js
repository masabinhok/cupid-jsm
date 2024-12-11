import mongoose from "mongoose";

export const connectToDB = async ()=>{
  try {
await mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connected to the database');
  })
  }
  catch(error){
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
}