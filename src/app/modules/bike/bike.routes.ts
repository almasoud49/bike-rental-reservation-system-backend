import { Router } from 'express'
import { BikeControllers } from './bike.controller'

const router = Router()
router.post('/', BikeControllers.createBike);

router.get('/', BikeControllers.getAllBikes);



export const BikeRoutes = router
