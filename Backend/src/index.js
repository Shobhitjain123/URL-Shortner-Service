import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnect from '../utils/dbConnect.js'
import urlRoutes from '../routes/urls/urls.routes.js'
import redirectRoutes from '../routes/urls/index.routes.js'
import authRoutes from '../routes/auth/auth.routes.js'
import linksRouter from '../routes/links/links.routes.js'

dotenv.config()
const PORT = process.env.PORT || 8000
dbConnect()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.get("/", (_, res) => {
    res.send("Hello app")
})

app.use("/api/urls", urlRoutes)
app.use("/", redirectRoutes)

app.use("/api/auth", authRoutes)

app.use("/api/links", linksRouter)

app.listen(PORT, () => {
    console.log(`Listening Server on port ${PORT}`);
})