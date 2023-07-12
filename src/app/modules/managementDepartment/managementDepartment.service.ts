import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHeloper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagenation';
import { managementDepartmentFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  managementDepartmentFilter,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createManagement = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  return await ManagementDepartment.create(payload);
};

const getAllManagements = async (
  filters: managementDepartmentFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentFields.map(field => ({
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
  const count = await ManagementDepartment.countDocuments();

  if (page) {
    if (skype > count) throw Error('This page does not exist');
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereCondition)
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

const getSingleManagement = async (
  semesterId: string
): Promise<IManagementDepartment | null> => {
  return await ManagementDepartment.findById(semesterId);
};

const updateManagement = async (
  managementDepId: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  return await ManagementDepartment.findOneAndUpdate(
    { _id: managementDepId },
    payload,
    {
      new: true,
    }
  );
};

export const ManagementDepartmentService = {
  createManagement,
  getAllManagements,
  getSingleManagement,
  updateManagement,
};
