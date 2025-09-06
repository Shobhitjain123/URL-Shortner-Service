import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnect from '../utils/dbConnect.js'
import urlRoutes from '../routes/urls.routes.js'
import redirectRoutes from '../routes/index.routes.js'
dotenv.config()
const PORT = process.env.PORT || 8000
dbConnect()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

app.get("/", (_, res) => {
    console.log("Hello App");
    res.send("Hello app")
})

app.use("/api/urls", urlRoutes)
app.use("/", redirectRoutes)

app.listen(PORT, () => {
    console.log(`Listening Server on port ${PORT}`);
})