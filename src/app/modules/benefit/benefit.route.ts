import { Router } from 'express'
import { BenefitControllers } from './benefit.controller';
const router = Router()


router.post('/', BenefitControllers.createBenefit);
router.get('/', BenefitControllers.getAllBenefits);




export const BenefitRoutes = router