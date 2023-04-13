import axiosClient from "#API/axiosClient.js";

export const axiosGetFeedbackAssignmentList = (JWTtoken) => {

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

      
  return axiosClient.get(`/feedback-assignment/list/1`);
}


export const axiosGetFeedbackAssignmentDetail = (JWTtoken, idFeedbackAssign) => {

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

    
return axiosClient.get(`/final-assignment/detail/${idFeedbackAssign}`);
}
