import React from "react";
import "./ModalsMessage.css";

//Este modal es para los mensajes de confirmación o error
function ModalsMessage({ closeMessage, message, navigateFunc, otroModal, update }) {
  console.log(update)
  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {
                closeMessage(false);
                otroModal ? otroModal(false) : (()=>{})();
                update ? update() : (()=>{})();
                // navigateFunc();
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

export default ModalsMessage;
