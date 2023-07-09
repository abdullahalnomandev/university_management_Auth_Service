/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHeloper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagenation';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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
    paginationHelper.calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const count = await Student.countDocuments(whereCondition);

  if (page) {
    if (skype > count) throw Error('This page does not exist');
  }

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
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
};

const getSingleStudent = async (
  semesterId: string
): Promise<IStudent | null> => {
  return await Student.findById(semesterId)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const updateStudent = async (
  studentId: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ studentId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // console.log(guardian, localGuardian);

  // dynamically updating name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  // dynamically updating guardian
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const nameKey = `guardian.${key}`;
      (updatedStudentData as any)[nameKey] = guardian[key as keyof typeof name];
    });
  }

  // dynamically updating guardian
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const nameKey = `guardian.${key}`;
      (updatedStudentData as any)[nameKey] =
        localGuardian[key as keyof typeof name];
    });
  }
  return await Student.findOneAndUpdate({ _id: studentId }, payload, {
    new: true,
  });
};

const deleteStudent = async (semesterId: string): Promise<IStudent | null> => {
  return await Student.findByIdAndDelete(semesterId)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
