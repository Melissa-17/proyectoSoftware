import { Router } from 'express';
import {postCommentController, getCommentController } from '#Controllers/CommentController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const commentRouter = Router();

commentRouter.get('/comment/:idAXS', hasRole([SystemRoles.All]), getCommentController);
commentRouter.post('/comment', hasRole([SystemRoles.All]), postCommentController);

export default commentRouter;