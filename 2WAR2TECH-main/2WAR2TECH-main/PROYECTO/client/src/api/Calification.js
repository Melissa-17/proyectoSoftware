import axiosClient from "#API/axiosClient.js";

export const axiosGetCalificationsCriteria = (JWTtoken, idCurso, idSemester, page = 1, porPagina = 1000) =>{
    //http://localhost:port/calification/:idCurso/:idSemester
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

    return axiosClient.get(`/calification/${idCurso}/${idSemester}`, { params: { page: page, porPagina: porPagina } });
}

export const axiosAddCalificationsCriteria = (JWTtoken, idCurso, idSemester, formData) =>{
    //http://localhost:port/calification/:idCurso/:idSemester
    /*
        Se espera un body como:
        {
            "name": "Nuevo Criterio",
            "peso": 1, 
            "description": "Descripcion xD"
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

    return axiosClient.post(`/calification/${idCurso}/${idSemester}`, formData);
}

export const axiosGetCalificationDetail = (JWTtoken, idCalification) =>{
    //http://localhost:port/calification/detail/:idCalification
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

    return axiosClient.get(`/calification/detail/${idCalification}`);
}

export const axiosEditDescriptionCalification = (JWTtoken, idCalification, formData) =>{
    //http://localhost:port/calification/detail/:idCalification
    /*
        Se espera un body como:
        {
            "name": "name"
            "description": "Descripcion xD"
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

    return axiosClient.patch(`/calification/detail/${idCalification}`, formData);
}

export const axiosAddAssignmentCalification = (JWTtoken, idCalification, formData) =>{
    //http://localhost:port/calification/detail/:idCalification
    /*
        Se espera un body como:
        {
            "idAssignment": 30,
            "weight": 2    
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

    return axiosClient.post(`/calification/detail/${idCalification}`, formData);
}

export const axiosEditWeightEvaluationController = (JWTtoken, idCalificationXAssignment, formData) =>{
    //http://localhost:port/calification/detail/evaluation/:idCalificationXAssignment
    /*
        Se espera un body como:
        {
            "weight": 2
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

    return axiosClient.patch(`/calification/detail/evaluation/${idCalificationXAssignment}`, formData);
}

export const axiosDeleteCalificationCriteria = (JWTtoken, idCalification) =>{
  //Enviar el id de calificación a borrar
  //Regresara con estado 201 si se pudo borrar
  //Si no encontró nada, regresa con 404
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

  return axiosClient.delete(`/calification/${idCalification}`);
}

export const axiosAddEvaluation = (JWTtoken, body) =>{
  //Enviar un body como el siguiente:
  /*
  {
    weight: PESO DE LA EVALUACION,
    idC: ID DE CALIFICATION,
    idA: ID DE ASSINGMENT
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

  return axiosClient.post(`/evaluation/post`, body);
}

export const axiosDeleteEvaluation = (JWTtoken, idCalification) =>{
  //Enviar un arreglo de ids de Calification_X_Assignment:
  /*
  [1, 2, 3, 4, 5]
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

  return axiosClient.delete(`/evaluation/delete`, { params: { idE: idCalification }});
}