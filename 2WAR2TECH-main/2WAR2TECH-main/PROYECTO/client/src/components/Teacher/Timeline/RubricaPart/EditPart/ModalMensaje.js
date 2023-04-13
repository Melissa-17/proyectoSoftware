import React from 'react'
import { useNavigate } from 'react-router';
import "#Styles/Teacher/Timeline/RubricaPart/ModalMensaje.css"

export default function ModalMensaje({ num, message, cxsid, id, rubricId}) {
    const navigate = useNavigate();
    const cambioPantalla = () =>{
        navigate(`/timeline/rubrica/${num}`,{
          state:{
            cxsid:cxsid,
            id:id,
            rubricId:rubricId
          }
        });
    }
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
              onClick={cambioPantalla}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
