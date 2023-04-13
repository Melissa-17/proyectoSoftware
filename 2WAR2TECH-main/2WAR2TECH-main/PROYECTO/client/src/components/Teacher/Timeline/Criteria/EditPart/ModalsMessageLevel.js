import React from 'react'
import '../../../../Modals/ModalsMessage.css'

export default function ModalsMessageLevel({closeMessage, closeOtroModal, message, update}) {
  return (
    <div className="modalMessageBackground">
      <div className="modalMessageContainerModalsLevel">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {closeMessage(false); closeOtroModal(false); 
                update ? update() : (()=>{})();
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}