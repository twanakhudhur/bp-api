import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import wasteController from "../controllers/waste.controller";
import { validate } from "../middlewares/validationMiddleware";
import { sellWasteSchema, updateWasteSchema, createWasteSchema } from "../schemas/waste.schemas";

const router = Router();

router.get("/", asyncHandler(wasteController.getAll));
router.post("/add", validate(createWasteSchema), asyncHandler(wasteController.create));
router.patch("/update/:id", validate(updateWasteSchema), asyncHandler(wasteController.update));
router.delete("/:id", asyncHandler(wasteController.deteleById));
router.post("/sell", validate(sellWasteSchema), asyncHandler(wasteController.sellWastes));
router.delete("/undosell/:id", asyncHandler(wasteController.undoSell));


export default router;