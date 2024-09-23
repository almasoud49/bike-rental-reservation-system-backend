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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth_model_1 = require("./auth.model");
//Signup User
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.UserModel.create(payload);
    let user;
    if (result) {
        user = yield auth_model_1.UserModel.findOne({ email: payload.email }).select('-password -createdAt -updatedAt -__v');
    }
    return user;
});
//Login a User
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield auth_model_1.UserModel.findOne({ email: payload.email }).select('+password');
    // check  user existence with the email
    if (!isUserExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'No user found with this email!');
    }
    ;
    // check if password match
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatch) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Provided Password is Incorrect!');
    }
    ;
    // generate jwt access token
    const jwtPayload = {
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
    const user = yield auth_model_1.UserModel.findOne({ email: payload.email }).select('-createdAt -updatedAt -__v');
    return { accessToken, refreshToken, user };
});
//Access Token Generate
const generateAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwt_refresh_secret);
    // Check user existence with the email
    const isUserExist = yield auth_model_1.UserModel.findOne({ email, role });
    if (!isUserExist) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const JwtPayload = {
        email,
        role,
    };
    const accessToken = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    return { accessToken, isUserExist };
});
// get user profile with access token
const getProfileFromDb = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const user = yield auth_model_1.UserModel.findOne({ email, role }).select('-__v');
    return user;
});
// update user profile into db
const updateUserProfileIntoDb = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    // check if a user exist with the email
    const isUserExist = yield auth_model_1.UserModel.findOne({ email, role });
    if (!isUserExist) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const result = yield auth_model_1.UserModel.findOneAndUpdate({ email, role }, payload, {
        new: true,
    }).select('-createdAt -updatedAt -__v');
    return result;
});
// get all users
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.UserModel.find().select('-__v');
    return user;
});
// delete user
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.UserModel.findById(id);
    if (!user) {
        throw new AppError_1.AppError(404, 'Invalid User id');
    }
    const result = yield auth_model_1.UserModel.findByIdAndDelete(id);
    return result;
});
// delete user
const updateUserRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.UserModel.findById(id);
    if (!user) {
        throw new AppError_1.AppError(404, 'Invalid User id');
    }
    let role;
    if ((user === null || user === void 0 ? void 0 : user.role) === 'user') {
        role = 'admin';
    }
    else {
        role = 'user';
    }
    const result = yield auth_model_1.UserModel.findByIdAndUpdate(id, { role });
    return result;
});
exports.AuthServices = {
    createUserIntoDb,
    loginUser,
    generateAccessToken,
    getProfileFromDb,
    updateUserProfileIntoDb,
    getAllUsersFromDb,
    deleteUserFromDb,
    updateUserRole
};
