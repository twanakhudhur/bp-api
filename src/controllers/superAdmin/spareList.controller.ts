import { Request, Response } from 'express';
import { createSpareList, deleteSpareList, getAllSparelists, getSpareListById, updateSpareList } from '../../models/superAdmin/spareList.model';
import { customError, notFoundError } from '../../utils/errorHelpers';

// CREATE SPARE LIST
const create = async (req: Request, res: Response) => {
    const newSpareList = await createSpareList(req.body);
    res.status(201).json(newSpareList);
};

// GET ALL SPARE LISTS
const getAll = async (req: Request, res: Response) => {
    const spareLists = await getAllSparelists();
    res.status(200).json(spareLists);
}

// UPDATE SPARE LIST
const update = async (req: Request, res: Response) => {
    const data = req.body;
    const id = req.params.id;

    const existingSpare = await getSpareListById(id);
    if (!existingSpare) {
        return notFoundError(res, "spare", "Spare not found");
    }

    const updatedSpareList = await updateSpareList(id, data);
    res.status(200).json(updatedSpareList);
}

// DELETE SPARE LIST
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const existingSpare = await getSpareListById(id);
    if (!existingSpare) {
        return notFoundError(res, "spare", "Spare not found");
    }

    if (existingSpare.spares.length > 0) {
        return customError(res, 400, "spare", "Spare list has spares, cannot delete");
    }

    const deletedSpareList = await deleteSpareList(id);
    res.status(200).json(deletedSpareList);
}



export default { create, getAll, update, deleteById };