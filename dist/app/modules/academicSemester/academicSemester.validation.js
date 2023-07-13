"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'title is required',
        }),
        year: zod_1.z.string({
            required_error: 'year is required',
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCode]),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonth], {
            required_error: 'Start month is required',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonth], {
            required_error: 'End month is required',
        }),
    }),
});
const updateAcademicSemesterUserZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'year is required',
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterCode])
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterMonth], {
            required_error: 'Start month is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterMonth], {
            required_error: 'End month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and code should be provider or neither',
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterUserZodSchema,
    updateAcademicSemesterUserZodSchema,
};
