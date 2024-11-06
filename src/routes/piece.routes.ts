import { Router } from "express";
import { validate } from "../middlewares/validationMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import pieceController from "../controllers/piece.controller";
import { createPieceSchema, thinningSchema, updatePieceSchema } from "../schemas/piece.schemas";

const router = Router();

router.get("/", asyncHandler(pieceController.getAll));
router.post("/add", validate(createPieceSchema), asyncHandler(pieceController.create));
router.patch("/update/:id", validate(updatePieceSchema), asyncHandler(pieceController.update));
router.delete("/:id", asyncHandler(pieceController.deleteById));

// GET ALL DIFFERENT THICKNESSES
router.get(
    "/thicknesses",
    asyncHandler(pieceController.allPieceThiknessesAndCount)
);

// Thinning Routes
router.patch("/:id/thin", validate(thinningSchema), asyncHandler(pieceController.thin));
router.patch("/:id/undo-thin", asyncHandler(pieceController.undoThin));


export default router;