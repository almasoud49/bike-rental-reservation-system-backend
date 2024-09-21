"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const express_1 = require("express");
const team_controller_1 = require("./team.controller");
const router = (0, express_1.Router)();
router.post('/', team_controller_1.TeamControllers.createTeam);
router.get('/', team_controller_1.TeamControllers.getAllTeams);
exports.TeamRoutes = router;
