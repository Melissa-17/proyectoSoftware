import axiosClient from "#API/axiosClient.js";

export const axiosGetUserAuth = () => {
    return axiosClient.get(`test-user/auth/success`);
}

export const axiosGetListOfStudents = (JWTtoken, data, page, porPagina, text) => {
  /*
  Se espera un body como:
  {
      "ciclo": "5",
      "curso": "1",
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
    
    return axiosClient.patch(`/Assigment-Student-Revisor/students/list`, data, { params: { page: page, porPagina: porPagina, text: text}});
}


export const axiosGetUserInfo = (JWTtoken) => {
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
  
  return axiosClient.get(`/user`);
}

export const axiosGetRegisteredStudent = (JWTtoken, cursoxsemesterid,text, page, porPagina) =>{
//si no se ingresa nada a text, igual lista todo, no se necesita agregar $
  axiosClient.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `${JWTtoken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  
  return axiosClient.get(`/students-management/${cursoxsemesterid}`, { params: { text: text, page: page, porPagina: porPagina } })
};


export const axiosListStudentWithThesisAndAsesor = (JWTtoken, cursoxsemesterid,text, page, porPagina) =>{
  //si no se cuenta con asesor, el arreglo USER_X_THEses dentro de THESIS saldrá vacío.
    axiosClient.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `${JWTtoken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    
    return axiosClient.get(`/students-management/${cursoxsemesterid}`, { params: { text: text, page: page, porPagina: porPagina } })
  };

export const axiosGetRegisteredAsesors = (JWTtoken, cursoxsemesterid,text, page, porPagina) =>{
  //si no se ingresa nada a text, igual lista todo, no se necesita agregar $
    axiosClient.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `${JWTtoken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    
    return axiosClient.get(`/asesors-management/${cursoxsemesterid}`, { params: { text: text, page: page, porPagina: porPagina } })
  };

  export const axiosGetStudentsAsesors = (JWTtoken, asesorId,text, page, porPagina) =>{

      axiosClient.interceptors.request.use(
        async (config) => {
          config.headers = {
            Authorization: `${JWTtoken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          };
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );
      
      return axiosClient.get(`/management/asesor/students/${asesorId}`, { params: { text: text, page: page, porPagina: porPagina } })
    };

    export const axiosDeleteUser = (JWTtoken,formData,idCxS = -1) => {
      /*
      Espera un body tal como:
      {
          "ids": [1,2,3]
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
        
        return axiosClient.delete(`/users-management/delete/${idCxS}`, {data: formData});
    }

    export const axiosrdeleteJuryRole = (JWTtoken,formData) => {
      /*
      Espera un body tal como:
      {
          "ids": [1,2,3]
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
        
        return axiosClient.delete(`/users/delete-jury`, {data: formData});
    }

export const axiosGetAsesorByStudent = (JWTtoken,idUser,idCxS) => {
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
    
    return axiosClient.get(`/user/asesor/${idUser}/${idCxS}`);
}
export const axiosGetSchedulesUser = (JWTtoken,semesterId) => {
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
  
  return axiosClient.get(`/users/Schedules/${semesterId}`);
}


export const axiosPostTeam = (JWTtoken, formData) => {
  /*
    Espera un body tal como:
    {
        "studentIds": [1,2,3],
        "thesisId": 1
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
    
    return axiosClient.post(`/team/users`, formData);
}

export const axiosGetFreeUsers = (JWTtoken) => {
  //RETORNA LOS ALUMNOS NO ASOCIADOS A NINGUN CURSO
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
    
    return axiosClient.get(`/users/free`);
}

export const axiosGetNoThesisUsers = (JWTtoken) => {
  //RETORNA LOS ALUMNOS SIN NINGUNA TESIS ASOCIADA
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
    
    return axiosClient.get(`/users/free-thesis`);
}


export const axiosPostAddStudent = (formData) => {
  /*
   Espera un body tal como:
    {
        "names": "Eduardo Andre",
        "fLastName":"Rodriguez",
        "mLastName":"Gonzalez",
        "idSpecialty" : "1",
        "codigo": "20185478",
        "email": "20185478@pucp.edu.pe",  
        "password" : "1234"
    }   
    */
    
    return axiosClient.post(`/login/create/user`, formData);
}

export const axiosLogin = (formData) => {
  /*
   Espera un body tal como:
    {
            "email": "asfas@gmail.com",
            "password": "123456"
    }  
    */
    
    return axiosClient.post(`/login`, formData);
}

