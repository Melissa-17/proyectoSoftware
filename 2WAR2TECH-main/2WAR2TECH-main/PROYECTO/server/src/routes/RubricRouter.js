import {  addCriteriaController, deleteCriteriasController, editCriteriaInformationController, 
    editRubricInformationController, getCriteriaInformationController, getRubricInformationController,
    listCriteriaController
} from "#Controllers/RubricController.js";
import { hasRole, SystemRoles } from "#Middleware/hasRole.js";
import { Router } from "express";

const rubricRouter = Router();

rubricRouter.get('/info/:rubricId/:assignmentId', hasRole([SystemRoles.All]), getRubricInformationController);
rubricRouter.patch('/info/:rubricId', hasRole([SystemRoles.All]), editRubricInformationController);
rubricRouter.get('/criteria-list/:rubricId', hasRole([SystemRoles.All]), listCriteriaController);
rubricRouter.post('/info', hasRole([SystemRoles.All]), addCriteriaController);
rubricRouter.delete('/info/:rubricId', hasRole([SystemRoles.All]), deleteCriteriasController);
rubricRouter.get('/info-criteria/:rubricId/:rubricCriteriaId', hasRole([SystemRoles.All]), getCriteriaInformationController);
rubricRouter.patch('/info/:rubricId/:rubricCriteriaId', hasRole([SystemRoles.All]), editCriteriaInformationController);

export default rubricRouter; 
