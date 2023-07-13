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
exports.AcademicSemesterService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHeloper_1 = require("../../../helpers/paginationHeloper");
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const createSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterTitleCodeMapper[payload === null || payload === void 0 ? void 0 : payload.title] !== payload.code) {
        throw new ApiError_1.default(400, 'Invalid semester code');
    }
    return yield academicSemester_model_1.AcademicSemester.create(payload);
});
const getAllSemesters = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicSemester_constant_1.academicSemesterFields.map(field => ({
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
    const count = yield academicSemester_model_1.AcademicSemester.countDocuments();
    if (page) {
        if (skype > count)
            throw Error('This page does not exist');
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicSemester_model_1.AcademicSemester.find(whereCondition)
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
const getSingleSemester = (semesterId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield academicSemester_model_1.AcademicSemester.findById(semesterId);
});
const updateSemester = (semesterId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.title &&
        payload.code &&
        academicSemester_constant_1.academicSemesterTitleCodeMapper[payload === null || payload === void 0 ? void 0 : payload.title] !== payload.code) {
        throw new ApiError_1.default(400, 'Invalid semester code');
    }
    return yield academicSemester_model_1.AcademicSemester.findOneAndUpdate({ _id: semesterId }, payload, {
        new: true,
    });
});
const deleteSemester = (semesterId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield academicSemester_model_1.AcademicSemester.findByIdAndDelete(semesterId);
});
exports.AcademicSemesterService = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};
