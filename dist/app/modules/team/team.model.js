"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.TeamModel = (0, mongoose_1.model)('Team', teamSchema);
