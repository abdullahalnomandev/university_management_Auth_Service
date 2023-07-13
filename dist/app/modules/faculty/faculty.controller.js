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
exports.StudentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const faculty_constant_1 = require("./faculty.constant");
const faculty_service_1 = require("./faculty.service");
const getAllFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, faculty_constant_1.facultyFilterableFields);
    const paginationOption = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield faculty_service_1.FacultyService.getAllFaculty(filters, paginationOption);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        meta: result.meta,
        data: result.data,
    });
    // next();
}));
const getSingleFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_service_1.FacultyService.getSingleFaculty(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        data: result,
    });
    // next();
}));
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield faculty_service_1.FacultyService.updateFaculty(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        data: result,
    });
}));
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.FacultyService.deleteFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        data: result,
    });
}));
exports.StudentController = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
