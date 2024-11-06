import { Request, Response } from 'express';
import { createUser, deleteUser, getAllUsers, updateUser } from '../../models/superAdmin/user.model';
import bcrypt from 'bcrypt';
import { getUserById } from '../../models/auth.model';
import { notFoundError } from '../../utils/errorHelpers';
import { UserCreateType, UserUpdateType } from '../../schemas/superAdmin/user.schemas';

// GET ALL USERS
const getAll = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.status(200).json(
        users
    );
};

// CREATE A NEW USER
const create = async (req: Request, res: Response) => {
    const data: UserCreateType = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword
    const newRole = await createUser(data);
    res.status(201).json(
        {
            message: 'User created successfully',
            user: {
                id: newRole.id,
                username: newRole.username,
                role: newRole.role,
                phone: newRole.phone,
                isFrozen: newRole.isFrozen,
                createdAt: newRole.createdAt
            }
        }
    );
};

// UPDATE USER
const update = async (req: Request, res: Response) => {

    const userId = req.params.id;
    console.log(userId);
    const data: UserUpdateType = req.body;
    const existingUser = await getUserById(userId)
    if (!existingUser) {
        return notFoundError(res, "user", "User not found");
    }
    const user = await updateUser(userId, data);
    res.status(200).json({
        message: 'User updated successfully',
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
        }
    })
}

// DELETE USER
const deleteById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const existingUser = await getUserById(userId)
    if (!existingUser) {
        return notFoundError(res, "user", "User not found");
    }
    await deleteUser(userId);
    res.status(200).json({
        message: 'User deleted successfully',
        user: {
            id: existingUser.id,
            username: existingUser.username,
            role: existingUser.role,
        }
    })
}

// FREZE USER
const freezeUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const existingUser = await getUserById(userId)
    if (!existingUser) {
        return notFoundError(res, "user", "User not found");
    }
    const user = await updateUser(userId, { isFrozen: true });
    res.status(200).json({
        message: 'User frozen successfully',
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
        }
    })
}

// LOGOUT ANOTHER USER
const logoutUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const existingUser = await getUserById(userId)
    if (!existingUser) {
        return notFoundError(res, "user", "User not found");
    }
    const user = await updateUser(userId, { expiration: new Date() });
    res.status(200).json({
        message: 'User logged out successfully',
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
        }
    })
}

// GET ME
const getMe = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const user = await getUserById(userId);
    res.status(200).json(user)
}

export default { getAll, create, logoutUser, freezeUser, update, deleteById, getMe };