import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.use('/api', router);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello Everyone to My Bike Rental Reservation System Backend Application!')
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route Not Found.",
  });
});

export default app;