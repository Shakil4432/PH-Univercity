import { Router } from 'express';
import { UserRoutes } from '../user/user.route';
import { StudentRoutes } from '../student/student.route';
import { AcademicSemesterRoutes } from '../academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../Admin/admin.route';
import { FacultyRoutes } from '../faculty/faculty.route';
import { courseRoutes } from '../course/course.route';
import { AuthRoutes } from '../auth/auth.route';
import { semesterRegistrationRoutes } from '../semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../offeredCourse/offeredCourse.route';

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

  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },

  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
