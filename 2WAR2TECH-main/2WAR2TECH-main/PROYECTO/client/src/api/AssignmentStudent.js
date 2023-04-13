import axiosClient from "#API/axiosClient.js";

export const axiosGetAssignmentStatus = (JWTtoken, idAXS) => {
    //ENVIAR EL ID DE ASSINGMENT X STUDENT
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
    //REGRESA SOLO EL ESTADO
    return axiosClient.get(`/Assigment-Student-Revisor/status/${idAXS}`);
}

export const axiosGetAssignmentByTypeByCourse = (JWTtoken, idCXS, type, page, porPagina) => {
  //ENVIAR EL ID DE CURSO X SEMESTRE Y EL TIPO DE ENTREGA
  //'PARTIAL ASSIGN'
  //'FINAL ASSIGN'
  //'EXPOSITION'
  //'TODOS'
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
  //REGRESA SOLO EL ESTADO
  return axiosClient.get(`/Assigment-Student-Revisor/list-course/${type}/${idCXS}`,{params: {  page: page, porPagina: porPagina}});
}

export const axiosDeleteAssignment = (JWTtoken, idAssignment) => {
  //ENVIAR UN ARREGLO(idAssignment) CON LOS ID DE LOS ASSIGNMENT A BORRAR 
  //devuelve los ids de los assignments eliminados
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
  return axiosClient.delete(`/Assigment-Student-Revisor/delete-a`,{params: {  idAssignment: idAssignment}});
}



export const axiosGetDetailAssignment = (JWTtoken, idAssignment) => {
  //ENVIAR EL ID DEL ASSIGNMENT
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
  //REGRESA LOS DETALLES, EJEMPLO DE OBJETO CON ID 1:
  /*
  {
    "id": 1,
    "assignmentName": "Conceptos Generales",
    "chapterName": "EP1.1",
    "limitCompleteDate": "2022-08-22T00:00:00.000Z",
    "limitCalificationDate": "2022-08-25T00:00:00.000Z",
    "limitRepositoryUploadDate": null,
    "startDate": "2022-08-15T00:00:00.000Z",
    "endDate": "2022-08-22T00:00:00.000Z",
    "ASSIGNMENT_TASKs": [
        {
            "id": 1,
            "name": " Ficha de registro de idea de tesis y asesor."
        }
    ],
    "ROLEs": [
        {
            "description": "Asesor",
            "ASSIGNMENT_X_ROLE": {
                "name": "Revisor"
            }
        },
        {
            "description": "Profesor",
            "ASSIGNMENT_X_ROLE": {
                "name": "Evaluador"
            }
        },
        {
            "description": "Alumno",
            "ASSIGNMENT_X_ROLE": {
                "name": "Responsable"
            }
        }
    ]
  }
  */
  return axiosClient.get(`/Assigment-Student-Revisor/detail-a/${idAssignment}`);
}

export const axiosPostAssignment = (JWTtoken, assignment) => {
  //ENVIAR EL BODY DE ASSIGNMENT, QUE ES COMO:
  /*
  {
    "aName": "PRUEBA A", (EL NOMBRE DEL ASSIGNMENT)
    "cName": "NOMBRE CAPITULO", (EL NOMBRE DEL CAPITULO)
    "sDate": "2022-10-29", (LA FECHA DE COMIENZO)
    "eDate": "2022-10-29", (LA FECHA DE FIN)
    "cmDate": "2022-10-29", (LA FECHA DE LIMITE DE COMPLETAR)
    "clDate": "2022-10-29", (LA FECHA LIMITE DE CALIFICAR)
    "rDate": "2022-10-29", (LA FECHA LIMITE DE SUBIDA AL REPO)
    "type": "FINAL ASSIGN", (TIPO DE ASSIGNMENT)
    "aComments": "COMENTARIO EXTRA", (COMENTARIOS EXTRA)
    "idCXS": 1, (ID DEL CURSO X SEMESTRE AL QUE PERTENEZA)
    "tasks": [ "TAREA 1", "TAREA 2", "TAREA 3"], (ARREGLO CON LOS NOMBRES DE LAS TAREAS)
    "revisor": [ 1, 2 ], (ARREGLO DE ID DE LOS ROLES QUE SERAN REVISORES)
    "evaluador": [ 1, 2 ], (ARREGLO DE ID DE LOS ROLES QUE SERAN EVALUADORES)
    "responsable": [ 1, 2 ] (ARREGLO ID DE LOS ROLES QUE SERAN RESPONSABLES)
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
  //RETORNA LOS RESULTADOS DE LA INSERCION
  return axiosClient.post(`/Assigment-Student-Revisor/insert-a`, assignment);
}

export const axiosChangeAssignmentStatus = (JWTtoken, body) => {
  /*
    {
      "idAXS": 1 (EL ID DE ASSIGNMENT X STUDENT),
      "status": "Calificado" (ESTADO DE ASSIGNMENT X STUDENT)
    }
    ESTADOS:
    Asignado,
    Calificado,
    Entregado
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
  //RETORNA EL AXS actualizado
  return axiosClient.patch(`/Assigment-Student-Revisor/status/change`, body);
}

export const axiosGetAssignmentRevisor = (JWTtoken, idAXS) => {
  //ENVIAR EL ID DEL ASSIGNMENT X STUDENT
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
  //RETORNA LOS REVISORES DE UN AXS
  return axiosClient.get(`/Assigment-Student-Revisor/list-revisors/${idAXS}`);
}

export const axiosModifyAssignment = (JWTtoken, assignment) => {
  //ENVIAR EL BODY DE ASSIGNMENT, QUE ES COMO:
  /*
  {
    "idA": 1 (ID DEL ASSIGNMENT)
    "aName": "PRUEBA A", (EL NOMBRE DEL ASSIGNMENT)
    "cName": "NOMBRE CAPITULO", (EL NOMBRE DEL CAPITULO)
    "sDate": "2022-10-29", (LA FECHA DE COMIENZO)
    "eDate": "2022-10-29", (LA FECHA DE FIN)
    "cmDate": "2022-10-29", (LA FECHA DE LIMITE DE COMPLETAR)
    "clDate": "2022-10-29", (LA FECHA LIMITE DE CALIFICAR)
    "rDate": "2022-10-29", (LA FECHA LIMITE DE SUBIDA AL REPO)
    "type": "FINAL ASSIGN", (TIPO DE ASSIGNMENT)
    "idCXS": 1, (ID DEL CURSO X SEMESTRE AL QUE PERTENEZA)
    "tasks": [ "TAREA 1", "TAREA 2", "TAREA 3"], (ARREGLO CON LOS NOMBRES DE LAS TAREAS)
    "responsables": [ 1, 2 ] (ARREGLO ID DE LOS ROLES QUE SERAN RESPONSABLES)
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
  //RETORNA LOS RESULTADOS DE LA ACTUALIZACION
  return axiosClient.patch(`/Assigment-Student-Revisor/modify-a`, assignment);
}