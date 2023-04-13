import React from "react";
import "../../Modals/ModalsMessage.css";

export default function ModalsMessage({
  closeMessage,
  closeOtroModal,
  closeunmodalmas,
  message,
  retroceso,
  from,
}) {

  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainerModalsLevel">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {
                if (from == "RegistroHorario") {
                  retroceso();
                } else if(from=='solicitudes-detail'){
                  closeMessage();
                } else{
                  closeMessage ? closeMessage(false) : (()=>{})();
                  
                  closeOtroModal ? closeOtroModal(false) : (()=>{})();
                  closeunmodalmas ? closeunmodalmas(false) : (()=>{})();
                }
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
