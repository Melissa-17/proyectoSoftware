import React, { useState } from "react";
import "../../Modals/ModalsAlert.css"; 

export default function ModalCambio({
  closeAlert,
  NuevoEstado,    
  ejecutarAxios,
  enviarobservacion,
  observacion
  }) {
  const JWTtoken = sessionStorage.getItem("token");
  
  return (
      <div className="modalAlertBackground">
        <div className="modalAlertContainer">
          <div className="MAbody">
            <div className="MAalert">
              <i class="bi bi-question-circle"></i>
              <div>
              <p className="textoAlertDesahabilitar" > Estas por cambiar el estado a  </p>
              <p className="textoAlertDesahabilitar" >{NuevoEstado}</p>
              <p className="textoAlertDesahabilitar" >¿Estás seguro de realizar el cambio?</p>
              </div>
            </div>
            <div className="MAfooter">
            <button className="MAaccept" onClick={() => {
              ejecutarAxios(NuevoEstado);
              closeAlert(false);
              }} type="button">
                Sí
              </button>
              <button className="MAcancel" onClick={() => closeAlert(false)} type="button">
                No
              </button>
            </div>
          </div>
        </div>
         
      </div>
  );
}
