import React from 'react'
import '../../../Modals/ModalsMessage.css'
import { useNavigate } from 'react-router';

export default function ModalsMessageFacultyAdmin({closeMessage, message, option}) {
  const navigate = useNavigate();
  const cambioPantalla = () =>{
    navigate("/faculty/edit",{
      state:{
        option:option
      }
    });
  }
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