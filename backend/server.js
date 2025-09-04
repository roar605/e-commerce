import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
//initial configurations are done
dotenv.config()
const port = process.env.PORT || 3000

connectMongoDatabase()
//server is being started
app.listen(port,()=>[
    console.log(`Server is running at PORT ${port}`)
])