import RoleModel from '#Models/RoleModel.js';
import UserXCourseXSemesterModel from '#Models/UserXCourseXSemesterModel.js';
import UserXRoleModel from '#Models/UserXRoleModel.js';

const getListRoleController = async (req, res) => {

    const roles = await RoleModel.findAll();
    
    return res.send(roles);
}

const RoletoJuryController = async (req, res) => {
    //Se debe pasar por parámetro el id del usuario y el id del cursoXsemestre para añadir correctamente el nuevo rol de jurado

    const newUserCS = await UserXCourseXSemesterModel.build();
    newUserCS.USERId = req.params.idUser;
    newUserCS.COURSEXSEMESTERId = req.params.idCxS;
    await newUserCS.save();

    const newUserRole = await UserXRoleModel.build();
    newUserRole.USERId = req.params.idUser;
    newUserRole.ROLEId = 6;
    await newUserRole.save();
    
    return res.send({newUserCS,newUserRole});
}

export { getListRoleController , RoletoJuryController };