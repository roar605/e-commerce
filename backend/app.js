import express from "express";
import product from "./routes/productRoute.js"
import errorHandleMiddleware from "./middleware/error.js"
import user from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import payment from "./routes/paymentRoutes.js"//as we have done default export of the router 
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from 'dotenv'

const app = express();

//middlewares used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//all the routes
app.use("/api/v1", product)
app.use("/api/v1/", user)
app.use("/api/v1/", order)
app.use("/api/v1/", payment)

app.use(errorHandleMiddleware)

dotenv.config()

export default app;