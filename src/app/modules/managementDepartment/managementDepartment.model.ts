import { Schema, model } from 'mongoose';
import {
  IManagementDepartment,
  ManagementDepartmentModel,
} from './managementDepartment.interface';

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('ManagementDepartment', managementDepartmentSchema);
