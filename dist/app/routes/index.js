'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const academicDepartment_route_1 = require('../modules/academicDepartment/academicDepartment.route');
const academicFaculty_router_1 = require('../modules/academicFaculty/academicFaculty.router');
const academicSemester_route_1 = require('../modules/academicSemester/academicSemester.route');
const admin_route_1 = require('../modules/admin/admin.route');
const faculty_route_1 = require('../modules/faculty/faculty.route');
const managementDepartment_route_1 = require('../modules/managementDepartment/managementDepartment.route');
const student_route_1 = require('../modules/student/student.route');
const user_route_1 = require('../modules/users/user.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemester_route_1.AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: academicFaculty_router_1.AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: academicDepartment_route_1.AcademicDepartmentRoute,
  },
  {
    path: '/students',
    route: student_route_1.StudentRoutes,
  },
  {
    path: '/faculty',
    route: faculty_route_1.FacultyRoutes,
  },
  {
    path: '/admin',
    route: admin_route_1.AdminRoutes,
  },
  {
    path: '/management-departments',
    route: managementDepartment_route_1.ManagementDepartmentRouters,
  },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
