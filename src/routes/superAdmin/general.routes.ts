import { Router } from 'express';
import countryController from '../../controllers/superAdmin/country.controller';
import { validate } from '../../middlewares/validationMiddleware';
import { countryCreateSchema, lineCreateSchema, rollQualityCreateSchema, rollTypeCreateSchema, spareCreateSchema, spareListCreateSchema } from '../../schemas/superAdmin/general.schemas';
import { asyncHandler } from '../../utils/asyncHandler';
import authorizeRoles from '../../middlewares/roleAuthorization';
import rolltypeController from '../../controllers/superAdmin/rolltype.controller';
import rollQualityController from '../../controllers/superAdmin/rollQuality.controller';
import lineController from '../../controllers/superAdmin/line.controller';
import spareListController from '../../controllers/superAdmin/spareList.controller';
import spareController from '../../controllers/superAdmin/spare.controller';

// authorizeRoles('SuperAdmin', "Admin")
const router = Router();
// COUNTRY ROUTES
router.get('/countries', asyncHandler(countryController.getAll));
router.post('/country/add', validate(countryCreateSchema), asyncHandler(countryController.create));
router.delete('/country/delete/:id', asyncHandler(countryController.deleteById));


// ROLLTYPE ROUTES
router.get('/rolltypes', asyncHandler(rolltypeController.getAll));
router.post('/rolltype/add', validate(rollTypeCreateSchema), asyncHandler(rolltypeController.create));
router.delete('/rolltype/delete/:id', asyncHandler(rolltypeController.deleteById));

// ROLLqUALITY ROUTES
router.get('/rollqualities', asyncHandler(rollQualityController.getAll));
router.post('/rollquality/add', validate(rollQualityCreateSchema), asyncHandler(rollQualityController.create));
router.delete('/rollquality/delete/:id', asyncHandler(rollQualityController.deleteById));

// LINE ROUTES
router.get('/lines', asyncHandler(lineController.getAll));
router.post('/line/add', validate(lineCreateSchema), asyncHandler(lineController.create));
router.delete('/line/delete/:id', asyncHandler(lineController.deleteById));

// SPARELIST ROUTES
router.get('/sparelists', asyncHandler(spareListController.getAll));
router.post('/sparelist/add', validate(spareListCreateSchema), asyncHandler(spareListController.create));


// SPARE ROUTES
router.get('/spares', asyncHandler(spareController.getAll));
router.post('/spare/add', validate(spareCreateSchema), asyncHandler(spareController.create));


export default router;