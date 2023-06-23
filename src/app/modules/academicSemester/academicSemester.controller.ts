import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      message: 'Academic Semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const paginationOption = pick(req.query, paginationFields);
  const result = await AcademicSemesterService.getAllSemesters(
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
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getSingleSemester(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
  // next();
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await AcademicSemesterService.updateSemester(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    data: result,
  });
});
export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
