import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
//initial configurations are done
dotenv.config()
const port = process.env.PORT || 3000

connectMongoDatabase()

//uncaught exception errors handled
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Server is shutting down due to uhandled rejection");
    process.exit(1)
})

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