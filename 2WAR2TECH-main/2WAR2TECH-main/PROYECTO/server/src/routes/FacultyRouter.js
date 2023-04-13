import { Router } from 'express';

import "#Config/auth.js";
import { getFacultiesController, getPaginationFacultiesController, getFacultyDetails,
         patchModifyFaculty, getFacultySpecialty, deleteFaculty,
         postFaculty, patchFaculty } from '#Controllers/FacultyController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const facultyRouter = Router();

facultyRouter.get('/faculties', hasRole([SystemRoles.All]), getFacultiesController);
facultyRouter.get('/faculties/list', hasRole([SystemRoles.All]), getPaginationFacultiesController);
facultyRouter.get('/faculties/detail/:idF', hasRole([SystemRoles.All]), getFacultyDetails);
facultyRouter.patch('/faculties/modify', hasRole([SystemRoles.All]), patchModifyFaculty);
facultyRouter.delete('/faculties/delete', hasRole([SystemRoles.All]), deleteFaculty);
facultyRouter.post('/faculties/post', hasRole([SystemRoles.All]), postFaculty);
facultyRouter.patch('/faculties/patch', hasRole([SystemRoles.All]), patchFaculty);
facultyRouter.get('/faculties/specialties', hasRole([SystemRoles.All]), getFacultySpecialty);

export default facultyRouter;