import { Router } from 'express'
import { BikeControllers } from './bike.controller'

const router = Router()
router.post('/', BikeControllers.createBike);

router.get('/', BikeControllers.getAllBikes);

router.put(
  '/:id',
  BikeControllers.updateBike,
);

router.delete('/:id', BikeControllers.deleteBike);

export const BikeRoutes = router
