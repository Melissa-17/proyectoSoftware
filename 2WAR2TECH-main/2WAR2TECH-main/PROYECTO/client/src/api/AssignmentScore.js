import axiosClient from "#API/axiosClient.js";


export const axiosEditRubricScores = (JWTtoken,assignmentStudentRevisorid,
    assignmentStudentid, formData) => {
      /*
    Espera un body tal como:
    {
        "rubricas": [
            {"id": "12","obtainedScore": "1","notes": "Algun comentario X"},
            {"id": "13", "obtainedScore": "2","notes": "Otro comentario X"}
        ]         
    }  
    */
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
    
    return axiosClient.patch(`/qualify/${assignmentStudentRevisorid}/${assignmentStudentid}`,
    formData);
}