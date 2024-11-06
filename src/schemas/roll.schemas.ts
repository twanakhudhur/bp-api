import { z } from "zod";

// CREATE ROLL SCHEMA
export const createRollSchema = z.object({
    rollCode: z.string().min(1, "Roll Code is required"),
    img: z.string().optional(),
    thickness: z.number().min(1, "Thickness is required").positive("Thickness must be greater than 0"),
    width: z.number().min(1, "Width is required").positive("Width must be greater than 0"),
    netWeight: z.number().min(1, "Net Weight is required").positive("Net Weight must be greater than 0"),
    grossWeight: z.number().min(1, "Gross Weight is required").positive("Gross Weight must be greater than 0"),

    typeId: z.string().min(1, "Type is required"),
    madeInId: z.string().min(1, "Made In is required"),
    qualityId: z.string().min(1, "Quality is required"),

    comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    theoryLength: z.number().positive("Theory Length must be greater than 0").optional().nullable(),
    actualLength: z.number().positive("Actual Length must be greater than 0").optional().nullable(),

});
export type CreateRollType = z.infer<typeof createRollSchema>;

// CREATE MANY ROLLS SCHEMA

export const createManyRollSchema = z.array(
    z.object({
        rollCode: z.string().min(1, "Roll Code is required"),
        thickness: z.number().min(1, "Thickness is required").positive("Thickness must be greater than 0"),
        width: z.number().min(1, "Width is required").positive("Width must be greater than 0"),
        netWeight: z.number().min(1, "Net Weight is required").positive("Net Weight must be greater than 0"),
        grossWeight: z.number().min(1, "Gross Weight is required").positive("Gross Weight must be greater than 0"),

        typeId: z.string().min(1, "Type is required"),
        madeInId: z.string().min(1, "Made In is required"),
        qualityId: z.string().min(1, "Quality is required"),

        comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
        theoryLength: z.number().positive("Theory Length must be greater than 0").optional(),
        actualLength: z.number().positive("Actual Length must be greater than 0").optional(),
    })
).min(1, "At least one roll is required");
export type CreateManyRollType = z.infer<typeof createManyRollSchema>;
export type CreateRollTypeWithCreator = Array<
    CreateManyRollType[number] & { creatorId: string }
>;

// UPDATE ROLL SCHEMA
export const updateRollSchema = z.object({
    rollCode: z.string().optional(),
    img: z.string().optional(),
    thickness: z.number().positive("Thickness must be greater than 0").optional(),
    width: z.number().positive("Width must be greater than 0").optional(),
    netWeight: z.number().positive("Net Weight must be greater than 0").optional(),
    grossWeight: z.number().positive("Gross Weight must be greater than 0").optional(),

    typeId: z.string().optional(),
    madeInId: z.string().optional(),
    qualityId: z.string().optional(),

    comment: z.string().max(255, "Comment must be at most 255 characters").optional(),
    theoryLength: z.number().positive("Theory Length must be greater than 0").nullable().optional(),
    actualLength: z.number().positive("Actual Length must be greater than 0").nullable().optional(),

});
export type UpdateRollType = z.infer<typeof updateRollSchema>;