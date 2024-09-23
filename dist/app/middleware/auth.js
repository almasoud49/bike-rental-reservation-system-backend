"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = require("../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth_model_1 = require("../modules/auth/auth.model");
const auth = (allowedUsers) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
            }
            const token = authHeader.split(' ')[1];
            // verify token
            const { email, role } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            // check if user exists with the token credentials
            const isUserExist = yield auth_model_1.UserModel.findOne({ email, role });
            if (!isUserExist) {
                throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
            }
            // verify user role
            if (allowedUsers && !allowedUsers.includes(role)) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: 'You have no access to this route',
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.auth = auth;
