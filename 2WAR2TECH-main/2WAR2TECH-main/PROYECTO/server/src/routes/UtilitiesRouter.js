import { Router } from 'express';
import {AddStudentController} from '#Controllers/UserController.js';
import userLoginController from '#Controllers/userLoginController.js';
import {postTestImport, deleteImports} from '#Controllers/UserController.js';

const utilitiesRouter = Router();

utilitiesRouter.post('/login', userLoginController);
utilitiesRouter.post('/login/create/user', AddStudentController);
utilitiesRouter.post('/test-import', postTestImport);
utilitiesRouter.delete('/delete-test-import', deleteImports);
//utilitiesRouter.get('/test-general', );

export default utilitiesRouter;