import { Router } from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

import "#Config/auth.js";
import { getAllCalReportUserController, getReportController, getReportUserController } from '#Controllers/reportesController.js';

const reportRouter = Router();

reportRouter.get('/report/califications/:idCxS', hasRole([SystemRoles.All]), getReportController);
reportRouter.get('/report/califications/:idCxS/:idUser', hasRole([SystemRoles.All]), getReportUserController);
reportRouter.get('/report/allCalifications/:idCxS/:idUser', hasRole([SystemRoles.All]), getAllCalReportUserController);

export default reportRouter; 