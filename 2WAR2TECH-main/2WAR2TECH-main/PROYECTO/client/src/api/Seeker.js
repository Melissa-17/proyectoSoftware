import axiosClient from "#API/axiosClient.js";

export const axiosSeekerBySpecialtyAndRole = (JWTtoken, tipo, text, page, porPagina) => {
  /* LOS TIPOS DEBEN SER INGRESADOS DE ESTA MANERA
    case "Administrador"
    case "Usuario"
    case "Alumno"
    case "Profesor"
    case "Asesor"
    case "Jurado"
    case "Coordinador"
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
      });

    return axiosClient.get(`/search/Alist`, { params: {tipo: tipo , text: text, page: page, porPagina: porPagina }});
}

export const axiosSeekerBySpecialtyAndRolAndCourse = (JWTtoken, idCurso, tipo, text, page, porPagina) => {
  /* LOS TIPOS DEBEN SER INGRESADOS DE ESTA MANERA
    case "Administrador"
    case "Usuario"
    case "Alumno"
    case "Profesor"
    case "Asesor"
    case "Jurado"
    case "Coordinador"
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
      });

    return axiosClient.get(`/search/list/${idCurso}`, { params: { page: page, porPagina: porPagina, text: text, tipo: tipo }});
}


export const axiosSeekerBySpecialtyAndName = (JWTtoken, tipo, idEsp, text, page, porPagina) => {
  /* LOS TIPOS DEBEN SER INGRESADOS DE ESTA MANERA
    case "Administrador"
    case "Usuario"
    case "Alumno"
    case "Profesor"
    case "Asesor"
    case "Jurado"
    case "Coordinador"
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
    });

  return axiosClient.get(`/search/list`, { params: {tipo: tipo,  idEsp: idEsp, text: text , page: page, porPagina: porPagina}});
  
}

export const axiosSeekerByDifferentsRoles = (JWTtoken, text, body, page, porPagina) => {
  /* LOS TIPOS DEBEN SER INGRESADOS DE ESTA MANERA
    case "Administrador"
    case "Usuario"
    case "Alumno"
    case "Profesor"
    case "Asesor"
    case "Jurado"
    case "Coordinador"

        Se espera un body como:
        {
            "tipos": ["Profesor", "Asesor"],
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
    });

  return axiosClient.post(`/search/list`, body, { params: { page: page, porPagina: porPagina, text: text}});  
}

export const axiosSearchByTypeAndNameAssignmentController = (JWTtoken, tipo, text = '', page = 1, porPagina = 1000, idC, idS) => {
  /* LOS TIPOS DEBEN SER INGRESADOS DE ESTA MANERA
     "PARTIAL ASSIGN"
     "FINAL ASSIGN"
     "ADVANCE"
     "EXPOSITION"
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
    });

  return axiosClient.get(`/search/lista/evaluations/${idC}/${idS}`, { params: { page: page, porPagina: porPagina, text: text, tipo: tipo }});
  
}

export const axiosSearchByFER = (JWTtoken, idFac, idEsp, idRol, page = 1, porPagina = 4, text = '') => {
  /* FER: Faculty, Specialty, Role
    Los ids de Facultad y Especialidad son obligatorios, el idRol es opcional, si no se coloca valor al id se buscará a todos.
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
    });

  return axiosClient.get(`/search/listFER`, { params: { idFac: idFac, idEsp: idEsp, idRol: idRol, page: page, porPagina: porPagina, text: text }});
  
}