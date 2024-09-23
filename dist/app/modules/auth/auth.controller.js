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
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const dataNotFound_1 = __importDefault(require("../../utils/dataNotFound"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield auth_service_1.AuthServices.createUserIntoDb(userData);
    (0, sendResponse_1.default)(res, {
        message: 'User registered successfully',
        status: 201,
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield auth_service_1.AuthServices.loginUser(userData);
    const { accessToken, refreshToken, user } = result;
    res.cookie('refreshToken', refreshToken);
    (0, sendResponse_1.default)(res, {
        message: 'User logged in successfully',
        data: user,
    }, accessToken);
}));
const generateAccessToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.generateAccessToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        message: 'Access token generated successfully!',
        data: result.isUserExist,
    }, result.accessToken);
}));
const getProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const token = authHeader.split(' ')[1];
    const result = yield auth_service_1.AuthServices.getProfileFromDb(token);
    (0, sendResponse_1.default)(res, {
        message: 'User profile retrieved successfully!',
        data: result,
    });
}));
const updateUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateDoc = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const token = authHeader.split(' ')[1];
    const result = yield auth_service_1.AuthServices.updateUserProfileIntoDb(updateDoc, token);
    (0, dataNotFound_1.default)(result, res);
    (0, sendResponse_1.default)(res, {
        message: 'Profile updated successfully',
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.getAllUsersFromDb();
    (0, sendResponse_1.default)(res, {
        message: 'Users retrieved successfully!',
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.deleteUserFromDb(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: 'Users deleted successfully!',
        data: result,
    });
}));
const updateUserRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.updateUserRole(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: 'Users role updated successfully!',
        data: result,
    });
}));
exports.AuthControllers = {
    createUser,
    loginUser,
    generateAccessToken,
    getProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    updateUserRole,
};
