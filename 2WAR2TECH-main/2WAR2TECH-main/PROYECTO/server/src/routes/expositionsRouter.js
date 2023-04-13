import { Router } from 'express';

import "#Config/auth.js";
import { getDetailExpositionController, getListExpositionController,
     getListByUserIdExpositionController,getListExpositionsJuradoController,
     getListExpositionThesisController, editExpositionAxSController, getDetailExpostionJury,
     getExpositionFiles } from '#Controllers/ExpositionController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const expositionRouter = Router();

expositionRouter.get('/exposition/list/:cursoxsemesterid', hasRole([SystemRoles.All]), getListExpositionController);
expositionRouter.get('/exposition/list-revisor/:uid/:cursoxsemesterid', hasRole([SystemRoles.All]),getListByUserIdExpositionController);
expositionRouter.get('/exposition/detail/:axsid', hasRole([SystemRoles.All]),getDetailExpositionController);
expositionRouter.get('/exposition-jurado/list/:cursoxsemesterid', hasRole([SystemRoles.All]),getListExpositionsJuradoController);
expositionRouter.get('/exposition/list-thesis/:cursoxsemesterid/:idThesis', hasRole([SystemRoles.All]),getListExpositionThesisController);
expositionRouter.patch('/exposition/edit-expositionThesis/:axsId', hasRole([SystemRoles.All]),editExpositionAxSController);
expositionRouter.get('/exposition/jury-detail/:idAXS/:idR', hasRole([SystemRoles.All]), getDetailExpostionJury);
expositionRouter.get('/exposition/list-files/:idAXSXR', hasRole([SystemRoles.All]), getExpositionFiles);


export default expositionRouter;