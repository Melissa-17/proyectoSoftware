import React from "react";
import "../../Modals/ModalsMessage.css";

//Este modal es para los mensajes de confirmación o error
function ModalsMessage({ closeMessage, message, otroModal }) {
  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"
            style={{marginLeft:"600px"}}
            ></i>
            <p className="MMdescripcionTexto"
            style={{maxWidth:"350px", minWidth:"350px", marginLeft:"10px"}}
            >{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {
                closeMessage(false);
                otroModal(false);
              }}
              style={{width:"150px", backgroundColor:"#298288"}}
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
