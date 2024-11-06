import { z } from "zod";

export const userCreateSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must be at most 20 characters"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters"),
    phone: z
        .string()
        .min(1, "Phone is required")
        .regex(/^[0-9]+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits"),
    role: z.string().min(1, "Role is required"),
});
export type UserCreateType = z.infer<typeof userCreateSchema>;

// UPDATE USER SCHEMA
export const userUpdateSchema = z.object({
    username: z
        .string()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must be at most 20 characters").optional(),
    role: z.string().optional(),
    phone: z
        .string()
        .regex(/^[0-9]+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits").optional(),
});
export type UserUpdateType = z.infer<typeof userUpdateSchema>;