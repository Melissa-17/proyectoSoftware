import axiosClient from "#API/axiosClient.js";

export const axiosGetThesisList = (JWTtoken) => {
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

  return axiosClient.get(`/thesis/specialty/`);
};
// COORDINADOR - LISTA
export const axiosGetThesisAsesorsList = (JWTtoken, page, porPagina) => {
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

  return axiosClient.get(`/thesis/specialty/asesors`, {
    params: { page: page, porPagina: porPagina },
  });
};

export const axiosGetAsesorsThesisList = (JWTtoken, text, page, porPagina) => {
  //Si no se ingresará un texto se coloca el carácter '$'
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

  return axiosClient.get(`thesis-Asesors/specialty`, {
    params: { page: page, porPagina: porPagina, text: text },
  });
};

export const axiosNewGetAsesorsThesisList = (JWTtoken, text, page, porPagina) => {
  //NO ENVIAR TEXTO SI NO SE QUIERE FILTRAR
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

  return axiosClient.get(`thesis-Asesors/specialty-new`, {
    params: { page: page, porPagina: porPagina, text: text },
  });
};

export const axiosGetASThesisBySpecialtyList = (
  JWTtoken,
  text,
  page,
  porPagina
) => {
  //devuelve una lista de los temas de asesores en estado aprobado con su lista de alumnos asociados
  //Si no se ingresará un texto se coloca el carácter '$'
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

  return axiosClient.get(`/thesis-StudentsAsesors/specialty`, {
    params: { page: page, porPagina: porPagina, text: text },
  });
};

export const axiosGetListProposals = (JWTtoken, text, page, porPagina) => {
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

  return axiosClient.get(`/thesis/proposals`, {
    params: { text: text, page: page, porPagina: porPagina },
  });
};

export const axiosGetListProposalsStudents = (
  JWTtoken,
  text,
  page,
  porPagina
) => {
  /*
 Aquí no es necesario el $ para el texto
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
  return axiosClient.get(`/thesis/proposals/students`, {
    params: { text: text, page: page, porPagina: porPagina },
  });
};


export const axiosgetListThesisByState = (JWTtoken, status, page, porPagina, textThesis) => {
  // en status se coloca "SUSTENTADA" para listar solo de ese tipo, de lo contrario se deja vacio 
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
  return axiosClient.get(`/thesis/list-states`, {
    params: { status: status, page: page, porPagina: porPagina, textThesis: textThesis },
  });
};

export const axiosgetAsesorThesis = (JWTtoken, idThesis) => {
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
  return axiosClient.get(`/thesis-getAsesor/${idThesis}` );
 };

export const axiosPatchThesis = (JWTtoken, body) => {
  /*
      Se espera un body así:
      {
          "thesisId": "1",
          "status": "APROBADO" (o "EN OBSERVACIÓN" o "PENDIENTE")
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

  return axiosClient.patch(`/thesis/specialty/change`, body);
};

export const axiosPatchStateSupportedThesis = (JWTtoken, body) => {
  /*
      Se espera un body así:
      {
        "idThesis" : 1,
        "state" : "SUSTENTADA"
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

  return axiosClient.patch(`/thesis/change-state/Supported`, body);
};

export const axiosPatchCommentProposedThesis = (JWTtoken, body) => {
  /*
        Se espera un body así:
        {
            "thesisId": "1",
            "observacion": " observacion ejemplo"
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

  return axiosClient.patch(`/thesis/comment-post/`, body);
};

export const axiosPostRequestThesis = (JWTtoken, idUser, idThesis) => {
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

  return axiosClient.post(`/thesis/request/${idUser}/${idThesis}`);
};

export const axiosAddJuryThesis = (JWTtoken, body) => {
   /*
        Se espera un body como:
        {
            "idThesis": 12,
            "idJury": [1,2,3]
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

  return axiosClient.post(`/thesis/addJury`, body);
};
export const axiosDeleteJuryThesis= (JWTtoken, idThesis, idsJury) => {
  //recibe los ids de jurados como un arreglo por req.query
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

 return axiosClient.delete(`/thesis/delete-jury/${idThesis}`, {data : idsJury});
};

export const axiosgetJurorsThesis = (JWTtoken,idThesis,text) => {
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

  return axiosClient.get(`/thesis/juros/${idThesis}`, {params: { text: text }});
};


export const axiosPostProposeThesisStudent = (JWTtoken, body) => {
  /*
        Se espera un body así:
        {
            "title": "Desarrrollo",
            "areaName" : " dgd",
            "objective" : "grg",
            "description" : "description",
            "idsGrupo" : [1,2,3],
            "idProfesor" : "4",
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

  return axiosClient.post(`/thesis/propose-student`, body);
};

export const axiosPostProposeThesisStudentFiles = (JWTtoken, fileList) => {
  /*
         Se espera un body así:
         {
             "files": fileList,
         }
     */
  const formData = new FormData();
  for (const file in fileList) {
    formData.append("files", fileList[file]);
  }

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

  // console.log("Axios: " + JSON.stringify(body, null, 2));
  return axiosClient.post(`/thesis/propose-student-files`, formData);
};

