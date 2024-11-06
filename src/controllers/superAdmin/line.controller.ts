import { Request, Response } from 'express';
import { createLine, deleteLine, getAllLines, updateLine } from '../../models/superAdmin/line.model';

// CREATE A NEW LINE
const create = async (req: Request, res: Response) => {
    const newLine = await createLine(req.body);
    res.status(201).json(newLine);
};

// GET ALL LINES
const getAll = async (req: Request, res: Response) => {
    const lines = await getAllLines();
    res.status(200).json(lines);
}

// UPDATE A LINE
const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updatedLine = await updateLine(id, data);
    res.status(200).json(updatedLine);
}

// DELETE A LINE
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await deleteLine(id);
    res.status(204).end();
}

export default { create, getAll, update, deleteById };