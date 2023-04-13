import { Router } from 'express';
import getUserController from '#Controllers/getUserController.js';

const createUserRouter = Router();

createUserRouter.get('/user/:idUser', getUserController);

export default createUserRouter;