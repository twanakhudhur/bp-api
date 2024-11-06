import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE SPARE LIST
export const createSpareList = async (data: Prisma.SpareListCreateInput): Promise<Prisma.SpareListGetPayload<{}>> => {
    return await prisma.spareList.create({
        data,
    });
};

// GET ALL SPARE LISTS
export const getAllSparelists = async (): Promise<Prisma.SpareListGetPayload<{}>[]> => {
    return await prisma.spareList.findMany(
        {
            include: {
                spares: true
            }
        }
    );
};

// GET SPARE LIST BY ID
export const getSpareListById = async (id: string): Promise<Prisma.SpareListGetPayload<{ include: { spares: true } }> | null> => {
    return await prisma.spareList.findUnique({
        where: { id },
        include: {
            spares: true
        }
    });
};

// UPDATE SPARE LIST
export const updateSpareList = async (id: string, data: Prisma.SpareListCreateInput): Promise<Prisma.SpareListGetPayload<{}>> => {
    return await prisma.spareList.update({
        where: { id },
        data: {
            name: data.name ?? undefined,
            description: data.description ?? undefined,
        },
    });
};

// DELETE SPARE LIST
export const deleteSpareList = async (id: string): Promise<Prisma.SpareListGetPayload<{}>> => {
    return await prisma.spareList.delete({
        where: { id },
    });
};
