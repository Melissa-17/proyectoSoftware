import { Router } from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

import "#Config/auth.js";
import { addSemesterController, deleteSemesterController, editSemesterController,
     getListSemesterByUserIdController, getListAllSemesters, getSemesterDetail, getListAllSemestersPagination } from '#Controllers/semesterController.js';

const semesterRouter = Router();

semesterRouter.get('/semesterList', hasRole([SystemRoles.All]),getListSemesterByUserIdController);
semesterRouter.post('/semester/:specialtyId', hasRole([SystemRoles.All]),addSemesterController);
semesterRouter.patch('/semester/:specialtyId', hasRole([SystemRoles.All]),editSemesterController);
semesterRouter.delete('/semester/delete',hasRole([SystemRoles.All]), deleteSemesterController);
semesterRouter.get('/semester/list-all', hasRole([SystemRoles.All]),getListAllSemesters);
semesterRouter.get('/semester/list-detail/:idS', hasRole([SystemRoles.All]),getSemesterDetail);
semesterRouter.get('/semester/list-pagination', hasRole([SystemRoles.All]),getListAllSemestersPagination);

export default semesterRouter; 