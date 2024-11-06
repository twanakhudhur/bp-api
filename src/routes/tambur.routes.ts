import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validationMiddleware";
import tamburController from "../controllers/tambur.controller";
import { multipleTamburSchema, createTamburSchema, updateTamburSchema } from "../schemas/tambur.schema";

const router = Router();

router.get("/", asyncHandler(tamburController.getAll));
router.post("/add/:pieceId", validate(createTamburSchema), asyncHandler(tamburController.create));
router.patch("/update/:id", validate(updateTamburSchema), asyncHandler(tamburController.update));
router.delete("/:id", asyncHandler(tamburController.deleteById));

router.post("/addMultiple/:pieceId", validate(multipleTamburSchema), asyncHandler(tamburController.createMultiple));



export default router;