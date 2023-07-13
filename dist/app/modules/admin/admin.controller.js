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
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const admin_constant_1 = require("./admin.constant");
const admin_service_1 = require("./admin.service");
const getAllAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, admin_constant_1.adminFilterableFields);
    const paginationOption = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield admin_service_1.AdminService.getAllAdmin(filters, paginationOption);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        meta: result.meta,
        data: result.data,
    });
    // next();
}));
const getSingleAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getSingleAdmin(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        data: result,
    });
    // next();
}));
const updateAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield admin_service_1.AdminService.updateAdmin(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        data: result,
    });
}));
const deleteAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admin_service_1.AdminService.deleteAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        data: result,
    });
}));
exports.AdminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
