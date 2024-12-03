import { z } from 'zod';

const AcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
    }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
      })
      .optional(),
  }),
});

export const AcademicFacultyValidation = {
  AcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
