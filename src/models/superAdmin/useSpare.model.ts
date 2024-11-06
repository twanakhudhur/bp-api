import { Prisma, PrismaClient } from '@prisma/client';
import { UseSpareCreateType } from '../../schemas/superAdmin/general.schemas';

const prisma = new PrismaClient();

type UsedSpareIncludeType = {
    spare: true;
    giver: true;
};
const usedSpareInclude = {
    spare: true,
    giver: true,
};

// CREATE USED SPARE
export const createUseSpare = async (data: Prisma.UsedSpareCreateInput, spareId: string, gaveBy: string): Promise<Prisma.UsedSpareGetPayload<{ include: UsedSpareIncludeType }>> => {
    return await prisma.$transaction(async (prisma) => {
        await prisma.spare.update({
            where: { id: spareId },
            data: {
                quantity: {
                    decrement: data.quantity,
                },
            },
        });
        return await prisma.usedSpare.create({
            data: {
                quantity: data.quantity,
                description: data.description,
                usedBy: data.usedBy,
                gaveBy,
                spareId,
            },
            include: usedSpareInclude,
        });
    });
};

// GET ALL USED SPARE
export const getAllUsedSpare = async (): Promise<Prisma.UsedSpareGetPayload<{ include: UsedSpareIncludeType }>[]> => {
    return await prisma.usedSpare.findMany(
        {
            include: usedSpareInclude,
        }
    );
};

// GET USED SPARE BY ID
export const getUsedSpareById = async (id: string): Promise<Prisma.UsedSpareGetPayload<{ include: UsedSpareIncludeType }> | null> => {
    return await prisma.usedSpare.findUnique({
        where: { id },
        include: usedSpareInclude,
    });
};

// UPDATE USED SPARE
export const updateUsedSpare = async (id: string, data: Prisma.UsedSpareUpdateInput & { spareId?: string }): Promise<Prisma.UsedSpareGetPayload<{ include: UsedSpareIncludeType }>> => {
    const usedSpare = await prisma.usedSpare.update({
        where: { id },
        data: {
            quantity: data.quantity ?? undefined,
            description: data.description ?? undefined,
            usedBy: data.usedBy ?? undefined,
            spareId: data.spareId ?? undefined,
        },
        include: usedSpareInclude,
    });
    return usedSpare;
};

// DELETE USED SPARE
export const deleteUsedSpare = async (id: string): Promise<Prisma.UsedSpareGetPayload<{ include: UsedSpareIncludeType }> | null> => {
    return await prisma.usedSpare.delete({
        where: { id },
        include: usedSpareInclude,
    });
};