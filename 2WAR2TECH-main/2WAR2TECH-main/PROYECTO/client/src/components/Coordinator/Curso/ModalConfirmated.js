import React from 'react'
import '../../Modals/ModalsMessage.css'
import { useNavigate } from 'react-router';

export default function ModalConfirmated({closeMessage, message, option}) {
  const navigate=useNavigate();
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
                if(option==1) navigate("/Coordinador/curso");
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