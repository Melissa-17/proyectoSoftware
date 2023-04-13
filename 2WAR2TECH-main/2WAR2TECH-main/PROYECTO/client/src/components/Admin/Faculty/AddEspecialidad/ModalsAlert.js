import React from 'react'
import '../../../Modals/ModalsAlert.css'
import { useNavigate } from 'react-router';

export default function ModalsAlertFacultyAdmin({ closeAlert, alertText, option}) {
  const navigate = useNavigate();
  const cambioPantalla = () =>{
    navigate("/faculty/edit",{
      state:{
        option:option
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
