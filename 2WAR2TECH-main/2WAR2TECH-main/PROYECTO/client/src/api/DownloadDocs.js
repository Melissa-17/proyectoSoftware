import axiosClient from "#API/axiosClient.js";

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const axiosDownloadDocs = (JWTtoken,item) => {
  //ENVIAR UN OBJETO EN PLAN
  /*
  {
    id: ID DEL ARCHIVO
    filename: NOMBRE DEL ARCHIVO
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
  //REGRESA UN FILESTREAM, REVISAR LA PANTALLA DE ENTREGABLE PARA VER COMO SE DESCARGA
  return axiosClient.get(`/file/one/${item.id}-${removeAccents(item.filename)}`);
}