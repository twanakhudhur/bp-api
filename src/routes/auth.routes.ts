import { Router } from 'express';
import { validate } from '../middlewares/validationMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { loginSchema } from '../schemas/auth.schemas';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', validate(loginSchema), asyncHandler(authController.login));
router.post('/logout', asyncHandler(authController.logout));

export default router;