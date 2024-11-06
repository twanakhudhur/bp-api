import { Prisma, PrismaClient } from "@prisma/client";
import { CreateSlitRollType, UpdateSlitRollType } from "../schemas/slitRoll.schemas";
import { getDateRange } from "../utils/searchHelper";

const prisma = new PrismaClient();

type SlitInclude = {
    type: true;
    madeIn: true;
    quality: true;
    creator: {
        select: {
            id: true;
            username: true;
        };
    };
    pieces: {
        orderBy: {
            pieceSeries: Prisma.SortOrder;
        };
    };
    tambur: {
        orderBy: {
            pieceSeries: Prisma.SortOrder;
        };
    }
    wastes: true;
};
const slitInclude = {
    type: true,
    madeIn: true,
    quality: true,
    creator: {
        select: {
            id: true,
            username: true,
        },
    },
    pieces: {
        orderBy: {
            pieceSeries: Prisma.SortOrder.asc,
        }
    },
    tambur: {
        orderBy: {
            pieceSeries: Prisma.SortOrder.asc,
        }
    },
    wastes: true,
};

// helper function to build where clause
const buildWhereClause = (
    searchValue: string,
    date: string | null,
    thickness: number | null
): Prisma.SlitRollWhereInput => {

    let whereClause: Prisma.SlitRollWhereInput = {};

    if (thickness !== null) {
        whereClause = {
            AND: [
                { rollCode: { contains: searchValue } },
                { thickness: { equals: thickness } },
            ],
        };
    } else {
        const numericSearchValue = parseFloat(searchValue);
        whereClause = {
            OR: [
                { rollCode: { contains: searchValue } },
                ...(isNaN(numericSearchValue)
                    ? []
                    : [
                        { width: { equals: numericSearchValue } },
                        { thickness: { equals: numericSearchValue } },
                        { netWeight: { equals: numericSearchValue } },
                    ]),
            ],
        };
    }

    const dateRange = date ? getDateRange(date) : null;
    if (dateRange) {
        whereClause.createdAt = dateRange;
    }
    return whereClause;
};

// GET ALL SLIT ROLLS
export const getAllSlitRolls = async (
    page: number,
    pageSize: number,
    sortOrder: "asc" | "desc",
    searchValue: string,
    date: string | null,
    thickness: number | null
): Promise<{
    slitRolls: Prisma.SlitRollGetPayload<{
        include: SlitInclude;
    }>[];
    totalCount: number;
}> => {

    const whereClause = buildWhereClause(searchValue, date, thickness);

    const slitRolls = await prisma.slitRoll.findMany({
        include: slitInclude,
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            createdAt: sortOrder
        },
    });

    const totalCount = await prisma.slitRoll.count({
        where: whereClause,
    });

    return { slitRolls, totalCount };
};

// GET SLIT ROLL THICKNESS COUNTS
export const getAllSlitRollThiknessesAndCount = async () => {
    return await prisma.slitRoll.groupBy({
        by: ['thickness'],
        _count: true,
    });
}

// CREATE A SLIT ROLL WITH PIECES AND WASTES 
export const createSlitRollWithPieces = async (
    data: CreateSlitRollType,
    roll: Prisma.RollGetPayload<{}>,
    creatorId: string,
    rollId: string,
): Promise<
    Prisma.SlitRollGetPayload<{
        include: SlitInclude;
    }>
