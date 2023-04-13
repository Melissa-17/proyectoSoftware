import { Router } from 'express';

import postCommentController from '#Controllers/postCommentController.js';
//import commentRegisterDTO from '#Dto/comment-registerDto.js';

const createCommentRouter = Router();

createCommentRouter.post('/comment', postCommentController);

export default createCommentRouter;