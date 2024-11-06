import { z } from "zod";

// CREATE PIECE SCHEMA
export const createPieceSchema = z.object({
    autoCode: z.string().min(1, "Auto Code is required"),
    weight: z.number().min(1, "Weight is required").positive("Weight must be greater than 0"),
    width: z.number().min(1, "Width is required").positive("Width must be grater than 0"),
    thickness: z.number().min(1, "Thickness is required").positive("Thickness must be greater than 0"),
    typeId: z.string().min(1, "Type is required"),
    madeInId: z.string().min(1, "Made In is required"),
    qualityId: z.string().min(1, "Quality is required"),

    comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    pieceSeries: z.number().positive("Piece Series must be greater than 0").optional().nullable(),
    theoryLength: z.number().positive("Theory Length must be greater than 0").optional().nullable(),
    actualLength: z.number().positive("Actual Length must be greater than 0").optional().nullable(),
});
export type CreatePieceType = z.infer<typeof createPieceSchema>;

// UPDATE PIECE SCHEMA
export const updatePieceSchema = z.object({
    autoCode: z.string().optional(),
    pieceSeries: z.number().positive("Piece Series must be greater than 0").optional(),
    weight: z.number().positive("Weight must be greater than 0").optional(),
    width: z.number().positive("Width must be grater than 0").optional(),
    thickness: z.number().positive("Thickness must be greater than 0").optional(),
    theoryLength: z.number().positive("Theory Length must be greater than 0").optional(),
    actualLength: z.number().positive("Actual Length must be greater than 0").optional(),
    comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    typeId: z.string().optional(),
    madeInId: z.string().optional(),
    qualityId: z.string().optional(),
});
export type UpdatePieceType = z.infer<typeof updatePieceSchema>;


// THINNING SCHEMA
export const thinningSchema = z.object({
    thinningThickness: z.number().min(1, "Thinning Thickness is required").positive("Thinning Thickness must be greater than 0"),
    thinningLength: z.number().min(1, "Thinning Length is required").positive("Thinning Length must be greater than 0"),
});
export type ThinningType = z.infer<typeof thinningSchema>;