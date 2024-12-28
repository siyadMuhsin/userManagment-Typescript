import mongoose, { models } from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDB = async (): Promise<void> => {
    try {
        // Get MongoDB URI from environment variable, fallback to localhost if not provided
        const uri = process.env.MONGO_URL as string;

        console.log("url:",uri);
        

        // Mongoose connection options
        const options = {
            // useNewUrlParser: true,  
            // useUnifiedTopology: true,  
            // autoIndex: true,  
        };

        // Connect to MongoDB
        await mongoose.connect(uri, options);

        console.log("MongoDB connected successfully!");

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure if connection fails
    }
};

export default connectDB