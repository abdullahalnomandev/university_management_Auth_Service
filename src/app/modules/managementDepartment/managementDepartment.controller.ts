import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await ManagementDepartmentService.createManagement(
      academicSemesterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      message: 'Management Department created successfully',
      data: result,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);

    const paginationOption = pick(req.query, paginationFields);
    const result = await ManagementDepartmentService.getAllManagements(
      filters,
      paginationOption
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      meta: result.meta,
      data: result.data,
    });
    // next();
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ManagementDepartmentService.getSingleManagement(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      data: result,
    });
    // next();
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await ManagementDepartmentService.updateManagement(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
};
