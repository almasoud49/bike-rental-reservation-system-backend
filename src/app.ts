import express, { Request, Response } from 'express'


const app = express();


app.use(express.json());

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