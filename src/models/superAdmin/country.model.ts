import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE A NEW COUNTRY
export const createCountry = async (data: Prisma.CountryCreateInput): Promise<Prisma.CountryGetPayload<{}>> => {
  return await prisma.country.create({
    data,
  });
};

// GET ALL COUNTRIES
export const getAllCountries = async (): Promise<Prisma.CountryGetPayload<{}>[]> => {
  return await prisma.country.findMany({
    orderBy: [
      {
        country: 'asc',
      },
    ],
  });
};

// UPDATE A COUNTRY
export const updateCountry = async (id: string, data: Prisma.CountryUpdateInput): Promise<Prisma.CountryGetPayload<{}>> => {
  return await prisma.country.update({
    where: { id },
    data: {
      country: data.country ?? undefined,
    },
  });
};

// DELETE A COUNTRY
export const deleteCountry = async (id: string): Promise<void> => {
  await prisma.country.delete({
    where: { id },
  });
};