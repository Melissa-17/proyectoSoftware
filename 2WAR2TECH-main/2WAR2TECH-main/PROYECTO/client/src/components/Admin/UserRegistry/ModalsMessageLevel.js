import React from 'react'
import '../../Modals/ModalsMessage.css'

export default function ModalsMessage({closeMessage, closeOtroModal, message}) {
  // update();
  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainerModalsLevel">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto"
            style={{color:"white"}}
            >{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {closeMessage(false); closeOtroModal(false);}}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}