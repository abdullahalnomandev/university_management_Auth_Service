import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users', UserRoutes)

// app.get('/', (req, res,next) => {
// throw    new ApiError(400,"Ore baba Error")

// })

// Global Error Handler
app.use(globalErrorHandler)

export default app
