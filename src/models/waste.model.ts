import { Prisma, PrismaClient } from "@prisma/client";
import { SellWasteType, UpdateWasteType, CreateWasteType } from "../schemas/waste.schemas";
import { Response } from "express";
import { existError, notFoundError } from "../utils/errorHelpers";
import { getDateRange } from "../utils/searchHelper";

const prisma = new PrismaClient();

type WasteInclude = {
    type: true;
    madeIn: true;
    quality: true;
    slitRoll: true;
    creator: {
        select: {
            id: true;
            username: true;
        };
    };
};
const wasteInclude = {
    type: true,
    madeIn: true,
    quality: true,
    slitRoll: true,
    creator: {
        select: {
            id: true,
            username: true,
        },
    },
};

// helper function to build where clause for pieces
const buildWhereClause = (
    searchValue: string,
    date: string | null
): Prisma.WasteWhereInput => {
    let whereClause: Prisma.WasteWhereInput = {
        soldWasteId: null,
    };
    const numericSearchValue = parseFloat(searchValue);
    whereClause = {
        AND: [
            { soldWasteId: null },
            {
                OR: [
                    { autoCode: { contains: searchValue } },
                    ...(isNaN(numericSearchValue)
                        ? []
                        : [
                            { width: { equals: numericSearchValue } },
                            { weight: { equals: numericSearchValue } },
                            { thickness: { equals: numericSearchValue } },
                        ]),
                ],
            }
        ]
    };


    const dateRange = date ? getDateRange(date) : null;
    if (dateRange) {
        whereClause.createdAt = dateRange;
    }
    return whereClause;
};
// GET ALL WASTES
export const getAllWastes = async (
    page: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    searchValue: string,
    date: string | null
): Promise<{ wastes: Prisma.WasteGetPayload<{ include: WasteInclude }>[], totalCount: number }> => {


    const whereClause = buildWhereClause(searchValue, date);

    const totalCount = await prisma.waste.count({
        where: whereClause,
    });

    const wastes = await prisma.waste.findMany({
        include: wasteInclude,
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            [sortField]: sortOrder
        },
    });
    return {
        wastes,
        totalCount,
    };
};

// CREATE A WASTE
export const createWaste = async (data: CreateWasteType, creatorId: string): Promise<Prisma.WasteGetPayload<{ include: WasteInclude }>> => {
    return await prisma.waste.create({
        data: {
            autoCode: data.autoCode,
            pieceSeries: data.pieceSeries,
            weight: data.weight,
            width: data.width,
            thickness: data.thickness,
            typeId: data.typeId,
            madeInId: data.madeInId,
            qualityId: data.qualityId,
            theoryLength: data.theoryLength,
            actualLength: data.actualLength,
            comment: data.comment,
            creatorId: creatorId,
        },
        include: wasteInclude,
    });
};

// UPDATE A WASTE
export const updateWaste = async (id: string, data: UpdateWasteType): Promise<Prisma.WasteGetPayload<{ include: WasteInclude }>> => {
    return await prisma.waste.update({
        where: { id },
        data: {
            autoCode: data.autoCode ?? undefined,
            pieceSeries: data.pieceSeries ?? undefined,
            weight: data.weight ?? undefined,
            width: data.width ?? undefined,
            comment: data.comment ?? undefined,
            thickness: data.thickness ?? undefined,
            typeId: data.typeId ?? undefined,
            madeInId: data.madeInId ?? undefined,
            qualityId: data.qualityId ?? undefined,
            theoryLength: data.theoryLength ?? undefined,
            actualLength: data.actualLength ?? undefined,
        },
        include: wasteInclude,
    });
}

// GET A WASTE BY ID
export const getWasteById = async (id: string): Promise<Prisma.WasteGetPayload<{ include: WasteInclude }> | null> => {
    return await prisma.waste.findUnique({
        where: { id },
        include: wasteInclude,
    });
};

// DELETE A WASTE
export const deleteWaste = async (id: string): Promise<void> => {
    await prisma.waste.delete({
        where: { id },
    });
};

// CREATE SOLD WASTE
export const createSoldWaste = async (res: Response, data: SellWasteType, creatorId: string) => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const soldWaste = await prisma.soldWaste.create({
                data: {
                    soldTo: data.soldTo,
                    comment: data.comment,
                    creatorId,
                    totalWeight: 0,
                },
            });

            let newTotalWeight = 0;
            for (const wasteId of data.wasteIds) {

                const existingWaste = await prisma.waste.findUnique({
                    where: { id: wasteId },
                    select: { soldWasteId: true },
                });

                if (!existingWaste) {
                    // return notFoundError(res, "waste", `Waste with ID ${wasteId} not found`);
                    throw new Error(`Waste with ID ${wasteId} not found`);
                }

                if (existingWaste.soldWasteId) {
                    // return existError(res, "waste", `Waste with ID ${wasteId} is already sold`);
                    throw new Error(`Waste with ID ${wasteId} is already sold`);
                }

                const waste = await prisma.waste.update({
                    where: { id: wasteId },
                    data: { soldWasteId: soldWaste.id },
                });
                newTotalWeight += Number(waste.weight);
            }

            const updatedSoldWaste = await prisma.soldWaste.update({
                where: { id: soldWaste.id },
                data: { totalWeight: newTotalWeight },
            });

            return updatedSoldWaste;
        });

        return result;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('not found')) {
                return notFoundError(res, "waste", error.message);
            } else if (error.message.includes('already sold')) {
                return existError(res, "waste", error.message);
            } else {
                return res.status(500).json({ error: 'An error occurred while creating the sold waste.' });
            }
        }
        else {
            return res.status(500).json({ error: 'An unknown error occurred.' });
        }
    }
}

// get sold waste by id
export const getSoldWasteById = async (id: string): Promise<Prisma.SoldWasteGetPayload<{ include: { wastes: true } }> | null> => {
    return await prisma.soldWaste.findUnique({
        where: { id },
        include: {
            wastes: true,
        },
    });
};

// undo a sold waste
export const deleteSoldWaste = async (id: string): Promise<void> => {
    await prisma.soldWaste.delete({
        where: { id },
    });
}