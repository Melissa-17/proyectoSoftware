import UserModel from "#Models/UserModel.js";
import { hash } from 'bcrypt';

const userRegisterController = async (req, res) => {
    /*
     * POST: Se va a enviar el contenido del username y password en el body (en el caso de usuarios)
     */
    const { idUser, idSpecialty, idPUCP, names, fLastName, mLastName,
        telephone, email, password, reg_date} = req.body;    

    const existingUserByID = await UserModel.findByPk(idUser);
    if(existingUserByID) return res.status(409).send({ errors: ["Ya existe un usuario con ese id"]});

    const existingUserByEmail = await UserModel.findOne({ email });
    if(existingUserByEmail) return res.status(409).send({ errors: ["Ya existe un usuario con ese email asociado"]});

    const hashedPassword = await hash (password, 12);
    const newUser = UserModel.build({
        idSpecialty: idSpecialty,
        idPUCP: idPUCP,
        names: names,
        fLastName: fLastName,
        mLastName: mLastName,
        telephone: telephone,
        email: email,
        password: hashedPassword,
        reg_date: reg_date,
        active: '1'
    });
    await newUser.save();
    return res.send('Usuario creado');
}

export default userRegisterController;