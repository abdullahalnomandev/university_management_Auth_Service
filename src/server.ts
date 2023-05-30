import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import "colorts/lib/string";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connected successfully.".green);    
    
    app.listen(config.port, () => {
      console.log(`Application listening on ${config.port}`.yellow);
    });

  } catch (error) {
    console.log(error, "Failed to connect." );
  }
};
connectToDatabase();