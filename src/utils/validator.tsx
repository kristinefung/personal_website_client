import { z } from 'zod';

// const currentYear = new Date().getFullYear();
// const minYear = currentYear - 100;

// const formatDate = (year, month) => {
//     const yearStr = year.toString();
//     const monthStr = month.toString().padStart(2, '0');
//     return Number(yearStr + monthStr);
// }

const EnquirySchema = z.object({
    name: z.string({ required_error: "name is required" }).min(1, "name is required"),
    email: z.string({ required_error: "email is required" }).email("Invalid email address"),
    companyName: z.string().optional().nullable(),
    phoneNo: z.string().optional().nullable(),
    comment: z.string({ required_error: "comment is required" }).min(1, "comment is required"),
});

const WorkSchema = z.object({
    title: z.string({ required_error: "title is required" }).min(1, "title is required"),
    companyName: z.string({ required_error: "companyName is required" }).min(1, "companyName is required"),
    description: z.string().optional().nullable(),
    startMonth: z.number({ required_error: "startMonth is required", message: "startMonth must be in range of 1 - 12" }).min(1).max(12),
    startYear: z.number({ required_error: "startYear is required", message: "startYear must be in range of 1900 - now" }).min(1900).max(new Date().getFullYear()),
    endMonth: z
        .number({ message: "endMonth must be in range of 1 - 12" })
        .min(1)
        .max(12)
        .optional()
        .nullable(),
    endYear: z
        .number({ message: "endYear must be in range of 1900 - now" })
        .min(1900)
        .max(new Date().getFullYear())
        .optional()
        .nullable(),
    isCurrent: z.number({ required_error: "isCurrent is required", message: "isCurrent must be 0 or 1" }).min(0).max(1),
});

const EducationSchema = z.object({
    schoolName: z.string({ required_error: "schoolName is required" }).min(1, "schoolName is required"),
    degree: z.string({ required_error: "degree is required" }).min(1, "degree is required"),
    subject: z.string({ required_error: "subject is required" }).min(1, "subject is required"),
    description: z.string().optional().nullable(),
    startMonth: z.number({ required_error: "startMonth is required", message: "startMonth must be in range of 1 - 12" }).min(1).max(12),
    startYear: z.number({ required_error: "startYear is required", message: "startYear must be in range of 1900 - now" }).min(1900).max(new Date().getFullYear()),
    endMonth: z
        .number({ message: "endMonth must be in range of 1 - 12" })
        .min(1)
        .max(12)
        .optional()
        .nullable(),
    endYear: z
        .number({ message: "endYear must be in range of 1900 - now" })
        .min(1900)
        .max(new Date().getFullYear())
        .optional()
        .nullable(),
    isCurrent: z.number({ required_error: "isCurrent is required", message: "isCurrent must be 0 or 1" }).min(0).max(1),
});

export {
    EnquirySchema,
    WorkSchema,
    EducationSchema,
};