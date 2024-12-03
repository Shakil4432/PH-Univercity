import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicFacultyValidation.AcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/:semesterId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

export const AcademicFacultyRoutes = router;
