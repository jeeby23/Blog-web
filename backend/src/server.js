import connectDB from '../lib/connectDB.js'
// import app from "./app.js"

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import postRoutes from './routes/postRoutes.js'
import about from './routes/about.route.js'
import project from './routes/project.route.js'
import auth from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../config/swagger.js'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(cookieParser())
app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(helmet())
// app.use(morgan("common"))
// app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://blog-websittee.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
)
app.options(
  /.*/,
  cors({
    origin: ['http://localhost:5173', 'https://blog-websittee.netlify.app'],

    credentials: true,
  }),
)

app.use('/api/posts', postRoutes)
app.use('/api/about', about)
app.use('/api/project', project)
app.use('/api/auth', auth)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.listen(PORT, () => {
  connectDB()
  console.log(`server running on http://localhost:${PORT}`)
})
