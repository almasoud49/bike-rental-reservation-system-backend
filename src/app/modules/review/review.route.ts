import { Router } from 'express'
import { ReviewControllers } from './review.controller';
const router = Router()


router.post('/', ReviewControllers.createReview);
router.get('/', ReviewControllers.getAllReviews);




export const ReviewRoutes = router