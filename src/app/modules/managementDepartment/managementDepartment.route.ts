import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
const router = express.Router();

router.post(
  '/create-management',
  ManagementDepartmentController.createManagementDepartment
);
router.get('/', ManagementDepartmentController.getAllManagementDepartments);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);
router.patch('/:id', ManagementDepartmentController.updateManagementDepartment);

export const ManagementDepartmentRouters = router;
