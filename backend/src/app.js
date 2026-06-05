import express from "express"
import cors from "cors"
import postRoutes from './routes/postRoutes.js'
import about from './routes/about.route.js'
import project from "./routes/project.route.js"
import authRoute from "./routes/auth.route.js"
import morgan from "morgan"
import helmet from "helmet"


const app = express()

app.use(cors())
app.use(express.json())
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)
app.use(morgan("dev"))


app.use('/api/posts', postRoutes)
app.use('/api/about', about)
app.use('/api/project', project)
app.use('/api/auth', authRoute)

export default app