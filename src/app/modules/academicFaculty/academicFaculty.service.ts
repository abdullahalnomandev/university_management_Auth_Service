import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagenation';
import { academicFacultyFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  return await AcademicFaculty.create(payload);
};

const getAllFaculty = async (
  filters: IAcademicFacultyFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  // console.log('searchTerm: ' + searchTerm);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultyFields.map(field => ({
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
  const count = await AcademicFaculty.countDocuments();

  if (page) {
    if (skype > count) throw Error('This page does not exist');
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skype)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result
  };
};

// const getSingleSemester = async (
//   semesterId: string
// ): Promise<IAcademicSemester | null> => {
//   return await AcademicSemester.findById(semesterId);
// };

const updateFaculty = async (
  facultyId: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  return await AcademicFaculty.findOneAndUpdate({ _id: facultyId }, payload, {
    new: true,
  });
};

const deleteFaculty = async (
  semesterId: string
): Promise<IAcademicFaculty | null> => {
  return await AcademicFaculty.findByIdAndDelete(semesterId);
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
  //   getSingleSemester,
};
