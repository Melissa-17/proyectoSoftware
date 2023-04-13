import { Router} from 'express';

import "#Config/auth.js";
import { deleteCourseController, editCourseController, editRegisterCoursesXSemesterController, getCourseDetailController, listProfesorsxSpecialtyController, registerCoursesXSemesterController } from '#Controllers/CourseController.js';
import { getCoursesController, getProfesorsAndAssignmentsCoursexSemesterController,
     createCourseController, getCoursesBySpecialtyController, getListCourseController,
     getListSchedulesController } from '#Controllers/CourseController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const courseRouter = Router();

courseRouter.post('/semester/list/:semesterId',hasRole([SystemRoles.Coordinator]), registerCoursesXSemesterController);
courseRouter.post('/semester/list/edit/:semesterId', hasRole([SystemRoles.Coordinator]), editRegisterCoursesXSemesterController);
courseRouter.get('/semester/courses/list/:semesterId', hasRole([SystemRoles.All]), getCoursesController);
courseRouter.get('/semester/profesors/list', hasRole([SystemRoles.All]), listProfesorsxSpecialtyController);
courseRouter.get('/semester/courses/listProfesors/:SemesterId/:CourseId', hasRole([SystemRoles.All]), getProfesorsAndAssignmentsCoursexSemesterController);
courseRouter.get('/courses/specialty', hasRole([SystemRoles.All]), getCoursesBySpecialtyController);
courseRouter.post('/courses/create', hasRole([SystemRoles.All]), createCourseController);
courseRouter.patch('/courses/:idCurso', hasRole([SystemRoles.All]), editCourseController);
courseRouter.get('/courses/:idCurso', hasRole([SystemRoles.All]), getCourseDetailController);
courseRouter.delete('/courses/:idCurso', hasRole([SystemRoles.All]), deleteCourseController);
courseRouter.get('/courses-cb/list', hasRole([SystemRoles.All]), getListCourseController);
courseRouter.get('/schedules/cb-list/:idC/:idS', hasRole([SystemRoles.All]), getListSchedulesController);

export default courseRouter;