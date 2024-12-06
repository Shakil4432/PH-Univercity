import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true },
);

AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error('Department is already exist');
  }
  next();
});

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepartmentModel.findOne(query);
  if (!isDepartmentExist) {
    throw new Error('This department does not exist');
  }
  next();
});
export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
