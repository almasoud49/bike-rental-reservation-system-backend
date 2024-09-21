"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRoutes = void 0;
const express_1 = require("express");
const rental_controller_1 = require("./rental.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const rental_validation_1 = require("./rental.validation");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(rental_validation_1.RentalValidation.rentalValidationSchema), rental_controller_1.RentalControllers.createRental);
router.put('/:id/return', (0, auth_1.auth)(['admin']), rental_controller_1.RentalControllers.returnBike);
router.get('/', rental_controller_1.RentalControllers.getAllRentals);
exports.RentalRoutes = router;
