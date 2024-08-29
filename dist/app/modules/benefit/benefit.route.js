"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitRoutes = void 0;
const express_1 = require("express");
const benefit_controller_1 = require("./benefit.controller");
const router = (0, express_1.Router)();
router.post('/', benefit_controller_1.BenefitControllers.createBenefit);
router.get('/', benefit_controller_1.BenefitControllers.getAllBenefits);
exports.BenefitRoutes = router;
