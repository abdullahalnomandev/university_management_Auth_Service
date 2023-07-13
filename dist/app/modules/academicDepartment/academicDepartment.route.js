"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post('/create-academic-department', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.createDepartment);
// router.get('/:id', AcademicSemesterController.getSingleSemester);
// router.patch(
//   '/:id',
//   validateRequest(AcademicFacultyValidation.updateAcademicFacultyUserZodSchema),
//   AcademicFacultyController.updateFaculty
// );
// router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllDepartment);
exports.AcademicDepartmentRoute = router;
