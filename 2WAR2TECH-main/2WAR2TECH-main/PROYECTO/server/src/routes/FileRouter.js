import multer from 'multer';
import { Router } from 'express'; 
import { getAllFileController, getOneFileController, getFileThesisController, postFileController, patchFileController, deleteFileController, modifyFileController } from '#Controllers/FileController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const FileRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

FileRouter.get("/file/all/:idAXS", hasRole([SystemRoles.All]), getAllFileController);
FileRouter.get("/file/one/:key", hasRole([SystemRoles.All]),getOneFileController);
FileRouter.get("/file/thesis/:idThesis", hasRole([SystemRoles.All]),getFileThesisController);
FileRouter.post("/file/", upload.array('files', 5), hasRole([SystemRoles.All]),postFileController);
FileRouter.patch("/file/", upload.array('files', 5), hasRole([SystemRoles.All]),patchFileController);
FileRouter.patch("/file/upload", upload.array('files', 5), hasRole([SystemRoles.All]), modifyFileController);
FileRouter.delete("/file/:id", hasRole([SystemRoles.All]), deleteFileController);
export default FileRouter;
