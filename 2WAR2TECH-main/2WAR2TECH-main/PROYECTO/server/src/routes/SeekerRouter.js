import { Router} from 'express';

import "#Config/auth.js";
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'
import { searchByDifferentsRolsController, searchByFacEspRolController, searchBySpecialtyAndNameController, searchBySpecialtyAndRolAndCourseController, searchBySpecialtyAndRolController, searchByTypeAndNameAssignmentController } from '#Controllers/SeekerController.js';

const seekerRouter = Router();

seekerRouter.get('/search/list', hasRole([SystemRoles.All]), searchBySpecialtyAndNameController);
seekerRouter.get('/search/Alist', hasRole([SystemRoles.All]), searchBySpecialtyAndRolController);
seekerRouter.get('/search/list/:idCurso', hasRole([SystemRoles.All]), searchBySpecialtyAndRolAndCourseController);
seekerRouter.post('/search/list', hasRole([SystemRoles.All]), searchByDifferentsRolsController);
seekerRouter.get('/search/lista/evaluations/:idC/:idS', hasRole([SystemRoles.All]), searchByTypeAndNameAssignmentController);
seekerRouter.get('/search/listFER', hasRole([SystemRoles.All]), searchByFacEspRolController);

export default seekerRouter;