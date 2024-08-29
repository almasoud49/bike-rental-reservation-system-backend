import { Router } from 'express'
import { TeamControllers } from './team.controller';
const router = Router()


router.post('/', TeamControllers.createTeam);
router.get('/', TeamControllers.getAllTeams);




export const TeamRoutes = router