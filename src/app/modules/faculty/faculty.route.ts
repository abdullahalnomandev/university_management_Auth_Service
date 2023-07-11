import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();

router.get('/:id', StudentController.getSingleFaculty);
router.delete('/:id', StudentController.deleteFaculty);
router.get('/', StudentController.getSingleFaculty);
// router.delete('/:id',StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  StudentController.updateFaculty
);

export const FacultyRoutes = router;
