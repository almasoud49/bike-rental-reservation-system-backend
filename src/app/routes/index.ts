import { Router } from 'express';

const router = Router();

const apiRoutes = [
  { 
    path: '/users', 
    route: AuthRoutes.userRouter },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;