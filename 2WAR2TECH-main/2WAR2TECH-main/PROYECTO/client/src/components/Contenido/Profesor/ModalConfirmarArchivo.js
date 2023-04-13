import React, { useState } from "react";
import "../../Modals/ModalsAlert.css";
import {axiosEditAsesorStatus} from '#API/Cursos.js'
import {  axiosImportStudents } from "#API/User.js";

export default function ModalConfirmarArchivo({
  closeAlert,
  alertText, 
  file,
  cxsid,
  confirmar,
  fallo,
  setisloadingfile,
  }) {
  const JWTtoken = sessionStorage.getItem("token");
  const ejecutarAxios = () => {
    
    setisloadingfile(true);
    const formData = new FormData();
    formData.append("files", file);
    formData.append("idCXS",cxsid)
    console.log(formData);
    axiosImportStudents(JWTtoken, formData)
    .then((res) => {
      console.log(res);
      closeAlert(false)
      setisloadingfile(false);
      confirmar(true);
    })
    .catch((err) => {
      setisloadingfile(false);
      // fallo(true);
      console.log(err);
    }); 
    // closeAlert(false);
  };
  return (
      <div className="modalAlertBackground">
        <div className="modalAlertContainer">
          <div className="MAbody">
            <div className="MAalert">
              <i class="bi bi-question-circle"></i>
              <div>
              <p className="textoAlertDesahabilitar" > Está por subir este archivo:  </p>
              {   file ? 
                <div>
                <p  className="textoAlertDesahabilitar">{file.name.length<27 ? file.name : `${file.name.slice(0,27)}...`}</p>
                </div>
                : null
            } 
              <p className="textoAlertDesahabilitar" >{alertText}</p>

              </div>
            </div>
            <div className="MAfooter">
           
            <button className="MAaccept" onClick={() => ejecutarAxios()} type="button">
                Aceptar
              </button>
              <button className="MAcancel" onClick={() => closeAlert(false)} type="button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
         
      </div>
  );
}
