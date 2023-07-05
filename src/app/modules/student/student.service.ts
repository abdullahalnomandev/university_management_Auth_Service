import { SortOrder } from 'mongoose';
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

// const updateStudent= async (semesterId: string,payload: Partial<IStudent>): Promise<IStudent | null> => {

//   return await Student.findOneAndUpdate({ _id: semesterId }, payload, {
//     new: true,
//   });
// };

const deleteStudent = async (semesterId: string): Promise<IStudent | null> => {
  return await Student.findByIdAndDelete(semesterId)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  //   updateStudent,
  deleteStudent,
};
