import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRoute from './app/modules/users/users.route'
const app: Application = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users', userRoute)

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome user inserted!')
})

export default app
