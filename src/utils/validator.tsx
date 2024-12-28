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

export {
    EnquirySchema,
};