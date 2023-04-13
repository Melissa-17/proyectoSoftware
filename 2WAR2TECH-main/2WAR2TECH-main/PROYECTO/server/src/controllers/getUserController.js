import RoleModel from "#Models/RoleModel.js";
import UserModel from "#Models/UserModel.js";

const getUserController = async (req, res) => {

    //Espera un parametro en el url como idUser

    const user = await UserModel.findOne({ attributes: ['name', 'fLastName', 'mLastName', 'photo'], where: { id: req.params.idUser }, 
        include: {model: RoleModel, attributes: ['id', 'description'], through: { attributes: [] } }
    });
    
    if(!user){
        return res.status(404).send({
            errorMessage: "Usuario no encontrado"
        });
    };

    return res.status(200).send(user);
}

export default getUserController;