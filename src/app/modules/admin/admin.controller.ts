import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { AdminService } from './admin.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);

  const paginationOption = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmin(filters, paginationOption);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getSingleAdmin(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
  // next();
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await AdminService.updateAdmin(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
});
export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
