import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET ALL USERS 
export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            role: true,
            phone: true,
            isFrozen: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

// CREATE A NEW USER
export const createUser = async (data: Prisma.UserCreateInput): Promise<Prisma.UserGetPayload<{}>> => {
    return await prisma.user.create({
        data: {
            password: data.password,
            role: data.role,
            username: data.username,
            phone: data.phone,
        },
    });
};

// UPDATE A USER
export const updateUser = async (id: string, data: Prisma.UserUpdateInput): Promise<Prisma.UserGetPayload<{}>> => {
    return await prisma.user.update({
        where: { id },
        data: {
            password: data.password ?? undefined,
            role: data.role ?? undefined,
            username: data.username ?? undefined,
            phone: data.phone ?? undefined,
            isFrozen: data.isFrozen ?? undefined,
            expiration: data.expiration ?? undefined,
        },
    });
};

// DELETE A USER
export const deleteUser = async (id: string): Promise<Prisma.UserGetPayload<{}>> => {
    return await prisma.user.delete({
        where: { id },
    });
};

// GET ME
export const getMe = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            role: true,
            phone: true,
            isFrozen: true,
            createdAt: true,
        },
    });
};
