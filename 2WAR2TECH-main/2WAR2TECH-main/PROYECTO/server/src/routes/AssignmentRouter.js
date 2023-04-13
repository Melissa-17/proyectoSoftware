import {  Router } from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

import "#Config/auth.js";
import { getListAssignmentController } from '#Controllers/AssignmentController.js';

const advanceRouter = Router();

advanceRouter.get('/assignment/list/:type/:cursoxsemesterid', hasRole([SystemRoles.All]), getListAssignmentController);