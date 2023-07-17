'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StudentController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const student_constant_1 = require('./student.constant');
const student_service_1 = require('./student.service');
const getAllStudents = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      student_constant_1.studentFilterableFields
    );
    const paginationOption = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield student_service_1.StudentService.getAllStudents(
      filters,
      paginationOption
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      status: 'success',
      meta: result.meta,
      data: result.data,
    });
    // next();
  })
);
const getSingleStudent = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentService.getSingleStudent(
      req.params.id
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      status: 'success',
      data: result,
    });
    // next();
  })
);
const updateStudent = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield student_service_1.StudentService.updateStudent(
      id,
      data
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      status: 'success',
      data: result,
    });
  })
);
const deleteStudent = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.StudentService.deleteStudent(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      status: 'success',
      data: result,
    });
  })
);
exports.StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
