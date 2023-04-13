import axiosClient from "#API/axiosClient.js";

export const axiosGetRubricaAssignmentList = (JWTtoken) => {

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

      
  return axiosClient.get(`/rubrica-assignment/list/1`);
}


export const axiosGetRubricaAssignmentDetail = (JWTtoken, idFinalAssign) => {

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

    
return axiosClient.get(`/rubrica-assignment/detail/${idFinalAssign}`);
}
