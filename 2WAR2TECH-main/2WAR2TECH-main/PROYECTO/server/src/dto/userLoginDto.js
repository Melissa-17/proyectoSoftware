import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { emailDTOSchema, passwordDTOSchema } from "./dto-userTypes.js";

const loginDTOSchema = Type.Object({
    email: emailDTOSchema,
    password: passwordDTOSchema,
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "El formato del objeto no es válido",
    }
});

const ajv = new Ajv({ allErrors: true}).addKeyword("kind").addKeyword("modifier");
addFormats(ajv, ["email"]);
addErrors(ajv);

const validateSchema = ajv.compile(loginDTOSchema);

const userLoginDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);
    
    if(!isDTOValid) return res.status(400).send({
        errors: validateSchema.errors.map(error => error.message),
    });

    next();
}

export default userLoginDTO;