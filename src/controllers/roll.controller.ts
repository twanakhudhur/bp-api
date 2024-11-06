import { Request, Response } from "express";
import { customError, existError, notFoundError } from "../utils/errorHelpers";
import { CreateRollType, CreateRollTypeWithCreator, UpdateRollType } from "../schemas/roll.schemas";
import { createRoll, deleteRoll, getRollById, getRollByRollCode, getAllRollThiknessesAndCount, updateRoll, getAllRolls, createManyRolls, getAllRollsDashboarad } from "../models/roll.model";
import { getSlitRollByRollCode } from "../models/slitRoll.model";

// GET ALL ROLLS
const getAll = async (req: Request, res: Response) => {


    const { rolls, totalCount } = await getAllRolls();



    res.status(200).json(rolls);
};

// GET ALL ROLL THICKNESSES AND COUNT
const allRollThiknessesAndCount = async (req: Request, res: Response) => {
    const thicknesses = await getAllRollThiknessesAndCount();
    res.status(200).json(thicknesses);
}

// CREATE A ROLL
const create = async (req: Request, res: Response) => {
    const data: CreateRollType = req.body;
    const creatorId = req.user.id;

    const existingRollCode = await getRollByRollCode(data.rollCode);
    if (existingRollCode) {
        return existError(res, "rollCode", "Roll code already exists");
    }
    const existingSlitRollCode = await getSlitRollByRollCode(data.rollCode);
    if (existingSlitRollCode) {
        return existError(res, "rollCode", "Roll code already exists in slit rolls");
    }


    const newRoll = await createRoll(data, creatorId);
    res.status(201).json(newRoll);

};

// CREATE MANY ROLLS
const createMany = async (req: Request, res: Response) => {
    const data: CreateRollTypeWithCreator = req.body;
    const creatorId = req.user.id;

    // Check if data is empty
    if (!data.length) {
        return customError(res, 400, "rolls", "No rolls found in the request");
    }

    const uniqueRollCodes = new Set(data.map(roll => roll.rollCode));
    if (uniqueRollCodes.size !== data.length) {
        return existError(res, "rollCode", "Duplicate roll codes found in the request");
    }

    const existingRollCodes = await Promise.all(
        data.map(async (roll) => {
            roll.creatorId = creatorId;
            const existingRollCode = await getRollByRollCode(roll.rollCode);
            return existingRollCode ? roll.rollCode : null;
        })
    );

    const duplicateRollCodes = existingRollCodes.filter((code) => code !== null);
    if (duplicateRollCodes.length > 0) {
        return existError(res, "rollCode", `Roll codes already exist: ${duplicateRollCodes.join(", ")}`);
    }

    const newRolls = await createManyRolls(data);
    res.status(201).json(newRolls);
};

// UPDATE A ROLL
const update = async (req: Request, res: Response) => {
    const data: UpdateRollType = req.body;
    const rollId = req.params.id;
    const existingRoll = await getRollById(rollId);
    if (!existingRoll) {
        return notFoundError(res, "roll", "Roll not found");
    }
    if (data.rollCode && data.rollCode !== existingRoll.rollCode) {
        const existingRollCode = await getRollByRollCode(data.rollCode);
        if (existingRollCode) {
            return existError(res, "rollCode", "Roll code already exists");
        }
    }
    const updatedRoll = await updateRoll(rollId, data);
    res.status(200).json(updatedRoll);
}

// DELETE A ROLL
const deleteById = async (req: Request, res: Response) => {
    const rollId = req.params.id;

    const existingRoll = await getRollById(rollId);
    if (!existingRoll) {
        return notFoundError(res, "roll", "Roll not found");
    }

    await deleteRoll(existingRoll.id);
    res.status(204).end();
}

// ROLLS GROUP
const rollGroupDashboard = async (req: Request, res: Response) => {
    const rolls = await getAllRollsDashboarad()
    res.status(200).json({
        rolls,
    });
}

export default { create, getAll, update, deleteById, allRollThiknessesAndCount, createMany, rollGroupDashboard };