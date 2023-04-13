import axiosClient from "#API/axiosClient.js";

export const axiosGetPartialAssignmentList = (JWTtoken, page, porPagina, status = '', idCXS = 1) => {
  //STATUS
  //Calificado
  //Asignado
  //Entregado
  //Visto Bueno
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
    return axiosClient.get(`/partial-assignment/list/${idCXS}`, { params: { page: page, porPagina: porPagina, status: status }});
}

export const axiosGetPartialAssignmentListByCxSId = (JWTtoken, cxsId) => {
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
  return axiosClient.get(`/partial-assignment/list/${cxsId}`);
}

export const axiosGetPartialAssignmentListByUserId = (JWTtoken, userId, page, porPagina, status = '', idCXS = 1) => {
  //STATUS
  //Calificado
  //Asignado
  //Entregado
  //Visto Bueno
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

    
return axiosClient.get(`/partial-assignment/list-revisor/${userId}/${idCXS}`, {params:{page :page, porPagina:porPagina, status: status}});
}

export const axiosGetPartialAssignmentDetail = (JWTtoken, idPartialAssign) => {

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
  
      
  return axiosClient.get(`/partial-assignment/detail/${idPartialAssign}`);
  }