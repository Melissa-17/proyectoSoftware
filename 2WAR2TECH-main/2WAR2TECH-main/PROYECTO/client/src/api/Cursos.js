import axiosClient from "#API/axiosClient.js";

export const axiosGetCursosBySemesterId = (JWTtoken, idSemester) => {
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
    
    return axiosClient.get(`/semester/courses/list/${idSemester}`);
}


export const axiosAddCourseXSemester = (JWTtoken, semesterId, formData) => {
  /*
  Espera un body tal como:
  {
      "cursos": [{"id": "1", "users": [1,2,3,4,5]},
          {"id": "2", "users": [1,2,3]}]
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
  
  return axiosClient.post(`/semester/list/${semesterId}`, formData);
}

export const axiosGetProfesorList = (JWTtoken, text) => {
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
  
  return axiosClient.get(`/semester/profesors/list?text=${text}`);
}

export const axiosEditCoursexSemester = (JWTtoken, idSemester) => {
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

  return axiosClient.get(`/semester/list/edit/${idSemester}`);
}

export const axiosAddUserToCourse = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO EL SIGUIENTE
  /*
  {
    idU: 1 //ID DEL USUARIO
    idCXS: 1 //ID DEL CURSO_X_SEMESTRE
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

  return axiosClient.post(`/courses/add-student`, body);
}
export const axiosEditAsesorStatus = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO EL SIGUIENTE
  /*
  {
    idU: 1 //ID DEL USUARIO
    idCXS: 1 //ID DEL CURSO_X_SEMESTRE
    status: 'D' //estado del asesor
  }
  D es DESHABILITADO
  H es HABILITADO
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

  return axiosClient.patch(`/course-semester-user/status-asesor`, body);
}

export const axiosGetCoursesBySpecialty = (JWTtoken) => {
  //NO ENVIAR NADA, YA SE TIENE LA ESPECIALIDAD DEL USUARIO
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
  //RETORNA LA LISTA DE CURSOS DE LA ESPECIALIDAD + SUS HORARIOS
  return axiosClient.get(`/courses/specialty`);
}

export const axiosAddCourse = (JWTtoken, formData) => {
  /*
  Espera un body tal como:
  {
      "name": "Proyecto de Tesis 5",
      "code": "INF123"
      "credits": "3.5"        
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
  
  return axiosClient.post(`/courses/create`, formData);
}

export const axiosEditCourse = (JWTtoken, idCurso, formData) => {
  /*
    Espera un body tal como:
    {
        "name": "Proyecto de Tesis 5",
        "code": "INF123"
        "credits": "3.5"        
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

  return axiosClient.patch(`/courses/${idCurso}`,formData);
}

export const axiosGetDetailCourse = (JWTtoken, idCurso) => {
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

  return axiosClient.get(`/courses/${idCurso}`);
}

export const axiosDeleteCourse = (JWTtoken, idCurso) => {
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
  return axiosClient.delete(`/courses/${idCurso}`);
}

export const axiosGetCBCourse = (JWTtoken) => {
  //NO ENVIAR NADA
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
  //REGRESA LA LISTA DE CURSOS POR ESPECIALIDAD DEL USUARIO, PARA UN COMBO-BOX
  return axiosClient.get(`/courses-cb/list`);
}

export const axiosGetCBSchedules = (JWTtoken, idC, idS) => {
  //ENVIAR EL ID DEL CURSO Y DEL SEMESTRE A OBTENER EL HORARIO
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
  //REGRESA LA LISTA DE CURSOS POR ESPECIALIDAD DEL USUARIO, PARA UN COMBO-BOX
  return axiosClient.get(`/courses-cb/list`);
}