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
exports.TeamControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const dataNotFound_1 = __importDefault(require("../../utils/dataNotFound"));
const team_service_1 = require("./team.service");
const createTeam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield team_service_1.TeamServices.createTeam(data);
    (0, sendResponse_1.default)(res, {
        message: 'Team added successfully',
        status: http_status_1.default.CREATED,
        data: result,
    });
}));
const getAllTeams = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_service_1.TeamServices.getAllTeams();
    (0, dataNotFound_1.default)(result, res);
    (0, sendResponse_1.default)(res, {
        message: 'Teams retrieved successfully',
        data: result,
    });
}));
exports.TeamControllers = {
    createTeam,
    getAllTeams
};
