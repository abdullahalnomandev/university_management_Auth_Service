import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagenation';
import {
  academicSemesterFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterCreatedEvent,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
    throw new ApiError(400, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterFields.map(field => ({
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
  const count = await AcademicSemester.countDocuments();

  if (page) {
    if (skype > count) throw Error('This page does not exist');
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
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

const getSingleSemester = async (
  semesterId: string
): Promise<IAcademicSemester | null> => {
  return await AcademicSemester.findById(semesterId);
};

const updateSemester = async (
  semesterId: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload?.title] !== payload.code
  ) {
    throw new ApiError(400, 'Invalid semester code');
  }
  return await AcademicSemester.findOneAndUpdate({ _id: semesterId }, payload, {
    new: true,
  });
};

const deleteSemester = async (
  semesterId: string
): Promise<IAcademicSemester | null> => {
  return await AcademicSemester.findByIdAndDelete(semesterId);
};

const createSemesterFromEvent = async (e: IAcademicSemesterCreatedEvent): Promise<void> => {
  await AcademicSemester.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  });
};

const updateOneIntoDBFromEvent = async (e:IAcademicSemesterCreatedEvent) : Promise<void> => {
  
   await AcademicSemester.findOneAndUpdate(
    {syncId:e.id},
    {
      $set:{
        title: e.title,
        year: e.year,
        code: e.code,
        startMonth: e.startMonth,
        endMonth: e.endMonth,
      }
    }
   )
}
export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
  createSemesterFromEvent,
  updateOneIntoDBFromEvent
};
