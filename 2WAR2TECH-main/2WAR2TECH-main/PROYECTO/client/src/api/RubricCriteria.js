import axiosClient from "#API/axiosClient.js";


export const axiosAddCriteriaLevel = (JWTtoken, body) => {
     /*
        Se espera un body como:
        {
            "name": "nombre del criterio",
            "maxScore" : "20",
            "description" : "descripcion"
            "idRC": 1 (ID DEL RUBRIC CRITERIA ASOCIADO)
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
    return axiosClient.post(`/rubric/criteria/newLevel`, body);
  }

  export const axiosGetCriteriaLevel = (JWTtoken, levelCriteriaId) => {
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
    return axiosClient.get(`/rubric/criteria/level/${levelCriteriaId}`);
  }

  export const axiosEditCriteriaLevel = (JWTtoken, levelCriteriaId, body) => {
    /*
        Se espera un body como:
        {
            "name": "nombre del criterio edit",
            "maxScore" : "20",
            "description" : "descripcion edit"
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
    return axiosClient.patch(`/rubric/criteria/level_edit/${levelCriteriaId}`, body);
  }
  

  export const axiosDeleteCriteriaLevels = (JWTtoken, rubricCriteriaId, list) => {
    /*
        Se espera un body como:
        {
            "levels": [46,47]
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

      console.log(list)
    return axiosClient.delete(`/rubric/criteria/level_delete/${rubricCriteriaId}`, {data: list});
  }
  export const axiosGetAllCriteriaLevel = (JWTtoken, rubricCriteriaId, page, porPagina) => {
   //ENVIAR EL ID DE RUBRIC_CRITERIA
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
   //DEVUELVE TODOS LOS NIVELES ASOCIADOS A ESE ID
   return axiosClient.get(`/rubric/criteria/level_all/${rubricCriteriaId}`, { params: { page: page, porPagina: porPagina }});
 }