import {  Router } from 'express';

import "#Config/auth.js";
import { editQualifyAssignmentScoreController, getAssignmentScoreDetailController } from '#Controllers/assignmentScoreController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const assignmentScoreRouter = Router();

assignmentScoreRouter.patch('/qualify/:assignmentStudentRevisorid/:assignmentStudentid', hasRole([SystemRoles.All]),editQualifyAssignmentScoreController);
assignmentScoreRouter.get('/qualify/detail/:axsxrid/:axsid',hasRole([SystemRoles.All]), getAssignmentScoreDetailController);

export default assignmentScoreRouter;