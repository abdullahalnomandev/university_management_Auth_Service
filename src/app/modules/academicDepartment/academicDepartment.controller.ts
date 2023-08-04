import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from '../academicFaculty/academicFaculty.constant';
import { AcademicDepartmentService } from './academicDepartment.service';

const createDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;

    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      message: 'Academic Departmentcreated successfully',
      data: result,
    });
  }
);
aaaaaaaaaaaaaa
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOption = pick(req.query, paginationFields);
  const result = await AcademicDepartmentService.getAllDepartment(
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

// const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
//   const result = await AcademicFacultyervice.getSingleSemester(req.params.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     status: 'success',
//     data: result,
//   });
//   // next();
// });

// const updateDepartment= catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await AcademicFacultyService.updateFaculty(id, data);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     status: 'success',
//     data: result,
//   });
// });

// const deleteDepartment= catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await AcademicFacultyService.deleteFaculty(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     status: 'success',
//     data: result,
//   });
// });
export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  // updateDepartment,
  // deleteDepartment,
  //   getSingleSemester,
};
