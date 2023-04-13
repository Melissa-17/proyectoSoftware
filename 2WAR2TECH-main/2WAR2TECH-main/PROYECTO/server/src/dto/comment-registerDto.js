/*
import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { ASSIGNMENTXSTUDENTIdDTOSchema, USERIdDTOSchema, commentDTOSchema } from "./dto-commentTypes.js";

const registerDTOSchema = Type.Object({
    ASSIGNMENTXSTUDENTId: ASSIGNMENTXSTUDENTIdDTOSchema,
    USERIdDTO           : USERIdDTOSchema,
    comment             : commentDTOSchema
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

const commentRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);
    
    if(!isDTOValid) return res.status(400).send({
        errors: validateSchema.errors.map(error => error.message),
    });

    next();
}

export default commentRegisterDTO;
*/