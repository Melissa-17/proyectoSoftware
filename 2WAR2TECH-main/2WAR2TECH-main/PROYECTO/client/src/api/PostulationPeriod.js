import axiosClient from "#API/axiosClient.js";

export const axiosGetPostulationPeriod = (JWTtoken) => {
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
    
    return axiosClient.get(`/postulation-period`);
}


export const axiosGetPostulationPeriodByName = (JWTtoken, type) => {

  //type debe ser : 'propuesta' o 'solicitud'
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
  
  return axiosClient.get(`/postulation-period/${type}`);
}

export const axiosAddPostulationPeriod = (JWTtoken, formData) => {
  //tipo debe ser : 'propuesta' o 'solicitud'
  /*
    Se espera un body así: (formato: "aaaa-mm-dd")
    {
        "tipo" : "solicitud",
        "startDate": "2022-09-18",
        "endDate": "2022-09-30"
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
    
    return axiosClient.post(`/postulation-period`, formData);
}

export const axiosEditPostulationPeriod = (JWTtoken, formData) => {
  //tipo debe ser : 'propuesta' o 'solicitud'
  
  /*
    Se espera un body así: (formato: "aaaa-mm-dd")
    {
         "tipo" : "solicitud",
        "startDate": "2022-09-18",
        "endDate": "2022-09-30"
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
    
    return axiosClient.patch(`/postulation-period`, formData);
}