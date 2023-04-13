import React from 'react'
import { useNavigate } from 'react-router';
import '../../../../Modals/ModalsAlert.css'

export default function ModalsAlert({ closeAlert, alertText, num, cxsid, id, rubricId}) {
    const navigate = useNavigate();
    const cambioPantalla = () =>{
        navigate(`/timeline/rubrica/${num}`,{
          state:{
            cxsid:cxsid,
            id:id,
            rubricId: rubricId
          }
        });
    }
  return (
    <div className="modalAlertBackground">
      <div className="modalAlertContainer">
        <div className="MAbody">
          <div className="MAalert">
            <i class="bi bi-question-circle"></i>
            <p className="MAdescripcionTexto">{alertText}</p>
          </div>
          <div className="MAfooter">
            <button
              className="MAaccept"
              onClick={cambioPantalla}>
              Aceptar
            </button>
            <button className="MAcancel" onClick={() => closeAlert(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
