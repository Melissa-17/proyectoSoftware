import axiosClient from "#API/axiosClient.js";

export const SubmitFileData = (fileList,JWTtoken,idAXS) =>{
  //ENVIAR UN ARREGLO DE ARCHIVOS Y EL ID DEL AXS
  const formData = new FormData();
  for(const file in fileList) {
    formData.append("files", fileList[file]);
  }
  formData.append("idAXS", idAXS)
  ;
  // console.log(...formData);
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
  //REGRESA LOS OBJETOS CREADOS EN LA BD
  return axiosClient.post(`/file/`,formData);
}

export const axiosGetRoles = (JWTtoken) => {
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

export const SubmitFileDataAdeviser = (fileList,JWTtoken,idAXSXR) =>{
  //ENVIAR UN ARREGLO DE ARCHIVOS Y EL ID DEL AXSXR
  const formData = new FormData();
  console.log(idAXSXR);
  for(const file in fileList) {
    formData.append("files", fileList[file]);
  }
  formData.append("idAXSXR",idAXSXR)
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
  //REGRESA LOS OBJETOS CREADOS EN LA BD
  return axiosClient.post(`/file/`,formData);
}

export const SubmitFileDataThesis = (JWTtoken, idThesis, fileList) =>{
  //ENVIAR EL ID DE LA TESIS Y LA LISTA DE ARCHIVOS EN UN ARREGLO
  const formData = new FormData() ;
  for(const file in fileList) {
    formData.append("files", fileList[file]);
  }
  formData.append("idThesis", idThesis)
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
  //REGRESA LOS OBJETOS CREADOS EN LA BD
  return axiosClient.post(`/file/`, formData);
}

export const axiosGetIdRevisor= (JWTtoken,idAXS) => {
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
  return axiosClient.get(`/Assigment-Student-Revisor/list/${idAXS}`);
}