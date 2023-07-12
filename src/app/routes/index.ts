import express from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { ManagementDepartmentRouters } from '../modules/managementDepartment/managementDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRouters,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
