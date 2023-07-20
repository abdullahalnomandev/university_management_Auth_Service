import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {

  console.log(req.headers.authorization);
  
  const filters = pick(req.query, facultyFilterableFields);

  const paginationOption = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculty(filters, paginationOption);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    meta: result.meta,
    data: result.data
  });
  // next();
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getSingleFaculty(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
  // next();
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await FacultyService.updateFaculty(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
});
export const StudentController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
