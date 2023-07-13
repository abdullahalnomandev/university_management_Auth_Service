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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHeloper_1 = require("../../../helpers/paginationHeloper");
const user_model_1 = require("../users/user.model");
const faculty_constant_1 = require("./faculty.constant");
const faculty_model_1 = require("./faculty.model");
const getAllFaculty = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: faculty_constant_1.facultySearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skype, sortBy, sortOrder } = paginationHeloper_1.paginationHelper.calculatePagination(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const count = yield faculty_model_1.Faculty.countDocuments(whereCondition);
    if (page) {
        if (skype > count)
            throw Error('This page does not exist');
    }
    const result = yield faculty_model_1.Faculty.find(whereCondition)
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortCondition)
        .skip(skype)
        .limit(limit);
    return {
        meta: {
            page,
            limit,
            total: count,
        },
        data: result,
    };
});
const getSingleFaculty = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield faculty_model_1.Faculty.findById(facultyId)
        .populate('academicDepartment')
        .populate('academicFaculty');
});
const updateFaculty = (facultyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faculty_model_1.Faculty.findOne({ id: facultyId });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    const { name } = payload, FacultyData = __rest(payload, ["name"]);
    const updatedFacultyData = Object.assign({}, FacultyData);
    // console.log(guardian, localGuardian);
    // dynamically updating name
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedFacultyData[nameKey] = name[key];
        });
    }
    return yield faculty_model_1.Faculty.findOneAndUpdate({ id: facultyId }, updatedFacultyData, {
        new: true,
    });
});
const deleteFaculty = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_model_1.Faculty.findByIdAndDelete(facultyId)
        .populate('academicDepartment')
        .populate('academicFaculty');
    (yield user_model_1.User.findOneAndDelete({ id: faculty === null || faculty === void 0 ? void 0 : faculty.id }));
    return faculty;
});
exports.FacultyService = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
