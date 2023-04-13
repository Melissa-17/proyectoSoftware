import axiosClient from "#API/axiosClient.js";

export const axiosGetFaculties = (JWTtoken) => {
    //OBTIENE TODAS LAS FACULTADES, SIN PAGINACIÓN
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    return axiosClient.get(`/faculties`);
}

export const axiosGetPaginationFaculties = (JWTtoken, page, porPagina) => {
    //OBTIENE TODAS LAS FACULTADES, CON PAGINACIÓN
    //ENVIAR EL NRO DE PAGINA Y LA CANTIDAD DE FACULTADES POR PAGINA
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    return axiosClient.get(`/faculties/list`, { params: { page: page, porPagina: porPagina }});
}

export const axiosGetDetailFaculty = (JWTtoken, idF, page, porPagina) => {
    //OBTIENE EL DETALLE DE UNA FACULTAD: NOMBRE, CODIGO, ESPECIALIDADES, COORDINADORES
    //ENVIAR EL ID DE FACULTAD
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    //RETORNA LA FACULTAD + SUS ESPECIALIDADES, LAS ESPECIALDIADES TIENEN PAGINACION
    return axiosClient.get(`/faculties/detail/${idF}`, { params: { page: page, porPagina: porPagina }});
}

export const axiosModifyFaculty = (JWTtoken, body) => {
    //INSERTA, ACTUALIZA, ELIMINA UNA FACULTAD + ESPECIALIDADES + COORDINADORES
    //IMPORTANTE: VER BODYS EJEMPLO
    //IMPORTANTE: ENVIAR LO QUE SE INDICA COMO ARREGLO, AUNQUE SOLO SEA UN ELEMENTO
    //IMPORTANTE: LA PRIMERA ACCION SERA SIEMPRE PARA FACULTAD
    //AL INSERTAR Y ELIMINAR UNA FACULTAD, NO SE NECESITA ENVIAR MAS PARA LAS ESPECIALIDADES
    //#region INSERT
    //ESTE ES EL MAS SIMPLE:
    /*
    {
        faculty: { name: 'NOMBRE DE LA FACULTAD' },
        specialties: [{
            name: 'NOMBRE ESPECIALIDAD',
            coordinators: [{ idC: ID_COORDINADOR }]
        }],
        actions: ['INSERT'] 
    }
    */
    //#endregion
    //#region UPDATE
    //ESTE ES EL MÁS COMPLEJO, REVISARLO CON CUIDADO
    /*
    {
        faculty: { id: ID_FACULTAD, name: 'NOMBRE DE LA FACULTAD' },
        specialties: [{
            id: ID_ESPECIALIDAD
            name: 'NOMBRE ESPECIALIDAD',
            actions:[{ idC: ID_COORDINADOR, action: 'EDIT_COORDINATOR'}]
        }],
        actions: ['', 'UPDATE']
    }
    //PARA DEJAR LA FACULTAD SIN EDITAR, RELLENAR EL ESPACIO DE actions EN BLANCO
    //PARA CAMBIAR ALGO DE UNA ESPECIALIDAD (INCLUIDO COORDINADOR), RELLENAR CON 'UPDATE'
    //PARA EL ACTIONS DENTRO DE ESPECIALIDAD, ESPECIFICAR QUE SE LE QUIERE HACER A LA ESPECIALIDAD
    //DEPENDIENDO DE LA ACCION, SE REQUIERE DE UN JSON DIFERENTE EN EL ARREGLO DE specialties Y actions (EL ANIDADO)
    //EJEMPLOS MANIPULANDO UNA SOLA ACCION, SE PUEDE COMBINAR SEGUN SE NECESITE, SE PUEDE ENVIAR DE MAS, NO DE MENOS
    //SE MUESTRA LO MINIMO QUE NECESITA CADA ACCION
    //'NEW_SPECIALTY' AÑADIR UNA ESPECIALIDAD + COORDINADORES
    {
        name: 'NOMBRE ESPECIALIDAD',
        coordinators: [ ID_COORDINADOR, ID_COORDINADOR, ID_COORDINADOR]
        actions:[{ action: 'NEW_SPECIALTY' }] <- AUN ENVIARLO COMO ARREGLO Y ESPECIFICANDO EL ELEMENTO DE action
    }
    //'EDIT_SPECIALTY' EDITAR UNA ESPECIALIDAD (NO COORDINADORES)
    {
        idS: ID_ESPECIALIDAD,
        name: 'NOMBRE ESPECIALIDAD',
        actions:[{ action: 'EDIT_SPECIALTY' }] <- AUN ENVIARLO COMO ARREGLO Y ESPECIFICANDO EL ELEMENTO DE action
    }
    //'NEW_COORDINATOR' AÑADIR UN COORDINADOR
    {
        actions:[{ idC: ID_COORDINADOR, action: 'NEW_COORDINATOR' }]
    }
    //'DELETE_COORDINATOR' ELIMINAR UN COORDINADOR
    {
        actions:[{ idC: ID_COORDINADOR, action: 'DELETE_COORDINATOR' }]
    }
    //SI SE QUIERE EDITAR UNA ESPECIALIDAD Y SUS COORDINADORES, ENVIAR LO CORRESPONDIENTE POR SEPARADO
    */
    //#endregion
    //#region DELETE
    //SE PUEDE ELIMINAR TANTO LA FACULTAD ENTERA (+ ESPECIALIDADES + COORDINADRES) O SOLO LA ESPECIALIDAD (+ COORDINADORES)
    /*
    {
        faculty: { idF: ID_FACULTAD },
        specialties: [{
            idS: ID_ESPECIALIDAD
        }],
        actions: ['', 'DELETE'] 
    }
    */
    //#endregion
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    return axiosClient.get(`/faculties/modify`, body);
}

export const axiosGetFacultySpecialty = () => {
    //OBTIENE LAS FACULTADES CON SUS ESPECIALIDADES
    return axiosClient.get(`/config/faculty-specialty`);
}

export const axiosGetFacultySpecialtyToken = (JWTtoken) => {
    //OBTIENE LAS FACULTADES CON SUS ESPECIALIDADES
    //USA TOKEN
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    return axiosClient.get(`/faculties/specialties`);
}

export const axiosDeleteFaculty = (JWTtoken, idF) => {
    //ENVIAR UN ARREGLO CON LOS IDs DE FACULTAD A BORRAR
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    return axiosClient.delete(`/faculties/delete`, { params: { idF: idF }});
}

export const axiosPostFaculty = (JWTtoken, body) => {
    //ENVIAR UN BODY TAL COMO:
    /*
    {
        name: NOMBRE DE LA FACULTAD
    }
    */
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    return axiosClient.post(`/faculties/post`, body);
}

export const axiosPatchFaculty = (JWTtoken, body) => {
    //ENVIAR UN BODY TAL COMO:
    /*
    {
        idF: ID DE LA FACULTAD
        name: NOMBRE DE LA FACULTAD
    }
    */
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    return axiosClient.patch(`/faculties/patch`, body);
}