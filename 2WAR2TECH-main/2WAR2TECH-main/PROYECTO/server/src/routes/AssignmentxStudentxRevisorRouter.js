import { Router } from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

import "#Config/auth.js";
import { getDetailAssignmentxStudentxRevisor, getThesisGroupByAsesor, listAssignmentXStudentXRevisor } from '#Controllers/AssignmentxStudentxRevisorController.js'
import { getAssignmentScoreDetailController, getAssignmentStudentStatus } from '#Controllers/AssignmentxStudentxRevisorController.js'
import { getAssignmentStudentRevisor, getAssignmentByCourseSemesterType, deleteAssignment,
         getDetailAssignment, insertAssignment, changeAssignmentXStudentStatus,
         getAssignmentRevisors, patchAssignment } from '#Controllers/AssignmentxStudentxRevisorController.js'

const assigmentxStudentxRevisorRouter = Router();

assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/rubric/:assignmentStudentId/:revisorId',hasRole([SystemRoles.All]), getDetailAssignmentxStudentxRevisor);
assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/rubric/detail/:axsid/:axsxrid', hasRole([SystemRoles.All]), getAssignmentScoreDetailController);
assigmentxStudentxRevisorRouter.patch('/Assigment-Student-Revisor/students/list', hasRole([SystemRoles.All]), listAssignmentXStudentXRevisor);
assigmentxStudentxRevisorRouter.patch('/Assigment-Student-Revisor/students/groupList', hasRole([SystemRoles.All]), getThesisGroupByAsesor);
assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/list/:axsid', hasRole([SystemRoles.All]), getAssignmentStudentRevisor);
assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/status/:axsid', hasRole([SystemRoles.All]), getAssignmentStudentStatus);
assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/list-course/:type/:idCXS', hasRole([SystemRoles.All]), getAssignmentByCourseSemesterType);
assigmentxStudentxRevisorRouter.delete('/Assigment-Student-Revisor/delete-a', hasRole([SystemRoles.All]), deleteAssignment);
assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/detail-a/:idAssignment', hasRole([SystemRoles.All]), getDetailAssignment);
assigmentxStudentxRevisorRouter.post('/Assigment-Student-Revisor/insert-a', hasRole([SystemRoles.All]), insertAssignment);
assigmentxStudentxRevisorRouter.patch('/Assigment-Student-Revisor/status/change', hasRole([SystemRoles.All]), changeAssignmentXStudentStatus);
assigmentxStudentxRevisorRouter.get('/Assigment-Student-Revisor/list-revisors/:idAXS', hasRole([SystemRoles.All]), getAssignmentRevisors);
assigmentxStudentxRevisorRouter.patch('/Assigment-Student-Revisor/modify-a', hasRole([SystemRoles.All]), patchAssignment);

export default assigmentxStudentxRevisorRouter;