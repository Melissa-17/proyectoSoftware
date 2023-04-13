import axiosClient from "#API/axiosClient.js";

export const axiosGetPresentationAssignmentList = (JWTtoken, page, porPagina, idCXS, status = '') =>{
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

    return axiosClient.get(`/exposition/list/${idCXS}`, { params: {  page: page, porPagina: porPagina, status: status }});
}

export const axiosGetPresentationListByUserId = (JWTtoken, userId, page = 1, porPagina = 100, status = '', idCXS = 1) => {

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

    
return axiosClient.get(`/exposition/list-revisor/${userId}/${idCXS}`, { params: { status: status, page: page, porPagina: porPagina}});
}

export const axiosGetPresentationAssignmentDetail = (JWTtoken, idPresentation) => {
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
    
  return axiosClient.get(`/exposition/detail/${idPresentation}`);
}


export const axiosGetgetListExpositionsJurado = (JWTtoken, cursoxsemesterid,text, page,porPagina) => {

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
    
  return axiosClient.get(`/exposition-jurado/list/${cursoxsemesterid}`,{ params: {text: text, page: page, porPagina: porPagina }});
}


export const axiosgetListExpositionThesis = (JWTtoken, cursoxsemesterid,idThesis, page, porPagina) => {

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
    
  return axiosClient.get(`/exposition/list-thesis/${cursoxsemesterid}/${idThesis}`,{ params: {page: page, porPagina: porPagina }});
}


export const axiosPatchExpositionAxS = (JWTtoken, axsId, body) => {

   /*{
            "linkVirtualSession": "LinkExample",
            "location" : "H320",
            "meetingDate" : "2022-08-15T00:05:00.000Z"
    }*/ 
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
    
  return axiosClient.patch(`/exposition/edit-expositionThesis/${axsId}`, body);
}

export const axiosGetDetailExpostionJury = (JWTtoken, idAXS, idR) => {
  //ENVIAR EL ID DE ASSIGNMENT X STUDENT Y EL ID DEL JURADO
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
  //EJEMPLO DE RETORNO, CON 60 y 8
  /*
  {
    "exposition": {
        "id": 60,
        "linkVirtualSession": "//ww.google.com.pe",
        "location": null,
        "meetingDate": "2022-11-28T17:00:00.000Z",
        "registerDate": null,
        "status": "Asignado",
        "USER": {
            "id": 1,
            "name": "Gerard",
            "fLastName": "Bernabeu",
            "mLastName": "Reyes",
            "THEses": [
                {
                    "id": 2,
                    "title": "DESARROLLO PARA UN SISTEMA DE INFORMACIÓN DE DELIBERY",
                    "theme": "SISTEMAS DE INFORMACIÓN",
                    "objective": null
                },
                {
                    "id": 10,
                    "title": "Análisis de factores que influyen en la deserción",
                    "theme": "CIENCIAS DE LA COMPUTACIÓN",
                    "objective": null
                }
            ],
            "SPECIALTies": [
                {
                    "id": 13,
                    "name": "INGENIERÍA INFORMATICA"
                }
            ]
        }
    },
    "revision": {
        "id": 397,
        "grade": 15,
        "feedbackDate": "2022-11-23T18:08:08.000Z",
        "FILEs": []
    }
}
  */
  return axiosClient.get(`/exposition/jury-detail/${idAXS}/${idR}`);
}

export const axiosGetFilesExpositionRevisor = (JWTtoken, idAXSXR) => {
  //ENVIAR EL ID DE AXSXRS
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
   
 return axiosClient.get(`/exposition/list-files/${idAXSXR}`);
}