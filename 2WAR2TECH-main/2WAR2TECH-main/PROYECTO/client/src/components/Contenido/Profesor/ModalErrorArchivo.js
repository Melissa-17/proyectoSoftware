import React from 'react'
import '../../Modals/ModalsMessage.css'

export default function ModalError({closeMessage, closeOtroModal,closeunmodalmas, message}) {
  return (
    <div className="modalMessageBackground">
      <div className="modalMessageContainerModalsLevel">
        <div className="MMbody">
          <div className="MMError">
          <i  
           class="bi bi-exclamation-circle-fill"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {closeMessage(false); closeOtroModal(false);closeunmodalmas(false);}}
              
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}