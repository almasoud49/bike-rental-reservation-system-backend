/* eslint-disable @typescript-eslint/no-explicit-any */
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

const allowedOrigins = ['https://bike-rent-reservation-system.netlify.app'];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin) || origin === 'null') {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions))

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send(
    'Hello Everyone to My Bike Rental Reservation System Backend Application!',
  )
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
