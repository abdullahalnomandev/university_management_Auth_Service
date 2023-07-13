"use strict";
// //   designation: string;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = exports.facultySchema = void 0;
const mongoose_1 = require("mongoose");
const faculty_constant_1 = require("./faculty.constant");
const { ObjectId } = mongoose_1.Schema.Types;
exports.facultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: faculty_constant_1.gender,
    },
    bloodGroup: {
        type: String,
        enum: faculty_constant_1.bloodGroup,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        // required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    academicDepartment: {
        type: ObjectId,
        ref: 'AcademicDepartment',
    },
    academicFaculty: {
        type: ObjectId,
        ref: 'AcademicFaculty',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Faculty = (0, mongoose_1.model)('Faculty', exports.facultySchema);
