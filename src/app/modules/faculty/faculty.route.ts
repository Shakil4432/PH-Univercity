import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import authentication from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();
router.get(
  '/',
  authentication(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculty,
);
router.get('/:facultyId', FacultyControllers.getSingleFaculty);
router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:facultyId', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
