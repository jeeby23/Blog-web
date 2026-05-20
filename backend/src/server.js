import connectDB from "../lib/connectDB.js"
import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()

const PORT = 3000

app.listen(PORT, () => {
    connectDB()
    console.log(`server running on http://localhost:${PORT}`)
})