"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const bike_routes_1 = require("../modules/bike/bike.routes");
const rental_routes_1 = require("../modules/rental/rental.routes");
const review_route_1 = require("../modules/review/review.route");
const benefit_route_1 = require("../modules/benefit/benefit.route");
const team_route_1 = require("../modules/team/team.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/bikes',
        route: bike_routes_1.BikeRoutes,
    },
    {
        path: '/rentals',
        route: rental_routes_1.RentalRoutes
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes
    },
    {
        path: '/benefits',
        route: benefit_route_1.BenefitRoutes
    },
    {
        path: '/teams',
        route: team_route_1.TeamRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
