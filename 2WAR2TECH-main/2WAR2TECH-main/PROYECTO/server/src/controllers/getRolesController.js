import RoleModel from "#Models/RoleModel.js";


const getRolesController = async (req, res) => {
    const roles = await RoleModel.findAll({});
    
    return res.send(roles);
}

export default getRolesController;