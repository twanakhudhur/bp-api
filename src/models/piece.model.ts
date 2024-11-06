import prisma, { Prisma } from "../prismaClient";
import { CreatePieceType, ThinningType, UpdatePieceType } from "../schemas/piece.schemas";
import { getDateRange } from "../utils/searchHelper";


type PieceInclude = {
    type: true;
    madeIn: true;
    quality: true;
    slitRoll?: true;
    creator: {
        select: {
            id: true;
            username: true;
        };
    };
};
const pieceInclude = {
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

//  helper function to build where clause
const buildWhereClause = (
    searchValue: string,
    date: string | null,
    thickness: number | null
): Prisma.PieceWhereInput => {
    let whereClause: Prisma.PieceWhereInput = {};
    if (thickness !== null) {
        whereClause = {
            AND: [
                { thickness: { equals: thickness } }
            ],
        };
    } else {
        const numericSearchValue = parseFloat(searchValue);
        whereClause = {
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


        };
    }

    const dateRange = date ? getDateRange(date) : null;
    if (dateRange) {
        whereClause.createdAt = dateRange;
    }
    return whereClause;
};

// get all pieces
// export const getAllPieces = async (
//     page: number,
//     pageSize: number,
//     sortField: string,
//     sortOrder: string,
//     searchValue: string,
//     date: string | null,
//     thickness: number | null
// ): Promise<{ pieces: Prisma.PieceGetPayload<{ include: PieceInclude }>[], totalCount: number }> => {

//     const whereClause = buildWhereClause(searchValue, date, thickness);

//     const pieces = await prisma.piece.findMany({
//         include: pieceInclude,
//         where: whereClause,
//         skip: (page - 1) * pageSize,
//         take: pageSize,
//         orderBy: {
//             [sortField]: sortOrder
//         },
//     });

//     const totalCount = await prisma.piece.count({
//         where: whereClause,
//     });

//     return {
//         pieces,
//         totalCount,
//     };
// };

export const getAllPieces = async (

): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }>[]> => {

    const pieces = await prisma.piece.findMany({
        include: pieceInclude,
        orderBy: {
            "createdAt": "desc"
        },
    });

    return pieces;
};

// GET ALL ROLLS GROUPED BY THICKNESS, WIDTH, TYPEID AND ROLLQUALITYID
// ALSO COUNT, SUMM THE WEIGHTS
export const getAllPiecesDashboarad = async () => {
    return await prisma.piece.groupBy({
        by: ['thickness', 'width', 'typeId', 'qualityId'],
        _count: true,
        _sum: {
            weight: true,
        },
    });
}

// GET ALL PIECES BY ARRAY OF IDS
export const getPiecesByIds = async (ids: string[]): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }>[]> => {
    return await prisma.piece.findMany({
        where: {
            id: {
                in: ids,
            },
        },
        include: pieceInclude,
    });
};

// CREATE A PIECE
export const createPiece = async (data: CreatePieceType, creatorId: string): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }>> => {
    return await prisma.piece.create({
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
        include: pieceInclude,
    });
};

// UPDATE A PIECE
export const updatePiece = async (id: string, data: UpdatePieceType): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }>> => {
    return await prisma.piece.update({
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
        include: pieceInclude,
    });
};

// // GET ALL THICKNESSES AND COUNT
export const getAllPieceThiknessesAndCount = async () => {
    return await prisma.piece.groupBy({
        by: ['thickness'],
        _count: true,
    });
}

// GET A SINGLE PIECE BY ID
export const getPieceById = async (id: string): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }> | null> => {
    return await prisma.piece.findUnique({
        where: { id },
        include: pieceInclude,
    });
};

// DELETE A PIECE
export const deletePiece = async (id: string): Promise<void> => {
    await prisma.piece.delete({
        where: { id },
    });
};

// THINNING A PIECE
export const thinPiece = async (id: string, data: ThinningType): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }>> => {
    return await prisma.piece.update({
        where: { id },
        data: {
            thinned: true,
            thinningThickness: data.thinningThickness,
            thinningLength: data.thinningLength,
        },
        include: pieceInclude,
    });
};

// UNDO THINNING OF A PIECE
export const undoThinPiece = async (id: string): Promise<Prisma.PieceGetPayload<{ include: PieceInclude }>> => {
    return await prisma.piece.update({
        where: { id },
        data: {
            thinned: false,
            thinningThickness: 0,
            thinningLength: 0,
        },
        include: pieceInclude,
    });
};