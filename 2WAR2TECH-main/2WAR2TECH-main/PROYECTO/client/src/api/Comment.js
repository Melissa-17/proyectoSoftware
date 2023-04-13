import axiosClient from "#API/axiosClient.js";

export const axiosAddComment = (JWTtoken, formData) => {
  /*
    Espera un body tal como:
    {
        "comment": "hola que tal",
        "ASSIGNMENTXSTUDENTId": "1"  
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
    
    return axiosClient.post(`/comment`, formData);
}

export const axiosGetCommentListByAXSId = (JWTtoken, axsId) => {
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
  
  return axiosClient.get(`/comment/${axsId}`);
}