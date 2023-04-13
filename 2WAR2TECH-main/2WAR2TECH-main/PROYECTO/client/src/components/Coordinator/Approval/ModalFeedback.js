import React from "react";

function ModalFeedback() {
  return (
    <div className="modalFeedbackBackground">
      <div className="modalFeedbackContainer">
        <div className="MFbody">
          <div className="MFheader">

          </div>
          <div className="MFcontent">
            
          </div>
          <div className="MFfooter">
            <button
              className="MFacceptance"
              //   onClick={() => {
              //     closeMessage(false);
              //   }}
            >
              Aceptar
            </button>
            <button
              className="MFcancel"
              //   onClick={() => {
              //     closeMessage(false);
              //   }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFeedback;
