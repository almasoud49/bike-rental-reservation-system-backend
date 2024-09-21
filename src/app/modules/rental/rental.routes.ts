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

router.put('/:id/return', auth(['admin']), RentalControllers.returnBike);
router.get('/', RentalControllers.getAllRentals);
router.post(
  '/advance-payment-success/:transactionId',
  RentalControllers.advancePaymentSuccess,
);
router.post(
  '/advance-payment-fail/:transactionId',
  RentalControllers.advancePaymentFail,
);
router.get('/:id', RentalControllers.getSingleRental);
router.post('/:id', RentalControllers.makePayment);

router.post(
  '/payment-success/:rentalId/:transactionId',
  RentalControllers.paymentSuccess,
);
router.post('/payment-fail/:transactionId', RentalControllers.paymentFail);


export const RentalRoutes = router
