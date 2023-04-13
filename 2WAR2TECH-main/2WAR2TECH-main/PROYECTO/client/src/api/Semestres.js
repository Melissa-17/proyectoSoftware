import axiosClient from "#API/axiosClient.js";

export const axiosGetSemestresbyUserId = (JWTtoken) => {
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
    
    return axiosClient.get(`/semesterList/`);
}

export const axiosAddSemester = (JWTtoken,specialtyId,formData) => {
  /*
  Espera un body tal como:
  {
        "abbreviation": "2023-1"
    }   
  */
    axiosClient.interceptors.request.use(
        async config => {
          config.headers = { 
            'Authorization': `${JWTtoken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          return config;
        },
        error => {
          Promise.reject(error)
      });
    
    return axiosClient.post(`/semester/${specialtyId}`, formData);
}

export const axiosEditSemester = (JWTtoken,specialtyId,formData) => {
  /*
  Espera un body tal como:
  {
        "id": "6",
        "abbreviation": "2023-1"
    } 
  */
    axiosClient.interceptors.request.use(
        async config => {
          config.headers = { 
            'Authorization': `${JWTtoken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          return config;
        },
        error => {
          Promise.reject(error)
      });
    
    return axiosClient.patch(`/semester/${specialtyId}`, formData);
}

export const axiosDeleteSemester = (JWTtoken, idS) => {
  //ENVIAR ARREGLO DE IDS DE SEMESTRE
    axiosClient.interceptors.request.use(
        async config => {
          config.headers = { 
            'Authorization': `${JWTtoken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          return config;
        },
        error => {
          Promise.reject(error)
      });
    
    return axiosClient.delete(`/semester/delete`, { params: { idS: idS }});
}

export const axioslistProfessors = (JWTtoken,text) => {
  axiosClient.interceptors.request.use(
      async config => {
        config.headers = { 
          'Authorization': `${JWTtoken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        return config;
      },
      error => {
        Promise.reject(error)
    });
  
  return axiosClient.get(`/semester/profesors/list/${text}`);
}

export const axiosListAllSemesters = (JWTtoken, page, porPagina) => {
  axiosClient.interceptors.request.use(
      async config => {
        config.headers = { 
          'Authorization': `${JWTtoken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        return config;
      },
      error => {
        Promise.reject(error)
    });
  
  return axiosClient.get(`/semester/list-all`,{ params: { page: page, porPagina: porPagina }});
}

export const axiosGetSemesterDetail = (JWTtoken, idS) => {
  //ENVIAR EL ID DEL SEMESTRE DEL QUE SE QUIERE DETALLE
  axiosClient.interceptors.request.use(
      async config => {
        config.headers = { 
          'Authorization': `${JWTtoken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        return config;
      },
      error => {
        Promise.reject(error)
    });
  //RETORNA LA ABREVIACION Y EL ID DE VUELTA, DE REGALO
  return axiosClient.get(`/semester/list-detail/${idS}`);
}
export const axiosListPaginationSemesters = (JWTtoken, page, porPagina, idS) => {
  //NO ENVIAR NADA
  axiosClient.interceptors.request.use(
      async config => {
        config.headers = { 
          'Authorization': `${JWTtoken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        return config;
      },
      error => {
        Promise.reject(error)
    });
  //RETORNA LA ABREVIACION Y EL ID, PAGINADOS
  return axiosClient.get(`/semester/list-pagination`, { params: { page: page, porPagina: porPagina, idS: idS }});
}