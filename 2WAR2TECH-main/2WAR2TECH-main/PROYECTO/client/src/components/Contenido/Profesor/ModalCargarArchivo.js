import React, { useState } from "react";
import "../../Modals/ModalsAlert.css";
import {axiosEditAsesorStatus} from '#API/Cursos.js'
import {  axiosImportStudents } from "#API/User.js";

export default function ModalCargarArchivo({
  closeAlert,
  alertText, 
  setFile,
  subioArchivo 
 }) {
  const JWTtoken = sessionStorage.getItem("token");
  const [buscadorArchivos,abrirbuscadorArchivos]=useState(false);
  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      subioArchivo(true);
    }
    console.log(newFile);
    // const formData = new FormData();
    // formData.append("files", newFile);
    // formData.append("idCXS",cxsid)
    // console.log(formData);
    // axiosImportStudents(JWTtoken, formData)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // }); 
    closeAlert(false);
  };
  return (
      <div className="modalAlertBackground">
        <div className="modalAlertContainer">
          <div className="MAbody">
            <div className="MAalert">
              <i class="bi bi-question-circle"></i>
              {/* <p 
              className="textoAlertDesahabilitar"
              >TEXTO DE PRUEBA A </p> */}
              <p
              className="textoAlertDesahabilitar"
              >{alertText}</p>
            </div>
            <div className="MAfooter">
              <div className="botonAceptar" >
                <input className="inputdemierda"
                    type="file"
                    accept=".xls,.xlsx,.csv"
                    multiple
                    onChange={onFileChange}
                    enabled
                    />
                    <div className="text-information">Subir</div>
              </div>
              <button className="MAcancel" onClick={() => closeAlert(false)} type="button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
         
      </div>
  );
}
