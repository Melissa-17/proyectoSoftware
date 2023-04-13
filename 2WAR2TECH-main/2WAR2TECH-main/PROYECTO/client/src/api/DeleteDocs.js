import axiosClient from "#API/axiosClient.js";

export const axiosDeleteDoc = (JWTtoken,item) => {
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
      
    return axiosClient.delete(`/file/${item.id}`);
}