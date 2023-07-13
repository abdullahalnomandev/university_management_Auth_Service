"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', academicFacultySchema);
