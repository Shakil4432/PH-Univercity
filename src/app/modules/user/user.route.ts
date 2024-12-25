import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from '../Admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import authentication from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  authentication(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-admin',
  validateRequest(adminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/create-faculty',
  authentication(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.get(
  '/me',
  authentication(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  UserControllers.createFaculty,
);

router.post(
  '/change-status/:id',
  authentication(USER_ROLE.admin),
  validateRequest(UserValidation.userStatusValidationSchema),
);

router.get('/', UserControllers.getAllUsers);

export const UserRoutes = router;
