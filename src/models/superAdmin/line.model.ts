import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE A NEW LINE
export const createLine = async (data: Prisma.LineCreateInput): Promise<Prisma.LineGetPayload<{}>> => {
    return await prisma.line.create({
        data,
    });
};

// GET ALL LINES    
export const getAllLines = async (): Promise<Prisma.LineGetPayload<{}>[]> => {
    return await prisma.line.findMany(
        {
            orderBy: [
                {
                    line: 'asc',
                },
            ],
        },
    );
};

// UPDATE A LINE
export const updateLine = async (id: string, data: Prisma.LineUpdateInput): Promise<Prisma.LineGetPayload<{}>> => {
    return await prisma.line.update({
        where: { id },
        data: {
            line: data.line ?? undefined,
        },
    });
};

// DELETE A LINE
export const deleteLine = async (id: string): Promise<void> => {
    await prisma.line.delete({
        where: { id },
    });
};