export const axiosPostProposeThesisAsesor = (JWTtoken, body) => {
  /*
      Se espera un body así:
      {
          "title": "Desarrrollo",
          "areaName" : "dgd",
          "objective" : "grg",
          "description" : "fg"
          "files": [file1, file2] (ARREGLO DE ARCHIVOS)
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

  return axiosClient.post(`/thesis/propose-asesor`, body);
};

export const axiosaddThesisCoordinator = (JWTtoken, body) => {
  /*
      Se espera un body así:
      {
            "title": "Desarrrollo",
            "areaName" : "dgd",
            "objective" : "grg",
            "description" : "fg",
            "asesorId" : 2,
            "studentIds" : [1,5,4],
            "files": [file1, file2] (ARREGLO DE ARCHIVOS)
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

  return axiosClient.post(`/thesis/postThesis-coordinator`, body);
};

export const axiosGetThesisDetails = (JWTtoken, idThesis) => {
  //ENVIAR ID DE THESIS
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
  //REGRESA TODO EL DETALLE DE THESIS, IMPRIMIR PARA MAS DETALLES
  //EJEMPLO DE DEVOLUCION, NO HAY ARCHIVOS, ID: 1
  /*
  {
    "id": 1,
    "title": "ANÁLISIS, DISEÑO E IMPLEMENTACIÓN DE SOFTWARE PARA EL MANEJO DE LLAMADAS \nTELEFÓNICAS SOBRE REDES IP",
    "objective": null,
    "theme": "INGENIERIA DE SOFTWARE",
    "description": "El protocolo IP para direccionamiento de paquetes de datos por redes de computadoras está en la actualidad ampliamente extendido, siendo uno de los protocolos en los que tiene su base la red mundial Internet, así como las redes locales en diversas institu",
    "status": "APROBADO",
    "comment": null,
    "areaName": "SOFTWARE IMPLEMENTACION",
    "FILEs": [],
    "USERs": [
        {
            "id": 1,
            "idPUCP": "20220001",
            "name": "Gerard",
            "fLastName": "Bernabeu",
            "mLastName": "Reyes",
            "photo": null,
            "SPECIALTies": [
                {
                    "id": 13,
                    "name": "INGENIERÍA INFORMATICA"
                }
            ],
            "USER_X_THESIS": {
                "type": "OWNER"
            }
        },
        {
            "id": 6,
            "idPUCP": null,
            "name": "Giovanni ",
            "fLastName": "Rodríguez",
            "mLastName": "Ros",
            "photo": null,
            "SPECIALTies": [
                {
                    "id": 13,
                    "name": "INGENIERÍA INFORMATICA"
                }
            ],
            "USER_X_THESIS": {
                "type": "ASESOR"
            }
        }
    ]
  }
  */
  return axiosClient.get(`/thesis/details/${idThesis}`);
};

export const axiosDeleteThesis = (JWTtoken, idThesis) => {
  //SOLO ENVIAR EL ID DE THESIS
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
  //RETORNA 201 SI NO HAY PROBLEMAS, 404 SI NO HAY NADA QUE BORRAR
  return axiosClient.delete(`/thesis/delete/${idThesis}`);
};

