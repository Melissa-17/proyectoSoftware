import axiosClient from "#API/axiosClient.js";

export const axiosGetSchedule = (JWTtoken,idCurso, idSem, page, porPagina) => {
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
        }
    );      
    return axiosClient.get(`/schedule/list/${idSem}/${idCurso}`,  { params: { page: page, porPagina: porPagina}});
}

export const axiosAddSchedule = (JWTtoken,body) => {
    /*
    Espera un body tal como:
    {
        "idSem": "4",
        "idCurso": "1",
        "name": "HORARIO NUMERO 2",
        "abbreviation": "H-202"
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
        }
    );      
    return axiosClient.post(`/schedule`,body);
}
export const axiosCopySchedule = (JWTtoken,body) => {
    /*
    Espera un body tal como:
    {
        "idSem": "5",
        "idCurso": "1",
        "name": "HORARIO NUMERO 4",
        "abbreviation": "H-204",
        "idCxSCopia:"1",
        "copiarFechas": "0" //0 si no copia fechas, 1 si sí
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
        }
    );      
    return axiosClient.post(`/schedule/copy`,body);
}

export const axiosDeleteHorario = (JWTtoken, idHorario) => {
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
    return axiosClient.delete(`/schedule/${idHorario}`);
  }

  export const axiosEditSchedule = (JWTtoken,body) => {
      /*
    Espera un body tal como:
    {
        "idHorario": "1",
        "name": "HORARIO NUMERO 2",
        "abbreviation": "H-202"
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
          }
      );      
      return axiosClient.patch(`/schedule`,body);
  }
  
export const axiosGetDetailSchedule = (JWTtoken,idHorario) => {
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
        }
    );      
    return axiosClient.get(`/schedule/detail/${idHorario}`);
}
  
export const axiosGetProfessors = (JWTtoken,page,porPagina, text) => {
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
        }
    );      
    return axiosClient.get(`/professors/list`,{ params: { page: page, porPagina: porPagina, text: text }});
}
  
export const axiosDeleteProfessor = (JWTtoken,idProf) => {
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
        }
    );      
    return axiosClient.delete(`/professors/${idProf}`);
}

export const axiosGetScheduleProfessor = (JWTtoken,idCurso, idSem, idProf, page, porPagina) => {
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
        }
    );      
    return axiosClient.get(`/schedule/professor/${idSem}/${idCurso}/${idProf}`,  { params: { page: page, porPagina: porPagina}});
}