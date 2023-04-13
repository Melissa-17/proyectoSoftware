import multer from 'multer';
import { Router } from 'express'; 
import { changeStatusThesis, getAllThesisBySpecialty, getAllThesisBySpecialty2, 
    getThesisDetails , getAsesorsThesisBySpecialty, requestThesis, proposeThesisStudent, getProposalThesisByUser, proposeThesisAsesor, 
    deleteThesis, deleteUserThesis, getRequestsByUser, getThesisAsesorBySpecialty,
    getRequestedThesis,  patchCommentProposedThesisController,
    selectStudentsPostulant,getAsesorThesis,
    getStudentsProposals,getAsesorsStudentsThesisBySpecialty, getListThesisByState,
    getDetailRequestedThesis, getTeam, linkThesisTeam, getNewAsesorsThesisBySpecialty, unselectStudentsPostulant,
    addJuryThesisController,deleteJuryThesisController,getJurorsThesis, editThesisController, addAsesorController,
    addStudentController, deleteAsesorController, getTrazabilityController, unlinkAsesorController,
    changeStateSupportedThesisController,addThesisCoordinatorController,
    unlinkStudentController} 
    from '#Controllers/ThesisController.js';
import { hasRole, SystemRoles } from '#Middleware/hasRole.js'

const ThesisRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

ThesisRouter.get("/thesis/specialty/:idCourse/:idSemester", hasRole([SystemRoles.All]), getAllThesisBySpecialty);
ThesisRouter.get("/thesis/specialty", hasRole([SystemRoles.All]), getAllThesisBySpecialty2);
ThesisRouter.get("/thesis/specialty/asesors", hasRole([SystemRoles.All]), getThesisAsesorBySpecialty);
ThesisRouter.get("/thesis-Asesors/specialty", hasRole([SystemRoles.All]), getAsesorsThesisBySpecialty);
ThesisRouter.get("/thesis-Asesors/specialty-new", hasRole([SystemRoles.All]), getNewAsesorsThesisBySpecialty);
ThesisRouter.get("/thesis-getAsesor/:idThesis", hasRole([SystemRoles.All]), getAsesorThesis);
ThesisRouter.get("/thesis-StudentsAsesors/specialty", hasRole([SystemRoles.All]), getAsesorsStudentsThesisBySpecialty);
ThesisRouter.get("/thesis/list-states", hasRole([SystemRoles.All]), getListThesisByState);
ThesisRouter.get("/thesis/proposals", hasRole([SystemRoles.All]), getProposalThesisByUser);
ThesisRouter.get("/thesis/details/:idThesis", hasRole([SystemRoles.All]), getThesisDetails);
ThesisRouter.get("/thesis/team/:idThesis", hasRole([SystemRoles.All]), getTeam);
ThesisRouter.get("/thesis/request", hasRole([SystemRoles.All]), getRequestsByUser);
ThesisRouter.get("/thesis/request/asesor", hasRole([SystemRoles.All]), getRequestedThesis);
ThesisRouter.get("/thesis/request/asesor/:idThesis", hasRole([SystemRoles.All]), getDetailRequestedThesis);
ThesisRouter.get("/thesis/proposals/students", hasRole([SystemRoles.All]), getStudentsProposals);
ThesisRouter.patch("/thesis/request/asesor", hasRole([SystemRoles.All]), selectStudentsPostulant);
ThesisRouter.patch("/thesis/change-state/Supported", hasRole([SystemRoles.All]), changeStateSupportedThesisController);
ThesisRouter.post("/thesis/request/:idUser/:idThesis", hasRole([SystemRoles.All]), requestThesis);
ThesisRouter.post("/thesis/propose-student", upload.array('files', 5), hasRole([SystemRoles.All]), proposeThesisStudent);
ThesisRouter.patch("/thesis/comment-post/", hasRole([SystemRoles.All]), patchCommentProposedThesisController);
ThesisRouter.post("/thesis/propose-asesor", upload.array('files', 5), hasRole([SystemRoles.All]), proposeThesisAsesor);
ThesisRouter.post("/thesis/link-team", upload.array('files', 5), hasRole([SystemRoles.All]), linkThesisTeam);
ThesisRouter.delete("/thesis/delete/:idThesis", hasRole([SystemRoles.All]), deleteThesis);
ThesisRouter.delete("/thesis/user-delete/:idThesis/:type", hasRole([SystemRoles.All]), deleteUserThesis);
ThesisRouter.patch("/thesis/request/unselect", hasRole([SystemRoles.All]), unselectStudentsPostulant);
ThesisRouter.post("/thesis/addJury", hasRole([SystemRoles.All]), addJuryThesisController);
ThesisRouter.delete("/thesis/delete-jury/:idThesis", hasRole([SystemRoles.All]), deleteJuryThesisController);
ThesisRouter.get("/thesis/juros/:idThesis", hasRole([SystemRoles.All]), getJurorsThesis);
ThesisRouter.patch("/thesis/detail/:idThesis", hasRole([SystemRoles.All]), editThesisController);
ThesisRouter.patch("/thesis/specialty/change", hasRole([SystemRoles.All]), changeStatusThesis);
ThesisRouter.post("/thesis/detail/asesor/:idThesis/:idUser", hasRole([SystemRoles.All]), addAsesorController);
ThesisRouter.post("/thesis/detail/student/:idThesis/:idUser", hasRole([SystemRoles.All]), addStudentController);
ThesisRouter.delete("/thesis/delete-asesor/:idUser", hasRole([SystemRoles.All]), deleteAsesorController);
ThesisRouter.delete("/thesis/unlink-asesor/:idThesis/:idUser", hasRole([SystemRoles.All]), unlinkAsesorController);
ThesisRouter.delete("/thesis/unlink-student/:idThesis/:idUser", hasRole([SystemRoles.All]), unlinkStudentController);
ThesisRouter.get("/thesis/trazability/:idThesis", hasRole([SystemRoles.All]), getTrazabilityController);
ThesisRouter.post("/thesis/postThesis-coordinator",upload.array('files', 5), hasRole([SystemRoles.All]), addThesisCoordinatorController);

export default ThesisRouter;