export const axiosDeleteUserThesis = (JWTtoken, idThesis, type) => {
  //ENVIAR EL ID THESIS Y EL TIPO DEL UXT
  //LOS TIPOS SON:
  //'OWNER' - EL ALUMNO AL QUE LE PERTENECE LA TESIS
  //'ASESOR' - EL ASESOR DE LA TESIS
  //'STUDENT_POSTULANT' - EL ALUMNO QUE PROPONE LA TESIS
  //'ASESOR_TO_BE_ACCEPTED' - ASESOR PENDIENTE PARA SER ACEPTADO
  //'STUDENT_APPLICANT' - SOLICITUD DE UN ALUMNO
  //'ASESOR_POSTULANT' - ASESOR QUE PROPONE LA TESIS

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
  //RETORNA 201 SI NO HAY PROBLEMAS, 404 SI NO HAY NADA QUE BORRAR
  return axiosClient.delete(`/thesis/user-delete/${idThesis}/${type}`);
};

export const axiosGetRequestsByUser = (JWTtoken, page, porPagina) => {
  //OBTIENE LAS TESIS ASOCIADAS A UN STUDENT_APPLICANT
  //NO NECESITA ENVIAR NADA, EL IDUSER SE TIENE EN BACK
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
  //RETORNA DOS ARREGLOS, UNO DE TESIS Y OTRO DE ASESORES, ESTAN EN ORDEN
  //EJEMPLO DE OBJETO, ID USUARIO 1
  /*
  {
    "thesis": [
        {
            "id": 5,
            "title": "Desarrollo de una plataforma web para el",
            "USERs": [
                {
                    "id": 1,
                    "USER_X_THESIS": {
                        "createdAt": "2022-10-27T16:30:10.000Z"
                    }
                }
            ]
        }
    ],
    "asesors": [
        {
            "id": 6,
            "name": "Giovanni ",
            "fLastName": "Rodríguez",
            "mLastName": "Ros",
            "photo": null
        }
    ]
  }
  */
  return axiosClient.get(`/thesis/request`, {
    params: { page: page, porPagina: porPagina },
  });
};

export const axiosGetRequestsByAsesor = (JWTtoken, page, porPagina, text) => {
  //OBTIENE LAS TESIS ASOCIADAS A UN ASESOR Y LOS ALUMNOS QUE
  //LA SOLICITAN
  //ENVIAR EL TEXTO DEL BUSCADOR
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
  //RETORNA DOS ARREGLOS, UNO DE TESIS Y OTRO DE ALUMNO, ESTAN EN ORDEN
  //EJEMPLO DE OBJETO, ID USUARIO 6
  //NOTESE QUE LAS ULTIMAS TESIS NO TIENEN ESTUDIANTES QUE SOLICITAN
  /*
  {
    "thesis": [
        {
            "id": 1,
            "title": "ANÁLISIS, DISEÑO E IMPLEMENTACIÓN DE SOFTWARE PARA EL MANEJO DE LLAMADAS \nTELEFÓNICAS SOBRE REDES IP",
            "createdAt": null
        },
        {
            "id": 2,
            "title": "DESARROLLO PARA UN SISTEMA DE INFORMACIÓN DE DELIBERY",
            "createdAt": null
        },
        {
            "id": 3,
            "title": "Sistema de contratación pública a través de",
            "createdAt": null
        },
        {
            "id": 4,
            "title": "Sistema para la administración y seguimiento",
            "createdAt": null
        },
        {
            "id": 5,
            "title": "Desarrollo de una plataforma web para el",
            "createdAt": null
        },
        {
            "id": 6,
            "title": "Sistema de información de planificación de la",
            "createdAt": null
        },
        {
            "id": 7,
            "title": "Implementación de un sistema de información",
            "createdAt": null
        },
        {
            "id": 8,
            "title": "Modelo de predicción de burnout en empleados",
            "createdAt": null
        },
        {
            "id": 9,
            "title": "Chatbot conversacional que sugiere libros según",
            "createdAt": null
        },
        {
            "id": 10,
            "title": "Análisis de factores que influyen en la deserción",
            "createdAt": null
        },
        {
            "id": 11,
            "title": "Análisis de sentimiento de opiniones de",
            "createdAt": null
        },
        {
            "id": 12,
            "title": "Propuesta de rediseño de la interfaz de usuario de un",
            "createdAt": null
        }
    ],
    "students": [
        [
            {
                "id": 1,
                "name": "Gerard",
                "fLastName": "Bernabeu",
                "mLastName": "Reyes",
                "SPECIALTies": [
                    {
                        "id": 13,
                        "name": "INGENIERÍA INFORMATICA"
                    }
                ]
            }
        ],
        [
            {
                "id": 1,
                "name": "Gerard",
                "fLastName": "Bernabeu",
                "mLastName": "Reyes",
                "SPECIALTies": [
                    {
                        "id": 13,
                        "name": "INGENIERÍA INFORMATICA"
                    }
                ]
            }
        ],
        [],
        [],
        [
            {
                "id": 3,
                "name": "Alex",
                "fLastName": "Taboada",
                "mLastName": "Portocarrero",
                "SPECIALTies": [
                    {
                        "id": 13,
                        "name": "INGENIERÍA INFORMATICA"
                    }
                ]
            },
            {
                "id": 2,
                "name": "Alonso",
                "fLastName": "Casas",
                "mLastName": "Cuadra",
                "SPECIALTies": [
                    {
                        "id": 13,
                        "name": "INGENIERÍA INFORMATICA"
                    }
                ]
            }
        ],
        [
            {
                "id": 1,
                "name": "Gerard",
                "fLastName": "Bernabeu",
                "mLastName": "Reyes",
                "SPECIALTies": [
                    {
                        "id": 13,
                        "name": "INGENIERÍA INFORMATICA"
                    }
                ]
            }
        ],
        [],
        [],
        [
            {
                "id": 1,
                "name": "Gerard",
                "fLastName": "Bernabeu",
                "mLastName": "Reyes",
                "SPECIALTies": [
                    {
                        "id": 13,
                        "name": "INGENIERÍA INFORMATICA"
                    }
                ]
            }
        ],
        [],
        [],
        []
    ]
  }
  */
  return axiosClient.get(`/thesis/request/asesor`, {
    params: {page: page, porPagina: porPagina, text: text }
  });
};

