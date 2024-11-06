import { Request, Response } from 'express';
import { createRollType, deleteRollType, getAllRollTypes, updateRollType } from '../../models/superAdmin/rollType.model';

// CREATE A NEW ROLL TYPE
const create = async (req: Request, res: Response) => {
    const newRollType = await createRollType(req.body);
    res.status(201).json(newRollType);
};

// GET ALL ROLL TYPES
const getAll = async (req: Request, res: Response) => {
    const rollTypes = await getAllRollTypes();
    res.status(200).json(rollTypes);
}

// UPDATE A ROLL TYPE
const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updatedRollType = await updateRollType(id, data);
    res.status(200).json(updatedRollType);
}

// DELETE A ROLL TYPE
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await deleteRollType(id);
    res.status(204).end();
}

export default { create, getAll, update, deleteById };