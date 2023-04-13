import React from 'react'
import '../../../../Modals/ModalsMessage.css'
import { useNavigate } from 'react-router';

export default function ModalsMessageEditPart({closeMessage, message, num, cxsid, option, id, rubricId, criterioId}) {
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
    <div className="modalMessageBackground">
      <div className="modalMessageContainer">
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
