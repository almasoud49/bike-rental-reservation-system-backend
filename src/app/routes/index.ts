import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.routes'
import { BikeRoutes } from '../modules/bike/bike.routes'
import { RentalRoutes } from '../modules/rental/rental.routes'
import { ReviewRoutes } from '../modules/review/review.route'
import { BenefitRoutes } from '../modules/benefit/benefit.route'
import { TeamRoutes } from '../modules/team/team.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes.authRouter,
  },
  {
    path: '/users',
    route: AuthRoutes.userRouter,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: RentalRoutes.router,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/benefits',
    route: BenefitRoutes,
  },
  {
    path: '/teams',
    route: TeamRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router


