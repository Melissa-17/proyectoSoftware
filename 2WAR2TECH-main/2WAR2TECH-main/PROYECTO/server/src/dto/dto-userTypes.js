import { Type } from '@sinclair/typebox';

export const idUserDTOSchema = Type.String({
    errorMessage: {
        type: 'El tipo de idUser no es válido, debe ser un string',
    },
});

export const idSpecialtyDTOSchema = Type.String({
    errorMessage: {
        type: 'El tipo de idSpecialty no es válido, debe ser un string',
    },
});

export const idPUCPDTOSchema = Type.String({
    minLength: 8,
    maxLength: 8,
    errorMessage: {
        type: 'El tipo de idPUCP no es válido, debe ser un string',
        minLength: 'idPucp debe tener 8 caracteres de longitud',
        maxLength: 'idPucp debe tener 8 caracteres de longitud',
    },
});

export const namesDTOSchema = Type.String({
    errorMessage: {
        type: 'El tipo de names no es válido, debe ser un string',
    },
});

export const fLastNameDTOSchema = Type.String({
    errorMessage: {
        type: 'El tipo de fLastName no es válido, debe ser un string',
    },
});

export const mLastNameDTOSchema = Type.String({
    errorMessage: {
        type: 'El tipo de mLastName no es válido, debe ser un string',
    },
});

export const telephoneDTOSchema = Type.String({
    errorMessage: {
        type: 'El tipo de telephone no es válido, debe ser un string',
    },
});

export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'El tipo del email no es válido, debe ser un string',
        format: 'El formato del email no es válido, debe cumplir el RFC 5322',
    },
});

export const passwordDTOSchema = Type.String({
    errorMessage: {
        type: 'El tipo de la password no es válido, debe ser un string',
    },
});

export const reg_dateDTOSchema = Type.String({
    format: 'date',
    errorMessage: {
        type: 'El tipo de la password no es válido, debe ser un string',
    },
});

export const activeDTOSchema = Type.String({
    minLength: 1,
    maxLength: 1,
    errorMessage: {
        type: 'El tipo de la password no es válido, debe ser un string',
        minLength: 'active debe ser 1 (activo) o 0 (inactivo)',
        maxLength: 'active debe ser 1 (activo) o 0 (inactivo)',
    },
});
