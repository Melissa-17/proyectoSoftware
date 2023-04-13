
import { hasRole, SystemRoles } from "#Middleware/hasRole.js";
import { Router } from 'express'; 
import {addCriteriaLevelController, getCriteriaLevelController,
    editCriteriaLevelController, deleteCriteriaLevelsController,
    getAllLevelCriteriaController } from '#Controllers/RubricCriteriaController.js'

const rubricCriteriaRouter = Router();


rubricCriteriaRouter.post('/rubric/criteria/newLevel', hasRole([SystemRoles.All]), addCriteriaLevelController);
rubricCriteriaRouter.get('/rubric/criteria/level/:levelCriteriaId', hasRole([SystemRoles.All]), getCriteriaLevelController);
rubricCriteriaRouter.patch('/rubric/criteria/level_edit/:levelCriteriaId', hasRole([SystemRoles.All]), editCriteriaLevelController);
rubricCriteriaRouter.delete('/rubric/criteria/level_delete/:rubricCriteriaId', hasRole([SystemRoles.All]), deleteCriteriaLevelsController);
rubricCriteriaRouter.get('/rubric/criteria/level_all/:rubricCriteriaId', hasRole([SystemRoles.All]), getAllLevelCriteriaController);

export default rubricCriteriaRouter;