"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
const admin_constant_1 = require("./admin.constant");
const { ObjectId } = mongoose_1.Schema.Types;
exports.adminSchema = new mongoose_1.Schema({
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
        enum: admin_constant_1.gender,
    },
    bloodGroup: {
        type: String,
        enum: admin_constant_1.bloodGroup,
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
    managementDepartment: {
        type: ObjectId,
        ref: 'ManagementDepartment',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)('Admin', exports.adminSchema);
