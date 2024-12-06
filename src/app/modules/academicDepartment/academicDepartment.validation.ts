import { z } from 'zod';

const AcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
    }),
    academicFaculty: z.string(),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
      })
      .optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  AcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
