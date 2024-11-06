import { Router } from "express";
import { validate } from "../middlewares/validationMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import rollController from "../controllers/roll.controller";
import { createManyRollSchema, createRollSchema, updateRollSchema } from "../schemas/roll.schemas";

const router = Router();

router.get("/", asyncHandler(rollController.getAll));
router.post("/add", validate(createRollSchema), asyncHandler(rollController.create));
router.patch(
    "/update/:id",
    validate(updateRollSchema),
    asyncHandler(rollController.update)
);
router.delete("/:id", asyncHandler(rollController.deleteById));

// GET ALL DIFFERENT THICKNESSES
router.get(
    "/thicknesses",
    asyncHandler(rollController.allRollThiknessesAndCount)
);

// CREATE MANY ROLLS
router.post(
    "/add-many",
    validate(createManyRollSchema),
    asyncHandler(rollController.createMany)
);

// GET ALL ROLLS FOR DASHBOARD
router.get(
    "/dashboard",
    asyncHandler(rollController.rollGroupDashboard)
);

export default router;