import { Router } from 'express'; 
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'
import {getListProgrammedExpositionController, insertProgrammedExposition,
    getDetailProgrammedExpositionController,editProgrammedExpoController,
    getListByUserIdProgrammedExpositionController} from '#Controllers/ProgrammedExpositionController.js';

const ProgrammedExpositionRouter = Router();


ProgrammedExpositionRouter.get("/programmedExposition/:cursoxsemesterid", hasRole([SystemRoles.All]), getListProgrammedExpositionController);
ProgrammedExpositionRouter.get("/programmedExposition-revisor/:uid/:cursoxsemesterid", hasRole([SystemRoles.All]), getListByUserIdProgrammedExpositionController);
ProgrammedExpositionRouter.post("/create-programmedExposition/:cursoxsemesterid/", hasRole([SystemRoles.All]), insertProgrammedExposition);
ProgrammedExpositionRouter.get("/detail-programmedExposition/:axsid", hasRole([SystemRoles.All]), getDetailProgrammedExpositionController);
ProgrammedExpositionRouter.patch("/edit-programmedExposition/:expoId", hasRole([SystemRoles.All]), editProgrammedExpoController);

export default ProgrammedExpositionRouter;