import { Router } from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'


import "#Config/auth.js";
import { getListRoleController, RoletoJuryController } from '#Controllers/RoleController.js';

const roleRouter = Router();

roleRouter.get('/roles/list', hasRole([SystemRoles.All]), getListRoleController);
roleRouter.patch('/jury/new/:idUser/:idCxS', hasRole([SystemRoles.All]), RoletoJuryController);

export default roleRouter; 