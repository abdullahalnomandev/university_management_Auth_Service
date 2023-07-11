/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHeloper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagenation';
import { IStudent } from '../student/student.interface';
import { User } from '../users/user.model';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const count = await Faculty.countDocuments(whereCondition);

  if (page) {
    if (skype > count) throw Error('This page does not exist');
  }

  const result = await Faculty.find(whereCondition)
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

const getSingleFaculty = async (
  facultyId: string
): Promise<IFaculty | null> => {
  return await Faculty.findById(facultyId)
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const updateFaculty = async (
  facultyId: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id: facultyId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const { name, ...FacultyData } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

  // console.log(guardian, localGuardian);

  // dynamically updating name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  return await Faculty.findOneAndUpdate({ id: facultyId }, updatedFacultyData, {
    new: true,
  });
};

const deleteFaculty = async (facultyId: string): Promise<IFaculty | null> => {
  const faculty = await Faculty.findByIdAndDelete(facultyId)
    .populate('academicDepartment')
    .populate('academicFaculty');

  (await User.findOneAndDelete({ id: faculty?.id })) as IStudent;

  return faculty;
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
