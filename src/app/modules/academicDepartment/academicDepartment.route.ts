import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();
router.post(
  '/create-academic-department',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);
// router.get('/:id', AcademicSemesterController.getSingleSemester);
// router.patch(
//   '/:id',
//   validateRequest(AcademicFacultyValidation.updateAcademicFacultyUserZodSchema),
//   AcademicFacultyController.updateFaculty
// );

// router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/', AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoute = router;
