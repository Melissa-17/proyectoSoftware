import axiosClient from "#API/axiosClient.js";


export const axiosGetListProgrammedExposition = (JWTtoken, cursoxsemesterid, text, page, porPagina, status = '') =>{
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

    return axiosClient.get(`/programmedExposition/${cursoxsemesterid}`, { params: { page: page, porPagina: porPagina, text: text, status: status }});
}

export const axiosGetListProgrammedExpositionByUserId = (JWTtoken, userId, cursoxsemesterid, text = '', page = 1, porPagina = 100, status = '') =>{
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

    return axiosClient.get(`/programmedExposition-revisor/${userId}/${cursoxsemesterid}`, { params: { page: page, porPagina: porPagina, text: text, status: status }});
}

  export const AxiosPostProgrammedExposition = (JWTtoken, cursoxsemesterid, body) => { //crear ProgrammedExposition
    /*
      Se espera un body como:
      {
          "startDate": "2022-08-15T00:00:00.000Z",
          "endDate": "2022-08-22T00:00:00.000Z",
          "idThesis": "1",
          "idsJurados": [1,2,3,4,5]
      }
  */
   /* se espera parametro del id del cursoxsemestre */

   /* CAMPOS INUTILIZABLES
    AssignmentModel
      assignmentName: "Exposición", //campo inutilizable
      chapterName: "-", //campo inutilizable
      limitCompleteDate : '0000-00-00 00:00:00',  //campo inutilizable
      limitCalificationDate : '0000-00-00 00:00:00', //campo inutilizable
      additionalComments : "-" ,//campo inutilizable

    AssignmentXStudentXRevisorModel
      feedbackDate: '0000-00-00 00:00:00',  //campo inutilizable
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

        console.log("aaa: " + JSON.stringify(body, null, 2))
      
      return axiosClient.post(`/create-programmedExposition/${cursoxsemesterid}`,body);
  }

  export const axiosGetDetailProgrammedExposition = (JWTtoken, axsid) =>{

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

    return axiosClient.get(`/detail-programmedExposition/${axsid}`);
}


export const axiospatchProgrammedExposition = (JWTtoken, expoId, body) =>{

   /*
    Espera un body tal como:
    {
        "startDate": "2022-08-15T05:00:00.000Z",
        "endDate": "2022-08-15T05:30:00.000Z"
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

  return axiosClient.patch(`/edit-programmedExposition/${expoId}`,body);
}