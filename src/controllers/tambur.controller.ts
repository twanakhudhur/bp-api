import { Request, Response } from "express";
import { customError, existError, notFoundError } from "../utils/errorHelpers";
import { getPieceById, getPiecesByIds } from "../models/piece.model";
import { createTambur, updateTambur, getAllTamburs, getTamburById, deleteTambur, createMultipleTamburs } from "../models/tambur.model";
import { CreateTamburType, UpdateTamburType } from "../schemas/tambur.schema";

export type TambursWithDetails = {
    autoCode: string;
    pieceSeries: number;
    weight: number;
    thickness: number;
    width: number;
    pieceComment?: string;
    theoryLength?: number;
    actualLength?: number;
    pieceCreatedAt: Date;
    typeId: string;
    qualityId: string;
    madeInId: string;
    pieceCreatorId: string
    creatorId: string;

} & CreateTamburType

// Get all tamburs
const getAll = async (req: Request, res: Response) => {
    const page = parseInt(req.query._page as string) || 1;
    const pageSize = parseInt(req.query._pageSize as string) || 20;

    const sortField = req.query._sortField as string || 'createdAt';
    const sortOrder = (req.query._sortOrder as string === 'asc') ? 'asc' : 'desc';

    const searchValue = req.query._searchValue as string || "";

    const line = req.query._line as string || null;

    const date = req.query._date as string || null;

    const { tamburs, totalCount } = await getAllTamburs(
        page,
        pageSize,
        sortField,
        sortOrder,
        searchValue,
        date,
        line
    );

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
        pagination: {
            currentPage: page,
            pageSize,
            totalCount,
            totalPages,
        },
        tamburs,
    });
};

// CREATE A TAMBUR
const create = async (req: Request, res: Response) => {
    const data: CreateTamburType = req.body;
    const creatorId = req.user.id;
    const pieceId = req.params.pieceId;

    const existingPiece = await getPieceById(pieceId);
    if (!existingPiece) {
        return notFoundError(res, "piece", "Piece not found");
    }

    const newTambur = await createTambur(data, existingPiece, creatorId);
    res.status(201).json(newTambur);
};

// create multiple tamburs
const createMultiple = async (req: Request, res: Response) => {
    const creatorId = req.user.id;
    const data = req.body

    if (!data.pieceId.length) {
        return customError(res, 400, "rolls", "No rolls found in the request");
    }

    const piece = await getPiecesByIds(data.pieces);
    const tamburs = await Promise.all(data.pieces.map(async (pieceId: string) => {
        const existingPiece = piece.find((p) => p.id === pieceId);
        if (!existingPiece) {
            return notFoundError(res, "piece", "Piece not found");
        }
        const tamburData: TambursWithDetails = {
            autoCode: existingPiece.autoCode,
            pieceSeries: existingPiece.pieceSeries,
            weight: existingPiece.weight,
            thickness: existingPiece.thickness,
            width: existingPiece.width,
            pieceComment: existingPiece.comment,
            theoryLength: existingPiece.theoryLength,
            actualLength: existingPiece.actualLength,
            pieceCreatedAt: existingPiece.createdAt,
            typeId: existingPiece.typeId,
            qualityId: existingPiece.qualityId,
            madeInId: existingPiece.madeInId,
            creatorId,
            ...data
        }
        return tamburData
    }))
    const newTamburs = await createMultipleTamburs(tamburs);
    res.status(201).json(newTamburs);
};

// Update a tambur
const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: UpdateTamburType = req.body;

    const existingTambur = await getTamburById(id);
    if (!existingTambur) {
        return notFoundError(res, "tambur", "Tambur not found");
    }

    const updatedTambur = await updateTambur(id, data);
    res.json(updatedTambur);
};

// DELETE A TAMBUR
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const existingTambur = await getTamburById(id);
    if (!existingTambur) {
        return notFoundError(res, "tambur", "Tambur not found");
    }

    await deleteTambur(id, existingTambur);
    res.status(200).end();
};

export default { create, update, getAll, deleteById, createMultiple };