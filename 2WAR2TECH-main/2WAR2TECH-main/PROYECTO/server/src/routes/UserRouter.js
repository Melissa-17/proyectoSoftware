import { Router } from 'express';
import { getUserController, getAsesorByStudentController, getRegisteredStudentController,
         getRegisteredAsesorsController, getStudentsAsesorsController, deleteUserController,postTeamController,
         getFreeUsersController, postImportStudentsController, postGenericUserController, EditStudentController,
         AddTeacherScheduleController, DeleteTeacherScheduleController, getListStudentsController, postSetAssignments,
         getUsersNoThesisController, getListAsesorsBySpecialty,deleteJuryRoleController, getSchedulesUserController, getListJurys, deleteJuryController,
         EditEmailController, EditPasswordController, patchUserPhoto } 

from '#Controllers/UserController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const userRouter = Router();

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.get('/user', hasRole([SystemRoles.All]),getUserController);
userRouter.get('/user/asesor/:idUser/:cursoxsemesterid', hasRole([SystemRoles.All]), getAsesorByStudentController);
// userRouter.get('/students-management/:CourseXSemesterId', hasRole([SystemRoles.All]), getRegisteredStudentController);
userRouter.get('/students-management/:CourseXSemesterId', hasRole([SystemRoles.All]), getListStudentsController);
userRouter.get('/asesors-management/:cursoxsemesterid', hasRole([SystemRoles.All]), getRegisteredAsesorsController);
userRouter.get('/management/asesor/students/:asesorId', hasRole([SystemRoles.All]), getStudentsAsesorsController);
userRouter.delete('/users-management/delete/:idCxS',hasRole([SystemRoles.All]), deleteUserController);
userRouter.post('/team/users',hasRole([SystemRoles.All]), postTeamController);
userRouter.get('/users/free', hasRole([SystemRoles.All]), getFreeUsersController);
userRouter.get('/users/free-thesis', hasRole([SystemRoles.All]), getUsersNoThesisController);
userRouter.post('/users/import', upload.array('files', 1), hasRole([SystemRoles.All]), postImportStudentsController);
userRouter.post('/users/set-assignments', hasRole([SystemRoles.All]), postSetAssignments);
userRouter.post('/users/new-coord', hasRole([SystemRoles.All]), postGenericUserController);
userRouter.patch('/users-management/edit', hasRole([SystemRoles.All]), EditStudentController);
userRouter.post('/profesors/add-schedule', hasRole([SystemRoles.All]), AddTeacherScheduleController);
userRouter.delete('/profesors/delete-schedule', hasRole([SystemRoles.All]), DeleteTeacherScheduleController);
userRouter.get('/users/asesors/specialty', hasRole([SystemRoles.All]), getListAsesorsBySpecialty);
userRouter.delete('/users/delete-jury', hasRole([SystemRoles.All]), deleteJuryRoleController);
userRouter.get('/users/Schedules/:semesterId', hasRole([SystemRoles.All]), getSchedulesUserController);
userRouter.get('/jurys/list', hasRole([SystemRoles.All]), getListJurys);
userRouter.delete('/jurys/:idJury',hasRole([SystemRoles.All]), deleteJuryController);
userRouter.patch('/user-editEmail',hasRole([SystemRoles.All]), EditEmailController);
userRouter.patch('/user-editPassword',hasRole([SystemRoles.All]), EditPasswordController);
userRouter.patch('/users/edit-photo', upload.array('files', 1), hasRole([SystemRoles.All]), patchUserPhoto);

export default userRouter;