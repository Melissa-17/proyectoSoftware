import React from 'react'
import '../../../Modals/ModalsMessage.css'
import { useNavigate } from 'react-router'

export default function ModalsMessage({closeMessage, message}) {
    const navigate = useNavigate();
    const retrocederPantalla = () =>{
        navigate("/asesor/contentPropose");
    }
  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={()=>{
                closeMessage(true);
                retrocederPantalla();
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
