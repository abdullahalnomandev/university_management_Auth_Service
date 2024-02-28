import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagenation';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { academicDepartmentFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentEvent,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  return (await AcademicDepartment.create(payload)).populate('academicFaculty');
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  // console.log('searchTerm: ' + searchTerm);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentFields.map(field => ({
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
  const count = await AcademicDepartment.countDocuments();

  if (page) {
    if (skype > count) throw Error('This page does not exist');
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereCondition)
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

// const getSingleSemester = async (
//   semesterId: string
// ): Promise<IAcademicSemester | null> => {
//   return await AcademicSemester.findById(semesterId);
// };

// const updateDepartment = async (
//   DepartmentId: string,
//   payload: Partial<IAcademicDepartment>
// ): Promise<IAcademicDepartment | null> => {
//   return await AcademicDepartment.findOneAndUpdate({ _id: DepartmentId }, payload, {
//     new: true,
//   });
// };

// const deleteDepartment = async (
//   semesterId: string
// ): Promise<IAcademicDepartment | null> => {
//   return await AcademicDepartment.findByIdAndDelete(semesterId);
// };

const createDepartmentFromEvent = async ( e: IAcademicDepartmentEvent): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({ syncId: e.academicFacultyId});
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  };

  await AcademicDepartment.create(payload);
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  // updateDepartment,
  // deleteDepartment,
  // getSingleSemester,
  createDepartmentFromEvent,
};
