import React from "react";
import "#Styles/Login/LoginModals/ModalAccountCreated.css";

function ModalAccountCreated(props) {
  const { closeMessage, works, messageOk, messageError, navigateFunc } = props;
  return (
    <div className="MACbackground">
      <div className="MACcontainer">
        <div className="MACbody">
          <div className="MACmessage">
            {works ? (
              <div className="MACmessageOk">
                <i class="bi bi-check-circle text-success"/>
                <p className="MACtexto">{messageOk}</p>
              </div>
            ) : (
              <div className="MACmessageError">
                <i class="bi bi-x-circle text-danger"/>
                <p className="MACtexto">{messageError}</p>
              </div>
            )}
          </div>
          <div className="MACfooter">
            <button
              className="MACbtn"
              onClick={() => {
                closeMessage(false);
                if(works) navigateFunc();
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

export default ModalAccountCreated;
