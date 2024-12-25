import catchAsync from '../modules/utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import appError from '../errors/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import httpStatus from 'http-status';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
const authentication = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    const decode = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, role, iat } = decode;

    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new appError(httpStatus.BAD_REQUEST, 'User not found');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new appError(httpStatus.UNAUTHORIZED, 'You are not authorized ');
    }

    if (await User.isUserDelete(user)) {
      throw new appError(httpStatus.BAD_REQUEST, 'User is Deleted');
    }

    if ((await User.isUserBlocked(user)) === 'blocked') {
      throw new appError(httpStatus.BAD_REQUEST, 'This user is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new appError(
        httpStatus.FORBIDDEN,
        'you are not authorized to perform this action',
      );
    }

    req.user = { userId: userId, role: role };
    next();
  });
};

export default authentication;
