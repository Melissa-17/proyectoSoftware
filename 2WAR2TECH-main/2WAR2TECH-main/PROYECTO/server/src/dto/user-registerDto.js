import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { activeDTOSchema, emailDTOSchema, fLastNameDTOSchema, idPUCPDTOSchema, 
    idSpecialtyDTOSchema, idUserDTOSchema, mLastNameDTOSchema, namesDTOSchema, 
    passwordDTOSchema, reg_dateDTOSchema, telephoneDTOSchema } from "./dto-userTypes.js";

const registerDTOSchema = Type.Object({
    idUser: idUserDTOSchema,
    idSpecialty: idSpecialtyDTOSchema,
    idPUCP: idPUCPDTOSchema,
    names: namesDTOSchema,
    fLastName: fLastNameDTOSchema,
    mLastName: mLastNameDTOSchema,
    telephone: telephoneDTOSchema,
    email: emailDTOSchema,
    password: passwordDTOSchema,
    reg_date: reg_dateDTOSchema
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "El formato del objeto no es válido",
    }
});

const ajv = new Ajv({ allErrors: true}).addKeyword("kind").addKeyword("modifier");
addFormats(ajv, ["email","date"]);
addErrors(ajv);

const validateSchema = ajv.compile(registerDTOSchema);

const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);
    
    if(!isDTOValid) return res.status(400).send({
        errors: validateSchema.errors.map(error => error.message),
    });

    next();
}

export default userRegisterDTO;