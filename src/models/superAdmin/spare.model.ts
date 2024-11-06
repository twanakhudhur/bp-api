import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE SPARE
export const createNewSpare = async (data: Prisma.SpareCreateInput): Promise<Prisma.SpareGetPayload<{}>> => {
    return await prisma.spare.create({
        data,
    });
};

// UPDATE SPARE
export const updateSpare = async (id: string, data: Prisma.SpareUpdateInput & { spareListId?: string }): Promise<Prisma.SpareGetPayload<{}>> => {
    return await prisma.spare.update({
        where: { id },
        data: {
            quantity: data.quantity ?? undefined,
            description: data.description ?? undefined,
            spareListId: data.spareListId ?? undefined
        },
    });
};

// ADD SPARE
export const addToSpare = async (spareListId: string, quantity: number, description?: string): Promise<Prisma.SpareGetPayload<{}>> => {
    return await prisma.spare.update({
        where: { spareListId },
        data: {
            quantity: {
                increment: quantity
            },
            description
        },
    });
}

// GET ALL SPARES
export const getAllSpares = async (): Promise<Prisma.SpareGetPayload<{}>[]> => {
    return await prisma.spare.findMany(
        {
            include: {
                spareList: true
            }
        }
    );
};

// GET BY ID
export const getSpareById = async (id: string): Promise<Prisma.SpareGetPayload<{ include: { spareList: true } }> | null> => {
    return await prisma.spare.findUnique({
        where: { id },
        include: {
            spareList: true
        }
    });
};

// GET BY LIST ID
export const getSpareByListId = async (spareListId: string): Promise<Prisma.SpareGetPayload<{ include: { spareList: true } }> | null> => {
    return await prisma.spare.findUnique({
        where: { spareListId },
        include: {
            spareList: true
        }
    });
};

// DELETE SPARE
export const deleteSpareById = async (id: string): Promise<Prisma.SpareGetPayload<{}> | null> => {
    return await prisma.spare.delete({
        where: { id },
    });
};

