import { Request, Response } from "express";
import { existError, notFoundError } from "../utils/errorHelpers";
import { createSoldWaste, createWaste, deleteSoldWaste, deleteWaste, getAllWastes, getSoldWasteById, getWasteById, updateWaste } from "../models/waste.model";
import { SellWasteType, CreateWasteType } from "../schemas/waste.schemas";



// CREATE A WASTE
const create = async (req: Request, res: Response) => {
    const data: CreateWasteType = req.body;
    const creatorId = req.user.id;

    const newWaste = await createWaste(data, creatorId);

    res.status(201).json(newWaste);
};

const getAll = async (req: Request, res: Response) => {
    const page = parseInt(req.query._page as string) || 1;
    const pageSize = parseInt(req.query._pageSize as string) || 25;

    const sortField = req.query._sortField as string || 'createdAt';
    const sortOrder = (req.query._sortOrder as string === 'asc') ? 'asc' : 'desc';

    const searchValue = req.query._searchValue as string || "";

    const date = req.query._date as string || null;

    const { wastes, totalCount } = await getAllWastes(
        page,
        pageSize,
        sortField,
        sortOrder,
        searchValue,
        date
    );

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
        pagination: {
            currentPage: page,
            pageSize,
            totalCount,
            totalPages,
        },
        wastes,
    });
};

// update a waste
const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: CreateWasteType = req.body;

    const existingWaste = await getWasteById(id);
    if (!existingWaste) {
        return notFoundError(res, "waste", "Waste not found");
    }

    if (existingWaste.slitRollId) {
        return existError(res, "waste", "Waste is associated with a slit roll");
    }

    const updatedWaste = await updateWaste(id, data);
    res.status(200).json(updatedWaste);

}

// DELETE A WASTE
const deteleById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const existingWaste = await getWasteById(id);
    if (!existingWaste) {
        return notFoundError(res, "waste", "Waste not found");
    }

    if (existingWaste.slitRollId) {
        return existError(res, "waste", "Waste is associated with a slit roll");
    }

    if (existingWaste.soldWasteId) {
        return existError(res, "waste", "Waste is sold");
    }

    await deleteWaste(id);
    res.status(200).end();
};

// SELLS WASTE
const sellWastes = async (req: Request, res: Response) => {
    const data: SellWasteType = req.body;
    const creatorId = req.user.id;


    const soldWaste = await createSoldWaste(res, data, creatorId);
    res.status(201).json(soldWaste);
}

// UNDO SELL WASTE
const undoSell = async (req: Request, res: Response) => {
    const id = req.params.id;

    const existingSoldWaste = await getSoldWasteById(id);
    if (!existingSoldWaste) {
        return notFoundError(res, "sold waste", "Sold waste not found");
    }

    await deleteSoldWaste(id);
    res.status(200).end();
}


export default { getAll, deteleById, create, update, sellWastes, undoSell };