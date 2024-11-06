import { Router } from 'express';
import { validate } from '../../middlewares/validationMiddleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { userCreateSchema, userUpdateSchema } from '../../schemas/superAdmin/user.schemas';
import userController from '../../controllers/superAdmin/user.controller';
// import authorizeRoles from '../../middlewares/roleAuthorization';

const router = Router();

// router.post('/add', authorizeRoles('SuperAdmin'), validate(userCreateSchema), asyncHandler(userController.create));
router.get('/', asyncHandler(userController.getAll));
router.post('/add', validate(userCreateSchema), asyncHandler(userController.create));
router.patch('/update/:id', validate(userUpdateSchema), asyncHandler(userController.update));
router.patch('/freeze/:id', asyncHandler(userController.freezeUser));
router.patch('/logout/:id', asyncHandler(userController.logoutUser));
router.delete('/delete/:id', asyncHandler(userController.deleteById));
router.get('/me', asyncHandler(userController.getMe));

export default router;