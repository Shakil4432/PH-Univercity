import { adminServices } from './admin.service';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admin retrieve successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.getSingleAdminFromDB(req.params.adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieve successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.updateAdminIntoDB(
    req.params.adminId,
    req.body.admin,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.deleteAdminFromDB(req.params.adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
