import { Request, Response } from 'express';
import { createRollQuality, deleteRollQuality, getAllRollQualities, updateRollQuality } from '../../models/superAdmin/rollQuality.model';

//  CREATE A NEW ROLL QUALITY
const create = async (req: Request, res: Response) => {
    const newRollQuality = await createRollQuality(req.body);
    res.status(201).json(newRollQuality);
};

// GET ALL ROLL QUALITIES
const getAll = async (req: Request, res: Response) => {
    const rollQualities = await getAllRollQualities();
    res.status(200).json(rollQualities);
}

// UPDATE A ROLL QUALITY
const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updatedRollQuality = await updateRollQuality(id, data);
    res.status(200).json(updatedRollQuality);
}

// DELETE A ROLL QUALITY
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await deleteRollQuality(id);
    res.status(204).end();
}

export default { create, getAll, update, deleteById };