export const axiosGetDetailRequestsByAsesor = (JWTtoken, text, idThesis) => {
  //OBTIENE LAS TESIS ASOCIADAS A UN ASESOR Y LOS ALUMNOS QUE
  //LA SOLICITAN
  //ENVIAR EL TEXTO DEL BUSCADOR
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
  return axiosClient.get(`/thesis/request/asesor/${idThesis}`, {
    params: { text: text },
  });
};

export const axiosSelectStudentsPostulant = (JWTtoken) => {
  /*
        Se espera un body como:
        {
            "idThesis": 10,
            "idUser": [1,2,3]
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
  return axiosClient.patch(`/thesis/request/asesor`);
};

export const axiosGetTeam = (JWTtoken, thesisId) => {
  /*
        
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
  return axiosClient.get(`/thesis/team/${thesisId}`);
};

export const axiosLinkThesisTeam = (JWTtoken, body) => {
  //LINKEA UN EQUIPO CON UNA TESIS
  /*
  {
    idThesis: 1 //ID DE LA TESIS
    idTeam: 1 //ID DEL TEAM
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
  return axiosClient.post(`/thesis/link-team`, body);
};

export const axiosUnselectTeam = (JWTtoken, body) => {
  /*
        Se espera un body como:
        {
            "idThesis": 10,
            "idTeam": 1
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
  return axiosClient.patch(`/thesis/request/unselect`, body);
};

export const axiosEditThesis= (JWTtoken, idThesis, body) => {
  /*
        Se espera un body como: 
        {
            "tema": ":)",
            "objective": "XD",
            "area": "¬¬",
            "description": ":o"
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
  return axiosClient.patch(`/thesis/detail/${idThesis}`, body);
};

export const axiosAddAsesor= (JWTtoken, idThesis, idUser) => {
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
  return axiosClient.post(`/thesis/detail/asesor/${idThesis}/${idUser}`);
};

export const axiosAddStudent = (JWTtoken, idThesis, idUser) => {
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
  return axiosClient.post(`/thesis/detail/student/${idThesis}/${idUser}`);
};

export const axiosDeleteAsesor= (JWTtoken, idUser) => {
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
  return axiosClient.delete(`/thesis/delete-asesor/${idUser}`);
};

export const axiosUnlinkAsesor= (JWTtoken, idThesis, idUser) => {
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
  return axiosClient.delete(`/thesis/unlink-asesor/${idThesis}/${idUser}`);
};

export const axiosUnlinkStudent = (JWTtoken, idThesis, idUser) => {
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
  return axiosClient.delete(`/thesis/unlink-student/${idThesis}/${idUser}`);
};

export const axiosGetTrazability = (JWTtoken, idThesis, page, porPagina) => {
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
  return axiosClient.get(`/thesis/trazability/${idThesis}`,{ params: { page: page, porPagina: porPagina}});
};