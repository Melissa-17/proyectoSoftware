import React, { useState } from "react";
import "../../Modals/ModalsAlert.css";
import {axiosEditAsesorStatus} from '#API/Cursos.js'

export  function ModalDeshabilitar({
  closeAlert,
  alertText,
  modalMessage,
  asesor,
  cambiar,
  viejoEstado,
 }) {
  const JWTtoken = sessionStorage.getItem("token");
  const nuevoestado=viejoEstado=='H'?'D':'H'; 
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
              <button
                className="MAaccept"
                onClick={() => {
                    if(nuevoestado=='H'){
                        cambiar('H');
                    }
                    if(nuevoestado=='D'){
                        cambiar('D'); 
                    }
                    
                    axiosEditAsesorStatus(JWTtoken, {
                        idU: asesor.USERId,
                        idCXS:asesor.COURSEXSEMESTERId,
                        status: nuevoestado,
                      })
                    .then((res) => {
                      console.log(res);
                      console.log("entra por la puta madre codigo de mierda estoy harta");
                      console.log(asesor);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                    closeAlert(false);
                  modalMessage ? modalMessage(true) : (() => {})();
                }}
                type="submit"
                form="pantallaGestionPersonaProfesor"
              >
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
