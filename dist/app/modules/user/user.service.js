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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("./user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// get user profile with access token
const getProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const user = yield user_model_1.UserModel.findOne({ email, role });
    return user;
});
// update user profile
const updateUserProfile = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const rawToken = token.split(' ')[1];
    const { email, role } = jsonwebtoken_1.default.verify(rawToken, config_1.default.jwt_access_secret);
    // check  user existence with the email
    const isUserExist = yield user_model_1.UserModel.findOne({ email, role });
    if (!isUserExist) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const result = yield user_model_1.UserModel.findOneAndUpdate({ email, role }, payload, {
        new: true,
    }).select('-createdAt -updatedAt -__v');
    return result;
});
exports.UserServices = {
    getProfile,
    updateUserProfile,
};
