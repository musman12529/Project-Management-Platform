import mongoose from "mongoose";

const connect = async () => {
  console.log("inside connect");
  
  if (mongoose.connections[0].readyState) return;

  try {
    console.log("trying");
    
    await mongoose.connect('mongodb://localhost:27017/project3100', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
