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
exports.BikeControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bike_service_1 = require("./bike.service");
const dataNotFound_1 = __importDefault(require("../../utils/dataNotFound"));
const createBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield bike_service_1.BikeServices.createBike(data);
    (0, sendResponse_1.default)(res, {
        message: 'Bike added successfully',
        status: http_status_1.default.CREATED,
        data: result,
    });
}));
const getAllBikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.getAllBikes(req.query);
    (0, dataNotFound_1.default)(result, res);
    (0, sendResponse_1.default)(res, {
        message: 'Bikes retrieved successfully',
        data: result,
    });
}));
const getSingleBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield bike_service_1.BikeServices.getSingleBike((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.bikeId);
    (0, dataNotFound_1.default)(result, res);
    (0, sendResponse_1.default)(res, {
        message: 'Bike Retrieved Successfully',
        data: result,
    });
}));
const updateBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const updateDoc = req.body;
    const result = yield bike_service_1.BikeServices.updateBike(updateDoc, (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendResponse_1.default)(res, {
        message: 'Bike updated successfully',
        data: result,
    });
}));
const deleteBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield bike_service_1.BikeServices.deleteBike((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendResponse_1.default)(res, {
        message: 'Bike deleted successfully',
        data: result,
    });
}));
exports.BikeControllers = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
