import axiosClient from "#API/axiosClient.js";

export const axiosGetAdvanceList = (JWTtoken, page, porPagina, status = '', idCXS = 1) => {
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

      
    return axiosClient.get(`/advance/list/${idCXS}`, { params: { page: page, porPagina: porPagina, status: status }});
}

export const axiosGetAdvanceListByUserId = (JWTtoken, userId, page, porPagina, status = '', idCXS = 1) => {

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

    
return axiosClient.get(`/advance/list-revisor/${userId}/${idCXS}`,{params: {page:page, porPagina: porPagina, status: status}});
}

export const axiosGetAdvanceDetail = (JWTtoken, idAdvance) => {

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

    
return axiosClient.get(`/advance/detail/${idAdvance}`);
}