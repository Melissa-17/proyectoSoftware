import { Router } from 'express'; 
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'
import { addPostulationPeriodBySpeciality, editPostulationPeriodBySpeciality, getPostulationPeriodBySpeciality,
    getPostulationPeriodBySpecialityAndName
 } from '#Controllers/PostulationPeriodController.js';

const PostulationPeriodRouter = Router();

PostulationPeriodRouter.get("/postulation-period", hasRole([SystemRoles.All]), getPostulationPeriodBySpeciality);
PostulationPeriodRouter.get("/postulation-period/:type", hasRole([SystemRoles.All]), getPostulationPeriodBySpecialityAndName);

PostulationPeriodRouter.post("/postulation-period", hasRole([SystemRoles.All]), addPostulationPeriodBySpeciality);
PostulationPeriodRouter.patch("/postulation-period", hasRole([SystemRoles.All]), editPostulationPeriodBySpeciality);

export default PostulationPeriodRouter;