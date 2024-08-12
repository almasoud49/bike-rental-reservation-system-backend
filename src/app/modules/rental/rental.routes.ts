import { Router } from 'express'
import { RentalControllers } from './rental.controller'
import validateRequest from '../../middleware/validateRequest'
import { RentalValidation } from './rental.validation'
import { auth } from '../../middleware/auth'

const router = Router()

router.post(
  '/',
  validateRequest(RentalValidation.rentalValidationSchema),
  RentalControllers.createRental,
)

router.put('/:id/return', auth(['admin']), RentalControllers.returnBike)

router.get('/', RentalControllers.getAllRentals)

export const RentalRoutes = router
