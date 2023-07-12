import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type managementDepartmentFilter = {
  searchTerm?: string;
};
