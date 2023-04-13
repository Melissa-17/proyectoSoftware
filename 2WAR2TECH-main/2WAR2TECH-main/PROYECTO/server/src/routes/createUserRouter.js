import { Router } from 'express';


import {getFacultiesController} from '#Controllers/FacultyController.js';
import {getSpecialtiesController} from '#Controllers/SpecialtyController.js';
import {getListRoleController} from '#Controllers/RoleController.js';
import {getCoursesController} from '#Controllers/CourseController.js';
import {getFacultySpecialty} from '#Controllers/FacultyController.js';
import userRegisterDTO from '#Dto/user-registerDto.js';
import userRegisterController from '#Controllers/userRegisterController.js';
import userLoginDTO from '#Dto/userLoginDto.js';
import userLoginController from '#Controllers/userLoginController.js';
import { isLoggedIn } from '#Helpers/authHelper.js';

const createUserRouter = Router();

createUserRouter.post('/register', isLoggedIn, userRegisterDTO, userRegisterController);
// createUserRouter.post('/login', isLoggedIn, userLoginDTO, userLoginController);
createUserRouter.get('/faculties', isLoggedIn, getFacultiesController);
createUserRouter.get('/specialties', isLoggedIn, getSpecialtiesController);
createUserRouter.get('/roles', isLoggedIn, getListRoleController);
createUserRouter.get('/courses', isLoggedIn, getCoursesController);
createUserRouter.get('/faculty-specialty', getFacultySpecialty);


export default createUserRouter;