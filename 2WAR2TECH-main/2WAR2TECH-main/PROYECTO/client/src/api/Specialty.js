import axiosClient from "#API/axiosClient.js";

export const axiosGetSpecialties = (JWTtoken) => {
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
      
    return axiosClient.get(`/specialties/list/`);
}

export const axiosGetDetailSpecialty = (JWTtoken, idS) => {
  //OBTIENE LOS DETALLES DE UNA ESPECIALIDAD
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
    
  return axiosClient.get(`/specialties/detail/${idS}`);
}

export const axiosGetToBeCoordinator = (JWTtoken, idS) => {
  //OBTIENE LOS POSIBLES COORDINADORES PARA UNA ESPECIALIDAD (OSEA LOS PROFESORES)
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
    
  return axiosClient.get(`/specialties/p-coordinator/${idS}`);
}

export const axiosDeleteSpecialty = (JWTtoken, idS) => {
  //ENVIAR EL ID DE UNA ESPECIALIDAD A BORRAR
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
    
  return axiosClient.delete(`/specialties/delete/${idS}`);
}

export const axiosPostSpecialty = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO:
  /*
  {
    name: NOMBRE DE LA ESPECIALIDAD
    idF: ID DE LA FACULTAD
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
    
  return axiosClient.post(`/specialties/post`, body);
}

export const axiosPatchSpecialty = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO:
  /*
  {
    idS: ID DE LA ESPECIALIDAD
    name: NOMBRE DE LA ESPECIALIDAD
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
    
  return axiosClient.patch(`/specialties/patch`, body);
}

export const axiosListCoordinators = (JWTtoken, page, porPagina) => {
  //ENVIAR LA PAGINA Y EL TAMAÑO DE PAGINA
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
  //REGRESA LA LISTA DE COORDINADORES + SUS ESPECIALIDADES
  return axiosClient.get(`/specialties/coordinators/list`, { params: { page: page, porPagina: porPagina }});
}

export const axiosPostCoordinator = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO
  /*
    {
      name: NOMBRE,
      fLastName: APELLIDO PATERNO,
      mLastName: APELLIDO MATERNO,
      email: CORREO ELECTRONICO,
      idPUCP: CODIGO PUCP
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
  //RETORNA EL COORDINADOR CREADO
  return axiosClient.post(`/specialties/coordinators/post`, body);
}

export const axiosPatchCoordinator = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO
  /*
    {
      idU: ID DEL COORDINADOR,
      name: NOMBRE,
      fLastName: APELLIDO PATERNO,
      mLastName: APELLIDO MATERNO,
      email: CORREO ELECTRONICO,
      idPUCP: CODIGO PUCP,
      idS: ID DE LA ESPECIALIDAD (OJO QUE SI SE ENVIA, SE ELIMINARA, SI NO SE QUIERE ELIMINAR, NO ENVIAR)
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
  //RETORNA LOS RESULTADOS
  return axiosClient.patch(`/specialties/coordinators/patch`, body);
}

export const axiosPostCoordinatorToSpecialty = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO
  /*
    {
      idU: ID DEL COORDINADOR,
      idS: ID DE LA ESPECIALIDAD
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
  //RETORNA LOS RESULTADOS
  return axiosClient.post(`/specialties/coordinators/post-specialty`, body);
}

export const axiosDeleteCoordinators = (JWTtoken, idU) => {
  //ENVIAR LOS ID DE LOS USUARIOS A ELIMINAR EN UN ARREGLO
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
  //RETORNA LOS RESULTADOS
  return axiosClient.delete(`/specialties/coordinators/delete`, { params: { idU: idU }});
}

export const axiosGetDetailCoordinator = (JWTtoken, idU) => {
  //ENVIAR EL ID DEL COORDINADOR
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
  //REGRESA SUS DETALLES + SUS ESPECIALIDADES
  return axiosClient.get(`/specialties/coordinators/detail/${idU}`);
}

export const axiosDisableSpecialty = (JWTtoken, idU,idEsp) => {
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
    
  return axiosClient.delete(`/specialties/coordinators/disable/${idU}/${idEsp}`);
}