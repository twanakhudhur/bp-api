import prisma, { Prisma } from "../../prismaClient";


// CREATE A NEW ROLL QUALITY
export const createRollQuality = async (data: Prisma.RollQualityCreateInput): Promise<Prisma.RollQualityGetPayload<{}>> => {
    return await prisma.rollQuality.create({
        data,
    });
};

// GET ALL ROLL QUALITIES
export const getAllRollQualities = async (): Promise<Prisma.RollQualityGetPayload<{}>[]> => {
    return await prisma.rollQuality.findMany(
        {
            orderBy: [
                {
                    quality: 'asc',
                },
            ],
        },
    );
};

// UPDATE A ROLL QUALITY
export const updateRollQuality = async (id: string, data: Prisma.RollQualityUpdateInput): Promise<Prisma.RollQualityGetPayload<{}>> => {
    return await prisma.rollQuality.update({
        where: { id },
        data: {
            quality: data.quality ?? undefined,
        },
    });
};

// DELETE A ROLL QUALITY
export const deleteRollQuality = async (id: string): Promise<void> => {
    await prisma.rollQuality.delete({
        where: { id },
    });
};