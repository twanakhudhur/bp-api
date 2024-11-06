import { CreateTamburType, UpdateTamburType } from "../schemas/tambur.schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { getDateRange } from "../utils/searchHelper";
import { TambursWithDetails } from "../controllers/tambur.controller";

const prisma = new PrismaClient();

type TamburInclude = {
    type: true;
    madeIn: true;
    quality: true;
    line: true;
    creator: {
        select: {
            id: true;
            username: true;
        };
    };
};
const tamburInclude = {
    type: true,
    madeIn: true,
    quality: true,
    line: true,
    creator: {
        select: {
            id: true,
            username: true,
        },
    },
};

type PieceInclude = {
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
const pieceInclude = {
    type: true,
    madeIn: true,
    quality: true,
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
    date: string | null,
    line: string | null
): Prisma.TamburWhereInput => {
    let whereClause: Prisma.TamburWhereInput = {
    };
    if (line !== null) {
        whereClause = { line: { line: { equals: line } } };
    } else {
        const numericSearchValue = parseFloat(searchValue);
        whereClause = {
            OR: [
                { autoCode: { contains: searchValue } },
                ...(isNaN(numericSearchValue)
                    ? []
                    : [
                        { actualWeight: { equals: numericSearchValue } },
                        { thickness: { equals: numericSearchValue } },
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

// GET ALL TAMBURS
export const getAllTamburs = async (
    page: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    searchValue: string,
    date: string | null,
    line: string | null
): Promise<{
    tamburs: Prisma.TamburGetPayload<{
        include: TamburInclude;
    }>[];
    totalCount: number;
}> => {

    const whereClause = buildWhereClause(searchValue, date, line);

    const tamburs = await prisma.tambur.findMany({
        include: tamburInclude,
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            [sortField]: sortOrder
        },
    });

    const totalCount = await prisma.tambur.count({
        where: whereClause,
    });

    return { tamburs, totalCount };
};

// CREATE A TAMBUR
export const createTambur = async (
    data: CreateTamburType,
    piece: Prisma.PieceGetPayload<{}>,
    creatorId: string,
): Promise<
    Prisma.TamburGetPayload<{
        include: TamburInclude;
    }>
> => {
    return await prisma.$transaction(async (prisma) => {
        await prisma.piece.delete({
            where: { id: piece.id },
        });

        return await prisma.tambur.create({
            data: {
                actualWeight: data.actualWeight,
                lineId: data.lineId,
                img: data.img,
                comment: data.comment,
                creatorId: creatorId,
                autoCode: piece.autoCode,
                pieceSeries: piece.pieceSeries,
                weight: piece.weight,
                thickness: piece.thickness,
                width: piece.width,
                pieceComment: piece.comment,
                theoryLength: piece.theoryLength,
                actualLength: piece.actualLength,
                pieceCreatedAt: piece.createdAt,
                typeId: piece.typeId,
                qualityId: piece.qualityId,
                madeInId: piece.madeInId,
                pieceCreatorId: piece.creatorId,
                slitRollId: piece.slitRollId,
            },
            include: tamburInclude,
        });
    })

};

// CREATE MULTIPLE TAMBURS
export const createMultipleTamburs = async (
    data: TambursWithDetails[],
): Promise<Prisma.BatchPayload> => {
    const createdTamburs = await prisma.tambur.createMany({
        data,
        skipDuplicates: true,
    });
    return createdTamburs;
};

// UPDATE A TAMBUR
export const updateTambur = async (
    id: string,
    data: UpdateTamburType
): Promise<
    Prisma.TamburGetPayload<{
        include: TamburInclude;
    }>
> => {
    return await prisma.tambur.update({
        where: { id },
        data: {
            actualWeight: data.actualWeight ?? undefined,
            lineId: data.lineId ?? undefined,
            img: data.img ?? undefined,
            comment: data.comment ?? undefined,
        },
        include: tamburInclude,
    });
}

// GET A TAMBUR BY ID
export const getTamburById = async (
    id: string
): Promise<
    Prisma.TamburGetPayload<{
        include: TamburInclude;
    }> | null
> => {
    return await prisma.tambur.findUnique({
        where: { id },
        include: tamburInclude,
    });
};

// DELETE A TAMBUR
export const deleteTambur = async (id: string, tambur: Prisma.TamburGetPayload<{}>): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }>> => {
    return await prisma.$transaction(async (prisma) => {
        await prisma.tambur.delete({
            where: { id },
        });
        return await prisma.piece.create({
            data: {
                autoCode: tambur.autoCode,
                pieceSeries: tambur.pieceSeries,
                weight: tambur.weight,
                thickness: tambur.thickness,
                width: tambur.width,
                comment: tambur.pieceComment,
                theoryLength: tambur.theoryLength,
                actualLength: tambur.actualLength,
                typeId: tambur.typeId,
                qualityId: tambur.qualityId,
                madeInId: tambur.madeInId,
                creatorId: tambur.pieceCreatorId,
                createdAt: tambur.pieceCreatedAt,
                slitRollId: tambur.slitRollId,
            },
            include: pieceInclude
        });
    });
};