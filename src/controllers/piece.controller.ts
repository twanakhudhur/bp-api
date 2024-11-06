import { Request, Response } from "express";
import { existError, notFoundError } from "../utils/errorHelpers";
import { createPiece, deletePiece, getAllPieces, getAllPieceThiknessesAndCount, getPieceById, thinPiece, undoThinPiece, updatePiece } from "../models/piece.model";
import { CreatePieceType, ThinningType, UpdatePieceType } from "../schemas/piece.schemas";

// CREATE A PIECE
const create = async (req: Request, res: Response) => {
    const data: CreatePieceType = req.body;
    const creatorId = req.user.id;

    const newPiece = await createPiece(data, creatorId);
    res.status(201).json(newPiece);
};

// GET ALL PIECES
const getAll = async (req: Request, res: Response) => {
    // const page = parseInt(req.query._page as string) || 1;
    // const pageSize = parseInt(req.query._pageSize as string) || 25;

    // const sortField = req.query._sortField as string || 'createdAt';
    // const sortOrder = (req.query._sortOrder as string === 'asc') ? 'asc' : 'desc';

    // const searchValue = req.query._searchValue as string || "";

    // const date = req.query._date as string || null;

    // const thickness = parseInt(req.query._thickness as string) || null;

    // const { pieces, totalCount } = await getAllPieces(
    // page,
    // pageSize,
    // sortField,
    // sortOrder,
    // searchValue,
    // date,
    // thickness
    // );

    const piece = await getAllPieces();

    // const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json(piece
        //     {
        //     pagination: {
        //         currentPage: page,
        //         pageSize,
        //         totalCount,
        //         totalPages,
        //     },
        //     pieces,
        // }
    );
};

// GET ALL PIECE THICKNESSES AND COUNT
const allPieceThiknessesAndCount = async (req: Request, res: Response) => {
    const thicknesses = await getAllPieceThiknessesAndCount();
    res.status(200).json(thicknesses);
}

// UPDATE A PIECE
const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: UpdatePieceType = req.body;

    const existingPiece = await getPieceById(id);
    if (!existingPiece) {
        return notFoundError(res, "piece", "Piece not found");
    }

    if (existingPiece.slitRollId) {
        return existError(res, "piece", "Piece is associated with a slit roll");
    }

    const updatedPiece = await updatePiece(id, data);
    res.status(200).json(updatedPiece);
}

// DELETE A PIECE
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const existingPiece = await getPieceById(id);
    if (!existingPiece) {
        return notFoundError(res, "piece", "Piece not found");
    }

    if (existingPiece.slitRollId) {
        return existError(res, "piece", "Piece is associated with a slit roll");
    }

    await deletePiece(id);
    res.status(200).end();
};

// THIN A PIECE
const thin = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: ThinningType = req.body;

    const existingPiece = await getPieceById(id);
    if (!existingPiece) {
        return notFoundError(res, "piece", "Piece not found");
    }

    const thinnedPiece = await thinPiece(id, data);
    res.status(200).json(thinnedPiece);
};

// UNDO THIN A PIECE
const undoThin = async (req: Request, res: Response) => {
    const id = req.params.id;

    const existingPiece = await getPieceById(id);
    if (!existingPiece) {
        return notFoundError(res, "piece", "Piece not found");
    }

    const unthinnedPiece = await undoThinPiece(id);
    res.status(200).json(unthinnedPiece);
}

export default { getAll, deleteById, create, update, thin, undoThin, allPieceThiknessesAndCount };