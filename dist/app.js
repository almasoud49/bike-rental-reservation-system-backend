"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorhandler_1 = require("./app/middleware/globalErrorhandler");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: 'https://bike-rent-reservation-system.netlify.app',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello Everyone to My Bike Rental Reservation System Backend Application!');
});
app.use(globalErrorhandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
