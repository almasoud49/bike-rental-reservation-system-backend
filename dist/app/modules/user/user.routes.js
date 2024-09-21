"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validations_1 = require("./user.validations");
const router = (0, express_1.Router)();
router.get('/me', user_controller_1.UserControllers.getProfile);
router.put('/me', (0, validateRequest_1.default)(user_validations_1.UserValidations.updateUserProfileValidationSchema), user_controller_1.UserControllers.updateUserProfile);
exports.UserRoutes = router;
