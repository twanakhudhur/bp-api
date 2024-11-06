import prisma, { Prisma } from "../../prismaClient";


// CREATE A NEW ROLL TYPE
export const createRollType = async (data: Prisma.RollTypeCreateInput): Promise<Prisma.RollTypeGetPayload<{}>> => {
  return await prisma.rollType.create({
    data,
  });
};

// GET ALL ROLL TYPES
export const getAllRollTypes = async (): Promise<Prisma.RollTypeGetPayload<{}>[]> => {
  return await prisma.rollType.findMany(
    {
      orderBy: [
        {
          type: 'asc',
        },
      ],
    },
  );
};

// UPDATE A ROLL TYPE
export const updateRollType = async (id: string, data: Prisma.RollTypeUpdateInput): Promise<Prisma.RollTypeGetPayload<{}>> => {
  return await prisma.rollType.update({
    where: { id },
    data: {
      type: data.type ?? undefined,
    },
  });
};

// DELETE A ROLL TYPE
export const deleteRollType = async (id: string): Promise<void> => {
  await prisma.rollType.delete({
    where: { id },
  });
};
