import React from "react";
import "#Styles/Login/LoginModals/ModalLoginError.css";

function ModalLoginError(props) {
  const {closeMessage, message} = props;
  
    return (
    <div className="MLEbackground">
      <div className="MLEcontainer">
        <div className="MLEbody">
          <div className="MLEmessage">
            <i class="bi bi-x-circle text-danger" />
            <p className="MLEtexto">{message}</p>
          </div>
          <div className="MLEfooter">
            <button
              className="MLEbtn"
              onClick={() => {
                closeMessage(false);
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

export default ModalLoginError;