export const axiosImportStudents = (JWTtoken, body) => {
  //ENVIAR EL ARCHIVO EXCEL Y EL CURSOXSEMESTREId
  //ENVIARLO COMO FORM DATA
  /*
  {
    files: []
    idCXS: 1
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
    
    return axiosClient.post(`/users/import`, body);
}

export const axiosSetAssignmentsToStudents = (JWTtoken, body) => {
  //ENVIAR UN BODY COMO
  /*
  {
    idCXS: 1
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
    
    return axiosClient.post(`/users/set-assignments`, body);
}

export const axiosPostNewCoordinator = (JWTtoken, body) => {
  //ENVIAR EL ARCHIVO EXCEL Y EL CURSOXSEMESTREId
  //ENVIARLO COMO FORM DATA
  /*
  {
    name: BRYAN
    fLastname: RUIZ
    mLastname: RAMIREZ
    idPUCP: 20191151
    email: a20191151@pucp.edu.pe
    idCXS: 1 //CURSO X SEMESTRE DEL QUE SERÁ EL COORDINADOR
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
    
    return axiosClient.post(`/users/new-coord`, body);
}

export const axiosEditUser = (JWTtoken, body) => {
   /*
   Espera un body tal como:
   {
       "names": "Eduardo Andre",
       "fLastName":"Rodriguez",
       "mLastName":"Gonzalez",
       "codigo": "20185478",
       "email": "20185478@pucp.edu.pe"
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
    
    return axiosClient.patch(`/users-management/edit`, body);
}

export const axiosGetThesisGroupByAsesor = (JWTtoken, data, page, porPagina, text) => {
  /*
    Se espera un body como:
    {
        "ciclo": "4",
        "curso": "1"
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
    
    return axiosClient.patch(`/Assigment-Student-Revisor/students/groupList`, data, { params: { page: page, porPagina: porPagina, text: text}});
}

export const axiosAddTeacherSchedule = (JWTtoken, body) => {
  axiosClient.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `${JWTtoken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return axiosClient.post(`/profesors/add-schedule`, body);
};

export const axiosDeleteTeacherSchedule = (JWTtoken, idHorarios, idTeacher) => {
//idHorarios es un arreglo de ids de cursoxsemestre
  
axiosClient.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `${JWTtoken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

  return axiosClient.delete(`/profesors/delete-schedule`, {params:{idHorarios:idHorarios , idTeacher : idTeacher} });
};

export const axiosPostGenericUser = (JWTtoken, body) => {
  //INSERTAR USUARIO GENERICO, ACTUALMENTE FUNCIONA PARA:
  //ADMIN -> COORDINADOR
  //COORDINADOR -> PROFESOR
  //SE ASIGNARA UN ROL CORRESPONDIENTE
  //ENVIAR UN BODY COMO:
  /*
  {
    name: NOMBRES DEL USUARIO,
    fLastName: APELLIDO PATERNO,
    mLastName: APELLIDO MATERNO,
    email: EMAIL DEL USUARIO,
    idPUCP: CODIGO PUCP,
    idR: ID DEL ROL A ASIGNAR (4 - PROFESOR POR DEFECTO)
  }
  */
  axiosClient.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `${JWTtoken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  //ESTA URL ES LA CORRECTA, RETORNA EL USUARIO CREADO
  return axiosClient.post(`/users/new-coord`, body);
};

export const axiosPatchGenericUser = (JWTtoken, body) => {
  //PATCH GENERICO DE UN USUARIO, FUNCIONA PARA COORDINADOR, USUARIO Y PROFESOR
  //ENVIAR UN BODY COMO
  /*
    {
      idU: ID DEL USUARIO,
      name: NOMBRE,
      fLastName: APELLIDO PATERNO,
      mLastName: APELLIDO MATERNO,
      email: CORREO ELECTRONICO,
      idPUCP: CODIGO PUCP,
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
  //ESTA URL ES LA CORRECTA, RETORNA EL USUARIO EDITADO
  return axiosClient.patch(`/specialties/coordinators/patch`, body);
}

export const axiosGetDetailGenericUser = (JWTtoken, idU, idS = null) => {
  //ENVIAR EL ID DEL USUARIO
  //ACTUALMENTE FUNCIONA PARA:
  //ADMIN -> COORDINADOR Y USUARIO (REGRESA CON ESPECIALIDADES)
  //COORDINADOR -> PROFESOR (REGRESA CON HORARIOS)
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
  //ESTA ES LA URL CORRECTA, REGRESA SUS DETALLES + LO NECESARIO SEGUN EL ROL
  return axiosClient.get(`/specialties/coordinators/detail/${idU}`, { params: { idS: idS }});
}

export const axiosGetAsesorsBySpecialty = (JWTtoken, page, porPagina, text) => {

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
 
  return axiosClient.get(`/users/asesors/specialty`,{params: { page: page, porPagina: porPagina, text: text },
  });
}

export const axiosGetJurys = (JWTtoken,page,porPagina) => {
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
  return axiosClient.get(`/jurys/list`,{ params: { page: page, porPagina: porPagina}});
}
  
export const axiosDeleteJury = (JWTtoken,idJury) => {
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
    return axiosClient.delete(`/jurys/${idJury}`);
}

export const axiosEditEmail = (JWTtoken, formData) => {
  /*
    Espera un body tal como:
    {
       "email": "20185478@pucp.edu.pe"
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
    
    return axiosClient.patch(`/user-editEmail`, formData);
}

export const axiosEditPassword = (JWTtoken, formData) => {
  /*
    Espera un body tal como:
    {
       "password": "54521"
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
    
    return axiosClient.patch(`/user-editPassword`, formData);
}

export const axiosEditPhoto = (JWTtoken, formData) => {
  /*
    Espera un body tal como:
    {
        "idU": ID DE USUARIOS
        "files": [ARREGLO DE ARCHIVOS]
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
    
    return axiosClient.patch(`/users/edit-photo`, formData);
}