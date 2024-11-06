import { Prisma, PrismaClient } from "@prisma/client";
import { CreateRollType, CreateRollTypeWithCreator, UpdateRollType } from "../schemas/roll.schemas";
import { getDateRange } from "../utils/searchHelper";

const prisma = new PrismaClient();



export type RollIncludeType = {
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
export const rollInclude = {
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

// Helper function to build where clause for search
const buildWhereClause = (
  searchValue: string,
  date: string | null,
  thickness: number | null
): Prisma.RollWhereInput => {
  let whereClause: Prisma.RollWhereInput = {};


  if (thickness !== null) {
    whereClause = {
      AND: [
        { thickness: { equals: thickness } },
        { rollCode: { contains: searchValue } }
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

// GET ALL ROLLS
export const getAllRolls = async (
): Promise<Prisma.RollGetPayload<{
  include: RollIncludeType;
}>[] | any> => {

  const rolls = await prisma.roll.findMany({
    include: rollInclude,
    orderBy: {
      "createdAt": "desc"
    },
  });
  return { rolls };
};

// GET ALL ROLLS GROUPED BY THICKNESS, WIDTH, TYPEID AND ROLLQUALITYID
// ALSO COUNT, SUMM THE WEIGHTS
export const getAllRollsDashboarad = async () => {
  return await prisma.roll.groupBy({
    by: ['thickness', 'width', 'typeId', 'qualityId'],
    _count: true,
    _sum: {
      netWeight: true,
    },
  });
}


// // GET ALL THICKNESSES AND COUNT
export const getAllRollThiknessesAndCount = async () => {
  return await prisma.roll.groupBy({
    by: ['thickness'],
    _count: true,
  });
}

// CREATE A ROLL
export const createRoll = async (
  data: CreateRollType,
  creatorId: string
): Promise<
  Prisma.RollGetPayload<{
    include: RollIncludeType
  }>
> => {
  return await prisma.roll.create({
    data: {
      rollCode: data.rollCode,
      img: data.img,
      comment: data.comment,
      thickness: data.thickness,
      width: data.width,
      actualLength: data.actualLength,
      theoryLength: data.theoryLength,
      netWeight: data.netWeight,
      grossWeight: data.grossWeight,
      typeId: data.typeId,
      madeInId: data.madeInId,
      qualityId: data.qualityId,
      creatorId,
    },
    include: rollInclude,
  })
};

// CREATE MANY ROLLS

export const createManyRolls = async (
  data: CreateRollTypeWithCreator
): Promise<Prisma.RollGetPayload<{}>[]> => {
  await prisma.roll.createMany({
    data
  });

  const newRolls = await prisma.roll.findMany({
    where: {
      rollCode: {
        in: data.map((roll) => roll.rollCode),
      },
    },
    include: rollInclude,
  });

  return newRolls;
}


// GET A ROLL BY ID
export const getRollById = async (
  id: string
): Promise<Prisma.RollGetPayload<{}> | null> => {
  return await prisma.roll.findUnique({
    where: { id },
  });
};

// GET A ROLL BY ROLL CODE
export const getRollByRollCode = async (
  rollCode: string
): Promise<Prisma.RollGetPayload<{}> | null> => {
  return await prisma.roll.findUnique({
    where: { rollCode },
  });
};

// UPDATE A ROLL
export const updateRoll = async (
  id: string,
  data: UpdateRollType
): Promise<
  Prisma.RollGetPayload<{
    include: RollIncludeType;
  }>
> => {
  return await prisma.roll.update({
    where: { id },
    data: {
      rollCode: data.rollCode ?? undefined,
      img: data.img ?? undefined,
      comment: data.comment ?? undefined,
      thickness: data.thickness ?? undefined,
      width: data.width ?? undefined,
      actualLength: data.actualLength ?? undefined,
      theoryLength: data.theoryLength ?? undefined,
      netWeight: data.netWeight ?? undefined,
      grossWeight: data.grossWeight ?? undefined,
      typeId: data.typeId ?? undefined,
      madeInId: data.madeInId ?? undefined,
      qualityId: data.qualityId ?? undefined,
    },
    include: rollInclude,
  });
};

// DELETE A ROLL 
export const deleteRoll = async (rollId: string): Promise<void> => {
  await prisma.roll.delete({
    where: { id: rollId },
  });
};