> => {
    const slitRoll = await prisma.$transaction(async (prisma) => {
        const createdSlitRoll = await prisma.slitRoll.create({
            data: {
                actualWidth: data.actualWidth,
                daySeries: data.daySeries,
                dividedInto: data.pieces.length,

                rollCode: roll.rollCode,
                img: roll.img,
                rollComment: roll.comment,
                rollCreatedAt: roll.createdAt,
                netWeight: roll.netWeight,
                grossWeight: roll.grossWeight,
                width: roll.width,
                theoryLength: roll.theoryLength,
                actualLength: roll.actualLength,
                thickness: roll.thickness,

                creatorId: creatorId,
                rollCreatorId: roll.creatorId,
                madeInId: roll.madeInId,
                qualityId: roll.qualityId,
                typeId: roll.typeId,
                pieces: {
                    createMany: {
                        data: data.pieces.map((piece) => ({
                            ...piece,
                            thickness: roll.thickness,
                            typeId: roll.typeId,
                            madeInId: roll.madeInId,
                            qualityId: roll.qualityId,
                            creatorId,
                        })),
                    },
                },
                wastes: {
                    createMany: {
                        data: data.wastes.map((waste) => ({
                            ...waste,
                            thickness: roll.thickness,
                            typeId: roll.typeId,
                            madeInId: roll.madeInId,
                            qualityId: roll.qualityId,
                            creatorId,
                        })),
                    },
                },
            },
            include: slitInclude,
        });

        await prisma.roll.delete({
            where: { id: rollId },
        });

        return createdSlitRoll;
    });

    return slitRoll;
};

// GET A SLIT ROLL BY ID
export const getSlitRollById = async (
    id: string
): Promise<Prisma.SlitRollGetPayload<{ include: SlitInclude }> | null> => {
    return prisma.slitRoll.findUnique({
        where: { id },
        include: slitInclude,
    });
};

// GET SLIT ROLL BY ROLL CODE
export const getSlitRollByRollCode = async (
    rollCode: string
): Promise<Prisma.SlitRollGetPayload<{}> | null> => {
    return await prisma.slitRoll.findUnique({
        where: { rollCode },
    });
};

// UPDATE A SLIT ROLL   
export const updateSlitRoll = async (
    id: string,
    data: UpdateSlitRollType,
    slitRoll: Prisma.SlitRollGetPayload<{}>,
): Promise<
    Prisma.SlitRollGetPayload<{
        include: SlitInclude;
    }>
> => {
    const newSlitRoll = await prisma.slitRoll.update({
        where: { id },
        data: {
            actualWidth: data.actualWidth ?? undefined,
            daySeries: data.daySeries ?? undefined,
            dividedInto: data.pieces.length ?? undefined,

            pieces: {
                deleteMany: {},
                createMany: {
                    data: data.pieces.map((piece) => ({
                        ...piece,
                        thickness: slitRoll.thickness,
                        typeId: slitRoll.typeId,
                        madeInId: slitRoll.madeInId,
                        qualityId: slitRoll.qualityId,
                        creatorId: slitRoll.creatorId,
                    })),
                },
            },
            wastes: {
                deleteMany: {},
                createMany: {
                    data: data.wastes.map((waste) => ({
                        ...waste,
                        thickness: slitRoll.thickness,
                        typeId: slitRoll.typeId,
                        madeInId: slitRoll.madeInId,
                        qualityId: slitRoll.qualityId,
                        creatorId: slitRoll.creatorId,
                    })),
                },
            },
        },
        include: slitInclude,
    });

    return newSlitRoll;
}

// Delete a slit roll
export const deleteSlitRoll = async (id: string, slitRoll: Prisma.SlitRollGetPayload<{}>): Promise<Prisma.RollGetPayload<{
    include: {
        type: true;
        madeIn: true;
        quality: true;
        creator: {
            select: {
                id: true;
                username: true;
            };
        };
    }
}>> => {
    const roll = await prisma.$transaction(async (prisma) => {
        await prisma.slitRoll.delete({
            where: { id },
        });
        return await prisma.roll.create({
            data: {
                rollCode: slitRoll.rollCode,
                img: slitRoll.img,
                comment: slitRoll.rollComment,
                thickness: slitRoll.thickness,
                width: slitRoll.width,
                actualLength: slitRoll.actualLength,
                theoryLength: slitRoll.theoryLength,
                netWeight: slitRoll.netWeight,
                grossWeight: slitRoll.grossWeight,
                typeId: slitRoll.typeId,
                madeInId: slitRoll.madeInId,
                qualityId: slitRoll.qualityId,
                creatorId: slitRoll.rollCreatorId,
            },
            include: {
                type: true,
                madeIn: true,
                quality: true,
                creator: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            }
        })
    });
    return roll;
};
