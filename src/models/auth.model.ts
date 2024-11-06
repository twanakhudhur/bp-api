import prisma from "../prismaClient";

export type User = {
    id: string;
    username: string;
    role: string;
    isFrozen?: boolean
    expiration?: Date
}

type UserWithPassword = User & { password: string };

export const getUser = async (username: string): Promise<UserWithPassword | null> => {
    return await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            password: true,
            role: true,
        }
    });
};


export const getUserById = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            role: true,
        }
    });
};