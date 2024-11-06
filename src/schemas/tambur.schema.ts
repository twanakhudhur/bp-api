import { z } from "zod";

// CREATE TAMBUR SCHEMA
export const createTamburSchema = z.object({
    actualWeight: z.number().positive("Actual weight must be grater than 0").optional(),
    lineId: z.string().min(1, "Line is required"),
    img: z.string().optional(),
    comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
});
export type CreateTamburType = z.infer<typeof createTamburSchema>;

// UPDATE TAMBUR SCHEMA
export const updateTamburSchema = z.object({
    actualWeight: z.number().positive("Actual weight must be grater than 0").optional(),
    lineId: z.string().optional(),
    img: z.string().optional(),
    comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
});
export type UpdateTamburType = z.infer<typeof updateTamburSchema>;

// CREATE MULTIPLE TAMBUR SCHEMA
export const multipleTamburSchema = z.object({
    actualWeight: z.number().positive("Actual weight must be grater than 0").optional(),
    lineId: z.string().min(1, "Line is required"),
    img: z.string().optional(),
    comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    pieces: z.array(
        z.string().min(1, "Piece is required"),
    ).min(1, "At least one piece is required"),
});
export type MultipleTamburType = z.infer<typeof multipleTamburSchema>;