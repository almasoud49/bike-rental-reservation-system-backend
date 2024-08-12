import { Router } from 'express';
import { RentalControllers } from './rental.controller';


const router = Router();

router.post(
  '/',
  
  RentalControllers.createRental,
);

router.put('/:id/return', RentalControllers.returnBike);

router.get('/', RentalControllers.getAllRentals);

export const RentalRoutes = router 