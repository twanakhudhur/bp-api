import { Request, Response } from 'express';
import { addToSpare, createNewSpare, deleteSpareById, getAllSpares, getSpareById, getSpareByListId } from '../../models/superAdmin/spare.model';
import { notFoundError } from '../../utils/errorHelpers';

// CREATE SPARE
const create = async (req: Request, res: Response) => {
    const data = req.body

    const existingSpare = await getSpareByListId(data.spareListId)
    if (existingSpare) {
        const description = `${existingSpare.description}. ${data.description}`
        const addedToSpare = await addToSpare(data.spareListId, data.quantity, description)
        res.status(201).json(addedToSpare);
    }

    const newSpare = await createNewSpare(data);
    res.status(201).json(newSpare);
};

// GET ALL SPARES
const getAll = async (req: Request, res: Response) => {
    const spares = await getAllSpares();
    res.status(200).json(spares);
}

// DELETE SPARE
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const spare = await getSpareById(id);

    if (!spare) {
        notFoundError(res, "spare", 'Spare not found');
    }

    const deletedSpare = await deleteSpareById(id);
    res.status(200).json(deletedSpare);
}




export default { create, getAll, deleteById };