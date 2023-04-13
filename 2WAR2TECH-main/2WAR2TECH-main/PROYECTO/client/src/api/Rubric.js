import axiosClient from "#API/axiosClient.js";

export const axiosGetAssignmentRubric = (JWTtoken, idAssignment, idRevisor) => {
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
    return axiosClient.get(`/Assigment-Student-Revisor/rubric/${idAssignment}/${idRevisor}`);
}

export const axiosGetCriteriaList = (JWTtoken, rubricId, page, porPagina) => {
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
    
  return axiosClient.get(`/criteria-list/${rubricId}`, { params: { page: page, porPagina: porPagina }});
}


export const axiosGetRubricInformation = (JWTtoken, rubricId, assignId) => {
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
  return axiosClient.get(`/info/${rubricId}/${assignId}`);
}

export const axiosEditRubricInformation = (JWTtoken, rubricId, body) => {
  /*
        Se espera un body como:
        {
            "objetivo": "Aquí colocas algun objetivo",
            "anotaciones": "Aquí colocas alguna anotación"
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
  return axiosClient.patch(`/info/${rubricId}`, body);
}


export const axiosAddRubric = (JWTtoken, body) => {
  /*
        Se espera un body como:
        {
            "name": "Estudios Primarios" (NOMBRE DEL CRITERIO)
            "idR": 1 (ID DE LA RUBRICA ASOCIADA)
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
  return axiosClient.post(`/info`, body);
}


export const axiosDeleteRubrics = (JWTtoken, rubricId, criteriaList) => {
  /*
        Se espera un body como:
        {
            "criterios": [1,2,3,4]
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
    // for (var pair of criteriaList.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
  // }
  return axiosClient.delete(`/info/${rubricId}`, {data: criteriaList});
}

export const axiosGetCriteria = (JWTtoken, rubricId, rubricCriteriaId) => {
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
  return axiosClient.get(`/info-criteria/${rubricId}/${rubricCriteriaId}`);
}



export const axiosEditCriteria = (JWTtoken, rubricId, rubricCriteriaId, body) => {
  /*
        Se espera un body como:
        {
            "description": "Aquí colocas alguna descripcion"
            "name": "Aquí colocas alguna descripcion"
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
  return axiosClient.patch(`/info/${rubricId}/${rubricCriteriaId}`, body);
}