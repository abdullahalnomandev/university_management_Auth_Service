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
exports.UserService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const academicSemester_model_1 = require('../academicSemester/academicSemester.model');
const admin_model_1 = require('../admin/admin.model');
const faculty_model_1 = require('../faculty/faculty.model');
const student_model_1 = require('../student/student.model');
const user_model_1 = require('./user.model');
const user_utils_1 = require('./user.utils');
const createStudent = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
      user.password = config_1.default.default_student_password;
    }
    // set role
    user.role = 'student';
    const academicSemester =
      yield academicSemester_model_1.AcademicSemester.findById(
        student.academicSemester
      );
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, user_utils_1.generatedStudentId)(academicSemester);
      user.id = id;
      student.id = id;
      const newStudent = yield student_model_1.Student.create([student], {
        session,
      });
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student.'
        );
      }
      // set student  _id into user.student
      user.student = newStudent[0]._id;
      const newUser = yield user_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user.'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
      return newUserAllData;
    }
  });
const createFaculty = (faculty, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
      user.password = config_1.default.default_faculty_password;
    }
    // set role
    user.role = 'faculty';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, user_utils_1.generateFacultyId)();
      user.id = id;
      faculty.id = id;
      const newStudent = yield faculty_model_1.Faculty.create([faculty], {
        session,
      });
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student.'
        );
      }
      // set student  _id into user.student
      user.faculty = newStudent[0]._id;
      const newUser = yield user_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user.'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'faculty',
        populate: [
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
      return newUserAllData;
    }
  });
const createAdmin = (admin, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
      user.password = config_1.default.default_admin_password;
    }
    // set role
    user.role = 'admin';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, user_utils_1.generateAdminId)();
      user.id = id;
      admin.id = id;
      const newStudent = yield admin_model_1.Admin.create([admin], { session });
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student.'
        );
      }
      // set student  _id into user.student
      user.admin = newStudent[0]._id;
      const newUser = yield user_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user.'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'faculty',
        populate: [
          {
            path: 'managementDepartment',
          },
        ],
      });
      return newUserAllData;
    }
  });
exports.UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
