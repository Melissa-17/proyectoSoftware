import axiosClient from "#API/axiosClient.js";

export const axiosGetRole = (JWTtoken) =>{

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

    return axiosClient.get(`roles/list`);
}
export const axiosRoletoJury = (JWTtoken, idUser, idCxS) =>{

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

    return axiosClient.patch(`/jury/new/${idUser}/${idCxS}`);
}