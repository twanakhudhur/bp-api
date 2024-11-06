import { z } from 'zod';

// COUNTRY SCHEMAS
export const countryCreateSchema = z.object({
    country: z.string().min(1, 'Country name is required'),
});
export type CountryCreateType = z.infer<typeof countryCreateSchema>;

// ROLLTYPE SCHEMAS
export const rollTypeCreateSchema = z.object({
    type: z.string().min(1, 'Roll Type is required'),
});
export type RollTypeCreateType = z.infer<typeof rollTypeCreateSchema>;

// ROLLQUALITY SCHEMAS
export const rollQualityCreateSchema = z.object({
    quality: z.string().min(1, 'Roll Quality is required'),
});
export type RollQualityCreateType = z.infer<typeof rollQualityCreateSchema>;

// ROLLQUALITY SCHEMAS 
export const rollQualityUpdateSchema = z.object({
    quality: z.string().min(1, 'Roll Quality is required'),
});
export type RollQualityUpdateType = z.infer<typeof rollQualityUpdateSchema>;

// LINE SCHEMAS
export const lineCreateSchema = z.object({
    line: z.string().min(1, 'Line name is required'),
});
export type LineCreateType = z.infer<typeof lineCreateSchema>;

// SPARELIST SCHEMAS
export const spareListCreateSchema = z.object({
    name: z.string().min(1, 'Spare name is required'),
    description: z.string().optional(),

});
export type SpareListCreateType = z.infer<typeof spareListCreateSchema>;

// SPARE SCHEMAS
export const spareCreateSchema = z.object({
    quantity: z.number().int().positive('Quantity is required'),
    description: z.string().optional(),
    spareListId: z.string().min(1, 'Spare List is required'),
});
export type SpareCreateType = z.infer<typeof spareCreateSchema>;


// USE SPARE SCHEMAS
export const useSpareCreateSchema = z.object({
    quantity: z.number().int().positive('Quantity is required'),
    description: z.string().optional(),
    usedBy: z.string().min(1, 'Used By is required'),
});
export type UseSpareCreateType = z.infer<typeof useSpareCreateSchema>;
