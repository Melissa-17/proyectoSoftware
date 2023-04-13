import {  Router } from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

import "#Config/auth.js";
import { getDetailAdvanceController, getListAdvanceController, getListByUserIdAdvanceController } from '#Controllers/AdvanceController.js';

const advanceRouter = Router();

advanceRouter.get('/advance/list/:cursoxsemesterid', hasRole([SystemRoles.All]), getListAdvanceController);
advanceRouter.get('/advance/list-revisor/:uid/:cursoxsemesterid', hasRole([SystemRoles.All]),getListByUserIdAdvanceController);
advanceRouter.get('/advance/detail/:axsid', hasRole([SystemRoles.All]), getDetailAdvanceController);


export default advanceRouter;