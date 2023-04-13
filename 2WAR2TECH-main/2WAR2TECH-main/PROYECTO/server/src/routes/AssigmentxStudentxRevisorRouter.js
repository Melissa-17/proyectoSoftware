import { Router } from 'express';

import "#Config/auth.js";
import { getDetailAssigmentxStudentxRevisor } from '#Controllers/AssigmentxStudentxRevisorController.js'

const assigmentxStudentxRevisorRouter = Router();

assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/rubric/:assignmentStudentId/:revisorId', getDetailAssigmentxStudentxRevisor);


export default assigmentxStudentxRevisorRouter;