import axiosClient from "#API/axiosClient.js";

export const axiosGetDocs = (JWTtoken,idAXS) => {
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
      
    //return axiosClient.get(`/files/all/${idAXS}/${idAXSXR}`);
    return axiosClient.get(`/file/all/${idAXS}`);
}