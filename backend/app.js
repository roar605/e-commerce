import express from "express";
import product from "./routes/productRoute.js"
import errorHandleMiddleware from "./middleware/error.js"
import user from "./routes/userRoute.js"
import cookieParser from "cookie-parser";

const app = express();

//middlewares used
app.use(express.json());
app.use(cookieParser());

//all the routes
app.use("/api/v1", product)
app.use("/api/v1/", user)

app.use(errorHandleMiddleware)

export default app;