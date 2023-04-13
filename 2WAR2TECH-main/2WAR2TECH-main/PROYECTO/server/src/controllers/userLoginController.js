import RoleModel from "#Models/RoleModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import UserModel from "#Models/UserModel.js";
import { compare, hash } from "bcrypt";
import { SignJWT } from "jose";

const userLoginController = async (req, res) => {
    /*
     * POST: Se va a enviar el contenido del username y password en el body (en el caso de usuarios)
        {
            "email": "asfas@gmail.com",
            "password": "123456"
        }
     */
    const { email, password } = req.body;
    // console.log(req.body);

    const existingUserByEmail = await UserModel.findOne({
        where: {
            email: email,
        },
        include: [
            {
                model: RoleModel,
            },
            {
                model: SpecialtyModel,        
            }
        ]
    });
    // console.log(existingUserByEmail);
    if(!existingUserByEmail) {
        return res.status(401).json({
            success: false,
            message: "failure user"
        });
        // return res.status(401).send({ errors: ["Credenciales incorrectas"]});
    }

    const checkPassword = await compare(password, existingUserByEmail.password);
    if(!checkPassword) {
        return res.status(401).json({
            success: false,
            message: "failure pwd"
        });
        // return res.status(401).send({ errors: ["Credenciales incorrectas"]});
    }

    const id = existingUserByEmail.id;
    const role = existingUserByEmail.ROLEs[0].id;
    const specialty = existingUserByEmail.SPECIALTies && existingUserByEmail.SPECIALTies[0] ? existingUserByEmail.SPECIALTies[0].id : 1;
    
        // TODO: Agregar rol en el constructor
        const jwtConstructor = new SignJWT( { 'userId': id, 'userRole': role , 'userSpecialty': specialty} ); 
        const encoder = new TextEncoder();

        const jwt = await jwtConstructor.setProtectedHeader({
            alg: 'HS256',
            typ: 'JWT'
        })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        return res.status(200).json({
            success: true,
            message: "successful",
            user: existingUserByEmail,
            token: jwt
        });
}

export default userLoginController;