import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './app/routes'
import { globalErrorHandler } from './app/middleware/globalErrorhandler'
import notFound from './app/middleware/notFound'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'https://bike-rent-reservation-system.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send(
    'Hello Everyone to My Bike Rental Reservation System Backend Application!',
  )
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;
