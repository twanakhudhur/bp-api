import { Request, Response } from "express";
import { customError, existError, notFoundError } from "../../utils/errorHelpers";
import { createUseSpare, deleteUsedSpare, getAllUsedSpare, getUsedSpareById, updateUsedSpare } from "../../models/superAdmin/useSpare.model";
import { addToSpare, getSpareById } from "../../models/superAdmin/spare.model";


// GET ALL USED SPARE
const getAll = async (req: Request, res: Response) => {
    const usedSpares = await getAllUsedSpare();
    res.status(200).json(usedSpares);
};

// CREATE USED SPARE
const create = async (req: Request, res: Response) => {
    const data = req.body;
    const spareId = req.params.spareId;
    const gaveBy = req.user.id;

    // getSpareById
    const spare = await getSpareById(spareId);
    if (!spare) {
        return notFoundError(res, "spare", "Spare not found");
    }

    // reduce rome the quantity of the spare
    const newQuantity = spare.quantity - data.quantity;
    if (newQuantity < 0) {
        return customError(res, 400, "quantity", `You Dont have enough spare (${spare.spareList.name})`);
    }

    // createUseSpare
    const usedSpare = await createUseSpare(data, spareId, gaveBy);
    res.status(201).json(usedSpare);
};

// UPDATE USED SPARE
const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    // get usedSpare
    const usedSpare = await getUsedSpareById(id);
    if (!usedSpare) {
        return notFoundError(res, "usedSpare", "Used Spare not found");
    }

    // i wanna check if i am adding or reducing the quantity
    const spare = await getSpareById(usedSpare.spareId);
    if (!spare) {
        return notFoundError(res, "spare", "Spare not found");
    }

    const newQuantity = spare.quantity + (usedSpare.quantity - data.quantity);
    if (newQuantity < 0) {
        return customError(res, 400, "quantity", `You don't have enough spare (${spare.spareList.name})`);
    }

    // updateUsedSpare
    const updatedUsedSpare = await updateUsedSpare(id, data);
    res.status(200).json(updatedUsedSpare);
}

// DELETE USED SPARE
const DeleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usedSpare = await getUsedSpareById(id);
    if (!usedSpare) {
        return notFoundError(res, "usedSpare", "Used Spare not found");
    }

    await addToSpare(usedSpare.spareId, usedSpare.quantity);

    // deleteUsedSpare
    await deleteUsedSpare(id);
    res.status(200).end();
}

export {
    getAll,
    create,
    update,
    DeleteById
};