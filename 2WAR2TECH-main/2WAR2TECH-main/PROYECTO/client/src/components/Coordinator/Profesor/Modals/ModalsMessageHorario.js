import React from 'react'

function ModalsMessageHorario({closeMessage,closeOtroModal,closeMessage2,message}) {
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
              onClick={()=>{
                closeMessage(false);
                closeOtroModal(false);
                closeMessage2(false);
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

export default ModalsMessageHorario