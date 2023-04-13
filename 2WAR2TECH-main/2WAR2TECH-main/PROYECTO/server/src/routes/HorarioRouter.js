import { Router} from 'express';

import "#Config/auth.js";
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'
import { addHorarioController, copyHorarioController, deleteHorarioController, deleteProfessorController, editHorarioController, getDetailHorarioController, getHorarioController, getHorariosProfessorController, getProfessorsController } from '#Controllers/HorarioController.js';

const horarioRouter = Router();

horarioRouter.get('/schedule/list/:semesterId/:courseId',hasRole([SystemRoles.All]), getHorarioController);
horarioRouter.get('/schedule/detail/:idHorario',hasRole([SystemRoles.All]), getDetailHorarioController);
horarioRouter.post('/schedule',hasRole([SystemRoles.All]), addHorarioController);
horarioRouter.post('/schedule/copy',hasRole([SystemRoles.All]), copyHorarioController);
horarioRouter.patch('/schedule',hasRole([SystemRoles.All]), editHorarioController);
horarioRouter.delete('/schedule/:idHorario',hasRole([SystemRoles.All]), deleteHorarioController);
horarioRouter.get('/professors/list',hasRole([SystemRoles.All]), getProfessorsController);
horarioRouter.delete('/professors/:idProf',hasRole([SystemRoles.All]), deleteProfessorController);
horarioRouter.get('/schedule/professor/:semesterId/:courseId/:idProf',hasRole([SystemRoles.All]), getHorariosProfessorController);

export default horarioRouter;