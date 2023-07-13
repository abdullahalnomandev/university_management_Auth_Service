"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post('/create-academic-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.createAcademicFacultyUserZodSchema), academicFaculty_controller_1.AcademicFacultyController.createFaculty);
// router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.updateAcademicFacultyUserZodSchema), academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
router.delete('/:id', academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
router.get('/', academicFaculty_controller_1.AcademicFacultyController.getAllFaculty);
exports.AcademicFacultyRoute = router;
