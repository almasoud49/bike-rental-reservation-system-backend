import { Router } from 'express'

import { AuthRoutes } from '../modules/auth/auth.routes'
import { UserRoutes } from '../modules/user/user.routes'
import { BikeRoutes } from '../modules/bike/bike.routes'
import { RentalRoutes } from '../modules/rental/rental.routes'
import { ReviewRoutes } from '../modules/review/review.route'
import { BenefitRoutes } from '../modules/benefit/benefit.route'
import { TeamRoutes } from '../modules/team/team.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  { 
    path: '/rentals', 
    route:RentalRoutes 
  },
  { 
    path: '/reviews', 
    route:ReviewRoutes 
  },
  { 
    path: '/benefits', 
    route:BenefitRoutes 
  },
  { 
    path: '/teams', 
    route:TeamRoutes 
  },

]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
