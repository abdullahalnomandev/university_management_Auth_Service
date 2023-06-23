import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
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
