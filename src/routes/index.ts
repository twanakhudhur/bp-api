import { Router } from 'express';

import userRoutes from './superAdmin/user.route';
import authRoutes from './auth.routes';
import generalRoutes from './superAdmin/general.routes';
import authenticateToken from '../middlewares/authenticate';
import rollRoutes from './roll.routes';
import slitRollRoutes from './slitRoll.routes';
import pieceRoutes from './piece.routes';
import wasteRoutes from './waste.routes';
import tamburRoutes from './tambur.routes';

const router = Router();

router.use('/auth', authRoutes);



router.use(authenticateToken)
router.use('/users', userRoutes);
router.use(generalRoutes);

router.use("/rolls", rollRoutes)
router.use("/slitRolls", slitRollRoutes)
router.use("/pieces", pieceRoutes);
router.use("/wastes", wasteRoutes);
router.use("/tamburs", tamburRoutes);


export default router;
