import { Router } from 'express';
import { getListFinalAssignController, getDetailFinalAssignController, getListByUserIdFinalAssignController} from '#Controllers/FinalAssignmentController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'
import "#Config/auth.js";

const finalAssignmentRouter = Router();

finalAssignmentRouter.get('/final-assignment/list/:cursoxsemesterid', hasRole([SystemRoles.All]),getListFinalAssignController);
finalAssignmentRouter.get('/final-assignment/list-revisor/:uid/:cursoxsemesterid', hasRole([SystemRoles.All]),getListByUserIdFinalAssignController);
finalAssignmentRouter.get('/final-assignment/detail/:axsid', hasRole([SystemRoles.All]),getDetailFinalAssignController);

export default finalAssignmentRouter; 