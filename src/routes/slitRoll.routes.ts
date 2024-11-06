import { Router } from "express";
import { validate } from "../middlewares/validationMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import { createSlitRollSchema, updateSlitRollSchema } from "../schemas/slitRoll.schemas";
import slitRollController from "../controllers/slitRoll.controller";

const router = Router();

router.get("/", asyncHandler(slitRollController.getAll));
router.post("/add/:rollId", validate(createSlitRollSchema), asyncHandler(slitRollController.create));
router.patch("/update/:id", validate(updateSlitRollSchema), asyncHandler(slitRollController.update));
router.delete("/:id", asyncHandler(slitRollController.deleteById));
// GET ALL DIFFERENT THICKNESSES
router.get(
    "/all-diff-thicknesses",
    asyncHandler(slitRollController.allSlitRollThiknessesAndCount)
);


export default router;
