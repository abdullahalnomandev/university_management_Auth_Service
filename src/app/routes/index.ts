import express from 'express';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
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
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
