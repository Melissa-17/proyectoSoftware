import axiosClient from "#API/axiosClient.js";

export const axiosGetFinalAssignmentList = (JWTtoken, page, porPagina, status = '', idCXS = 1) => {
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

      
  return axiosClient.get(`/final-assignment/list/${idCXS}`, { params: { page: page, porPagina: porPagina, status: status }});
}

export const axiosGetFinalAssignmentListByUserId = (JWTtoken, userId, page, porPagina, status = '', idCXS = 1) => {
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

    
return axiosClient.get(`/final-assignment/list-revisor/${userId}/${idCXS}`, {params:{page :page, porPagina:porPagina, status: status}});
}


export const axiosGetFinalAssignmentDetail = (JWTtoken, idFinalAssign) => {

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

    
return axiosClient.get(`/final-assignment/detail/${idFinalAssign}`);
}
