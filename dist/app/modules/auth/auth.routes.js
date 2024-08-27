"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_validations_1 = require("./auth.validations");
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validations_1 = require("../user/user.validations");
const router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(user_validations_1.UserValidations.createUserValidationSchema), auth_controller_1.AuthControllers.createUser);
router.post('/login', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.loginUserValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/generate-access-token', auth_controller_1.AuthControllers.generateAccessToken);
exports.AuthRoutes = router;
