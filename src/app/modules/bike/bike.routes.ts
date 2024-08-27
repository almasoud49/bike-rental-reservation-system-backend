import { Router } from 'express'
import { BikeControllers } from './bike.controller'
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { BikeValidations } from './bike.validation';

const router = Router()
router.post('/', 
  auth(['admin']),
  validateRequest(BikeValidations.bikeValidationSchema),
  BikeControllers.createBike);

router.get('/', BikeControllers.getAllBikes);
router.get('/:id', BikeControllers.getSingleBike);

router.put(
  '/:id',
  auth(['admin']),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete('/:id', 
  auth(['admin']),
  BikeControllers.deleteBike);

export const BikeRoutes = router
