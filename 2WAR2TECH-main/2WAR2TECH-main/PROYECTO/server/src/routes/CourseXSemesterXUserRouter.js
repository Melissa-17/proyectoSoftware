import { Router } from 'express';
import "#Config/auth.js";
import { getCoursesXSemesterxUser, addUserToCourse, editAsesorStatus } from '#Controllers/CourseXSemesterXUserController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const CoursesXSemesterxUserRouter = Router();

CoursesXSemesterxUserRouter.get('/courses/:semesterId/:userId', hasRole([SystemRoles.All]), getCoursesXSemesterxUser);
CoursesXSemesterxUserRouter.post('/courses/add-student', hasRole([SystemRoles.All]), addUserToCourse);
CoursesXSemesterxUserRouter.patch('/course-semester-user/status-asesor', hasRole([SystemRoles.All]), editAsesorStatus);
export default CoursesXSemesterxUserRouter;