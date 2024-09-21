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
exports.RentalControllers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const config_1 = __importDefault(require("../../config"));
const rental_service_1 = require("./rental.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const dataNotFound_1 = __importDefault(require("../../utils/dataNotFound"));
const createRental = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeader = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const rentalData = req.body;
    const result = yield rental_service_1.RentalServices.createRental(rentalData, decoded);
    (0, sendResponse_1.default)(res, {
        message: 'Rental created successfully',
        status: 201,
        data: result,
    });
}));
const returnBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield rental_service_1.RentalServices.returnBike(id);
    (0, sendResponse_1.default)(res, {
        message: 'Bike returned successfully',
        data: result,
    });
}));
const getAllRentals = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeader = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const result = yield rental_service_1.RentalServices.getAllRentals(decoded);
    (0, dataNotFound_1.default)(result, res);
    (0, sendResponse_1.default)(res, {
        message: 'Rentals retrieved successfully',
        data: result,
    });
}));
exports.RentalControllers = {
    createRental,
    returnBike,
    getAllRentals
};
