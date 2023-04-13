import { Router } from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'
import { addAssignmentCalificationController, addCalificationsCriteriaController,
         editDescriptionCalificationController, editWeightEvaluationController,
         getCalificationDetailController, getCalificationsCriteriaController,
         deleteCalificationsCriteriaController, deleteEvaluationController,
         addEvaluationController } from '#Controllers/CalificationController.js';

const CalificationRouter = Router();

CalificationRouter.get('/calification/detail/:idCalification', hasRole([SystemRoles.All]), getCalificationDetailController);
CalificationRouter.post('/calification/detail/:idCalification', hasRole([SystemRoles.All]), addAssignmentCalificationController);
CalificationRouter.patch('/calification/detail/:idCalification', hasRole([SystemRoles.All]), editDescriptionCalificationController);
CalificationRouter.get('/calification/:idCurso/:idSemester', hasRole([SystemRoles.All]), getCalificationsCriteriaController);
CalificationRouter.post('/calification/:idCurso/:idSemester', hasRole([SystemRoles.All]), addCalificationsCriteriaController);
CalificationRouter.delete('/calification/:idCalification', hasRole([SystemRoles.All]), deleteCalificationsCriteriaController);
CalificationRouter.patch('/calification/detail/evaluation/:idCalificationXAssignment', hasRole([SystemRoles.All]), editWeightEvaluationController);
CalificationRouter.delete('/evaluation/delete', hasRole([SystemRoles.All]), deleteEvaluationController);
CalificationRouter.post('/evaluation/post', hasRole([SystemRoles.All]), addEvaluationController);

export default CalificationRouter;