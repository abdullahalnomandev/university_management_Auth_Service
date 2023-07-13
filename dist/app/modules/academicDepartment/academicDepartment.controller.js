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
exports.AcademicDepartmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const academicFaculty_constant_1 = require("../academicFaculty/academicFaculty.constant");
const academicDepartment_service_1 = require("./academicDepartment.service");
const createDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentData = __rest(req.body, []);
    const result = yield academicDepartment_service_1.AcademicDepartmentService.createDepartment(academicDepartmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        message: 'Academic Departmentcreated successfully',
        data: result,
    });
}));
const getAllDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, academicFaculty_constant_1.academicFacultyFilterableFields);
    const paginationOption = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield academicDepartment_service_1.AcademicDepartmentService.getAllDepartment(filters, paginationOption);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        meta: result.meta,
        data: result.data,
    });
    // next();
}));
// const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
//   const result = await AcademicFacultyervice.getSingleSemester(req.params.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     status: 'success',
//     data: result,
//   });
//   // next();
// });
// const updateDepartment= catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await AcademicFacultyService.updateFaculty(id, data);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     status: 'success',
//     data: result,
//   });
// });
// const deleteDepartment= catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await AcademicFacultyService.deleteFaculty(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     status: 'success',
//     data: result,
//   });
// });
exports.AcademicDepartmentController = {
    createDepartment,
    getAllDepartment,
    // updateDepartment,
    // deleteDepartment,
    //   getSingleSemester,
};
