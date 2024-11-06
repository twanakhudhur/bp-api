import { z } from "zod";

// CREATE SLIT SCHEMA
export const createSlitRollSchema = z.object({
    actualWidth: z.number().min(1, "Actual Width is required").positive("Actual Width must be positive"),
    daySeries: z.number().min(1, "Series of the day is required").positive("Series of the day must be positive"),
    dividedInto: z.number().min(1, "Divided in to is required").positive("Divided in to must be positive"),
    // Array of slit pieces
    pieces: z.array(z.object({
        autoCode: z.string().min(1, "Auto Code is required"),
        pieceSeries: z.number().min(1, "Piece Series is required").positive("Piece Series must be positive"),
        weight: z.number().min(1, "Weight is required").positive("Weight must be positive"),
        width: z.number().min(1, "Width is required").positive("Width must be positive"),
        comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    })).min(1, "At least one piece item is required"),
    // Array of slit waste
    wastes: z.array(z.object({
        autoCode: z.string().min(1, "Auto Code is required"),
        pieceSeries: z.number().min(1, "Piece Series is required").positive("Piece Series must be positive"),
        weight: z.number().min(1, "Weight is required").positive("Weight must be positive"),
        width: z.number().min(1, "Width is required").positive("Width must be positive"),
        comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    })).min(1, "At least one waste item is required"),

});
export type CreateSlitRollType = z.infer<typeof createSlitRollSchema>;

// UPDATE SLIT SCHEMA
export const updateSlitRollSchema = z.object({
    actualWidth: z.number().optional(),
    daySeries: z.number().optional(),
    dividedInto: z.number().optional(),
    // Array of slit pieces
    pieces: z.array(z.object({
        autoCode: z.string().min(1, "Auto Code is required"),
        pieceSeries: z.number().min(1, "Piece Series is required"),
        weight: z.number().min(1, "Weight is required"),
        width: z.number().min(1, "Width is required"),
        comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    })).min(1, "At least one piece item is required"),
    // Array of slit waste
    wastes: z.array(z.object({
        autoCode: z.string().min(1, "Auto Code is required"),
        pieceSeries: z.number().min(1, "Piece Series is required"),
        weight: z.number().min(1, "Weight is required"),
        width: z.number().min(1, "Width is required"),
        comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    })).min(1, "At least one waste item is required"),
});
export type UpdateSlitRollType = z.infer<typeof updateSlitRollSchema>;
