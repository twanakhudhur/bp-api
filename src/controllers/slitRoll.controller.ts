import { Request, Response } from "express";
import { customError, existError, notFoundError } from "../utils/errorHelpers";
import { getRollById } from "../models/roll.model";
import {
    createSlitRollWithPieces,
    deleteSlitRoll,
    getAllSlitRolls,
    getSlitRollById,
    getAllSlitRollThiknessesAndCount,
    updateSlitRoll,
} from "../models/slitRoll.model";
import { CreateSlitRollType, UpdateSlitRollType } from "../schemas/slitRoll.schemas";

// CREATE A SLIT ROLL
const create = async (req: Request, res: Response) => {
    const data: CreateSlitRollType = req.body;
    const creatorId = req.user.id;
    const rollId = req.params.rollId;

    const existingRoll = await getRollById(rollId);
    if (!existingRoll) {
        return notFoundError(res, "roll", "Roll not found");
    }

    const slitRoll = await createSlitRollWithPieces(
        data,
        existingRoll,
        creatorId,
        rollId,
    );
    res.status(201).json(slitRoll);
};

// get all slit rolls
const getAll = async (req: Request, res: Response) => {
    const page = parseInt(req.query._page as string) || 1;
    const pageSize = parseInt(req.query._pageSize as string) || 25;

    const sortOrder = (req.query._sortOrder as string === 'asc') ? 'asc' : 'desc';

    const searchValue = req.query._searchValue as string || "";

    const date = req.query._date as string || null;

    const thickness = parseInt(req.query._thickness as string) || null;

    const { slitRolls, totalCount } = await getAllSlitRolls(
        page,
        pageSize,
        sortOrder,
        searchValue,
        date,
        thickness
    );

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
        pagination: {
            currentPage: page,
            pageSize,
            totalCount,
            totalPages,
        },
        slitRolls,
    });
};

// GET ALL SLITROLL THICKNESSES AND COUNT
const allSlitRollThiknessesAndCount = async (req: Request, res: Response) => {
    // getUnslitRollThicknessCounts
    const thicknesses = await getAllSlitRollThiknessesAndCount();
    res.status(200).json(thicknesses);
}

// update slit roll
const update = async (req: Request, res: Response) => {
    const data: UpdateSlitRollType = req.body;
    const slitRollId = req.params.id;

    const existingSlitRoll = await getSlitRollById(slitRollId);
    if (!existingSlitRoll) {
        return notFoundError(res, "slitRoll", "Slit roll not found");
    }

    const updatedSlitRoll = await updateSlitRoll(slitRollId, data, existingSlitRoll);
    res.status(200).json(updatedSlitRoll);
};

// delete a slit roll
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;

    // check if the slit roll exists
    const existingSlitRoll = await getSlitRollById(id);
    if (!existingSlitRoll) {
        return notFoundError(res, "slitRoll", "Slit roll not found");
    }


    // check if the slit roll has tamburs
    if (existingSlitRoll.tambur[0]) {
        return customError(res, 400, "slitRoll", "This slit roll has tamburs, cannot delete");
    }

    // Check if the wastes have wasteSoldId
    for (const waste of existingSlitRoll.wastes) {
        if (waste.soldWasteId) {
            return customError(res, 400, "slitRoll", "This slit roll has wastes sold, cannot delete");
        }
    }
    const roll = await deleteSlitRoll(id, existingSlitRoll);
    res.status(204).end(roll);
};

export default { create, getAll, update, deleteById, allSlitRollThiknessesAndCount };
