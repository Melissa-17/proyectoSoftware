import React from "react";
import "../../Modals/ModalsMessage.css";

export default function ModalExito({
  closeMessage,
  closeOtroModal,
  closeunmodalmas,
  actualizar,
  message
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
                 
                  closeMessage ? closeMessage(false) : (()=>{})();
                  
                  closeOtroModal ? closeOtroModal(false) : (()=>{})();
                  closeunmodalmas ? closeunmodalmas(false) : (()=>{})(); 
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