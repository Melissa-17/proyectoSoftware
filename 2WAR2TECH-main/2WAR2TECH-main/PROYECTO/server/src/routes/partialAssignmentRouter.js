import { Router } from 'express';  
import { getListPartialAssignController, getDetailPartialAssignController, getListByUserIdPartialAssignController} from '#Controllers/PartialAssignmentController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const partialAssignmentRouter = Router();

partialAssignmentRouter.get('/partial-assignment/list/:cursoxsemesterid', hasRole([SystemRoles.All]),getListPartialAssignController);
partialAssignmentRouter.get('/partial-assignment/list-revisor/:uid/:cursoxsemesterid', hasRole([SystemRoles.All]),getListByUserIdPartialAssignController);
partialAssignmentRouter.get('/partial-assignment/detail/:axsid', hasRole([SystemRoles.All]),getDetailPartialAssignController);

export default partialAssignmentRouter;