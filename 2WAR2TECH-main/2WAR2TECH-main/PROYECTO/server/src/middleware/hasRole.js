import RoleModel from "#Models/RoleModel.js";
import UserModel from "#Models/UserModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";

export const hasRole = (roleNameArray) => async (req, res, next) => {
    if (roleNameArray.includes('ALL')) {
        next();
        return;
    }
    const { userId, userRole } = res.locals;
    // const user = await UserModel.findOne({
    //     where: {
    //         id: userId
    //     },
    //     include: [
    //         { 
    //             model: UserXRoleModel,
    //             include: [ {
    //                 model: RoleModel
    //             }]
    //         }
    //     ]
    // })
    // const assingedRoles = user.dataValues.USER_X_ROLEs.map( x => x.dataValues).map(x => x.ROLE.dataValues.description);
    const user = await RoleModel.findAll({
        attributes : [ 'description'],
        where: {
            id: userRole
        }
        
    });
 
    const assingedRoles = user.map( x=> x.dataValues.description);
    const userHasTheAccessRole = assingedRoles.some( roleName => roleNameArray.includes(roleName));
    if (userHasTheAccessRole) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorized to access this role.' });
    }
}

export const SystemRoles = {
    Admin: 'Administrador',
    User: 'Usuario',
    Student: 'Alumno',
    Teacher: 'Profesor',
    Asesor: 'Asesor',
    Jury: 'Jurado',
    Coordinator: 'Coordinador',
    All: 'ALL'
}