import express from "express"
import cors from "cors"
import postRoutes from './routes/postRoutes.js'
import about from './routes/about.route.js'
import project from "./routes/project.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/posts', postRoutes)
app.use('/api/about', about)
app.use('/api/project', project)

export default app