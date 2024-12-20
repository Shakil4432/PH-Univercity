import { Router } from 'express';
import { UserRoutes } from '../user/user.route';
import { StudentRoutes } from '../student/student.route';
import { AcademicSemesterRoutes } from '../academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../Admin/admin.route';
import { FacultyRoutes } from '../faculty/faculty.route';
import { courseRoutes } from '../course/course.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
