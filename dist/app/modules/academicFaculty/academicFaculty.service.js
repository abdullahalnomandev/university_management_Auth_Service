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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyService = void 0;
const paginationHeloper_1 = require('../../../helpers/paginationHeloper');
const academicFaculty_constant_1 = require('./academicFaculty.constant');
const academicFaculty_model_1 = require('./academicFaculty.model');
const createFaculty = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield academicFaculty_model_1.AcademicFaculty.create(payload);
  });
const getAllFaculty = (filters, paginationOption) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    // console.log('searchTerm: ' + searchTerm);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: academicFaculty_constant_1.academicFacultyFields.map(field => ({
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
    const { page, limit, skype, sortBy, sortOrder } =
      paginationHeloper_1.paginationHelper.calculatePagination(
        paginationOption
      );
    const count =
      yield academicFaculty_model_1.AcademicFaculty.countDocuments();
    if (page) {
      if (skype > count) throw Error('This page does not exist');
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
    const whereCondition =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicFaculty_model_1.AcademicFaculty.find(
      whereCondition
    )
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
// const getSingleSemester = async (
//   semesterId: string
// ): Promise<IAcademicSemester | null> => {
//   return await AcademicSemester.findById(semesterId);
// };
const updateFaculty = (facultyId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield academicFaculty_model_1.AcademicFaculty.findOneAndUpdate(
      { _id: facultyId },
      payload,
      {
        new: true,
      }
    );
  });
const deleteFaculty = semesterId =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield academicFaculty_model_1.AcademicFaculty.findByIdAndDelete(
      semesterId
    );
  });
exports.AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
  //   getSingleSemester,
};
