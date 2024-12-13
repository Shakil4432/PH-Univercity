import express from 'express';
import { AdminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
router.get('/', AdminControllers.getAllAdmin);
router.get('/:adminId', AdminControllers.getSingleAdmin);
router.patch(
  '/:adminId',
  validateRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
