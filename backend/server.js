import app from "./app.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { connectMongoDatabase } from "./config/db.js";
import Razorpay from 'razorpay';
import cors from 'cors'

//initial configurations are done
dotenv.config()
const port = process.env.PORT || 3000

connectMongoDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//uncaught exception errors handled
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Server is shutting down due to uhandled rejection");
    process.exit(1)
})

//cors settings
const corsOptions = {
    origin: 'https://localhost:5173'
}
app.use(cors(corsOptions))


//Razorpay instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,

});

//server is being started
const server = app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`)
})

//to handle the promise rejection error
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Server is shutting down due to uhandled rejection");
    server.close(() => {
        process.exit(1)
    })
})