import axiosClient from "#API/axiosClient.js";

export const axiosGetRubricasList = (JWTtoken) => {
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

    return axiosClient.get(`/Assigment-Student-Revisor/rubric/:revisorId/:assignmentStudentId`);
}

export const axiosGetPresentationAssignmentDetail = (JWTtoken, idPresentation) => {

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
  
      
  return axiosClient.get(`/exposition/detail/${idPresentation}`);
  }