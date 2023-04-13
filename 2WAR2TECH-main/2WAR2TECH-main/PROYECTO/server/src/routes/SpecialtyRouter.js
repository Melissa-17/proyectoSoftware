import { Router} from 'express';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'
import "#Config/auth.js";
import { getSpecialtiesController, getSpecialtyDetails, getToBeCoordinator,
        deleteSpecialty, postSpecialty, patchSpecialty, getListCoordinators,
        postCoordinator, patchGenericUser, postCordinatorToSpecialty, deleteCoordinator,
        getDetailGenericUser, disableSpecialtyController} from '#Controllers/SpecialtyController.js';

const specialtyRouter = Router();

specialtyRouter.get('/specialties/list/',hasRole([SystemRoles.All]), getSpecialtiesController);
specialtyRouter.get('/specialties/detail/:idS',hasRole([SystemRoles.All]), getSpecialtyDetails);
specialtyRouter.get('/specialties/p-coordinator/:idS',hasRole([SystemRoles.All]), getToBeCoordinator);
specialtyRouter.delete('/specialties/delete/:idS',hasRole([SystemRoles.All]), deleteSpecialty);
specialtyRouter.post('/specialties/post',hasRole([SystemRoles.All]), postSpecialty);
specialtyRouter.patch('/specialties/patch',hasRole([SystemRoles.All]), patchSpecialty);
specialtyRouter.get('/specialties/coordinators/list', hasRole([SystemRoles.All]), getListCoordinators);
specialtyRouter.post('/specialties/coordinators/post', hasRole([SystemRoles.All]), postCoordinator);
specialtyRouter.patch('/specialties/coordinators/patch', hasRole([SystemRoles.All]), patchGenericUser);
specialtyRouter.post('/specialties/coordinators/post-specialty', hasRole([SystemRoles.All]), postCordinatorToSpecialty);
specialtyRouter.delete('/specialties/coordinators/delete', hasRole([SystemRoles.All]), deleteCoordinator);
specialtyRouter.get('/specialties/coordinators/detail/:idU', hasRole([SystemRoles.All]), getDetailGenericUser)
specialtyRouter.delete('/specialties/coordinators/disable/:idU/:idEsp', hasRole([SystemRoles.All]), disableSpecialtyController)

export default specialtyRouter;