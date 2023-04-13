import React from 'react'
import '../../../Modals/ModalsMessage.css'
import { useNavigate } from 'react-router';

export default function ModalsMessageFacultyAdmin({closeMessage, message, option}) {
  const navigate = useNavigate();
  const cambioPantalla = () =>{
    if(option==1) navigate("/faculty");
    else closeMessage(false);
  }
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
              onClick={cambioPantalla}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}