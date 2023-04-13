import React from 'react'
import "#Styles/Teacher/Timeline/RubricaPart/ModalMensaje.css"

export default function ModalMensaje({ message, closeMessage}) {
  return (
    <div className="modalMessageBackgroundMMER">
      <div className="modalMessageContainer">
        <div className="MMbody">
          <div className="MMmessageMMER">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={(e)=>{
                closeMessage(false);
              }}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
