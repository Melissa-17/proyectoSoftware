import React from 'react'
import { useNavigate } from 'react-router';
import '../../../../Modals/ModalsAlert.css'

export default function ModalsAlertEditCriteria({ closeAlert, alertText, num, cxsid, option, id, rubricId, criterioId}) {
    const navigate = useNavigate();
    const cambioPantalla = () =>{
        if(option==1){
        navigate(`/timeline/rubrica/${num}`,{
          state:{
            cxsid:cxsid,
            id:id,
            rubricId:rubricId,
            criterioId:criterioId
          }
        });
      }else{
        if(option==2){
          navigate(`/timeline/rubrica/edit/${num}`,{
            state:{
              cxsid:cxsid,
              id:id,
              rubricId:rubricId,
              criterioId:criterioId
            }
          });
        }
        else{
          if(option>2){
            navigate(`/timeline/criteria/visual/${num}/${option-2}`,{
              state:{
                cxsid:cxsid,
                id:id,
                rubricId:rubricId,
                criterioId:criterioId
              }
            });
          }
        }
      }
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
