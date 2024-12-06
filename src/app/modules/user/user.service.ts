import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import appError from '../../errors/appError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester!);

    // create a user(transaction-1)
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, 'failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new appError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }

  //set  generated id
};

export const UserServices = {
  createStudentIntoDB,
};
