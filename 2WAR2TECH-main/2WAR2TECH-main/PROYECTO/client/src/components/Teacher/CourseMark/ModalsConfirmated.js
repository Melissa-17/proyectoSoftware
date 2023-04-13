import React from 'react'
import { useNavigate } from 'react-router';
import '../../Modals/ModalsAlert.css'

export default function ModalsConfirmated({ alertText, option, cxsid, semid, criteriaId}) {
    const navigate = useNavigate();
    const cambioPantalla = () =>{
      if (option == 1) {
        navigate("/course/mark", {
          state: {
            cxsid: cxsid,
            semid: semid,
          },
        });
      } else {
        if (option == 2) {
          navigate("/course/mark/detail", {
            state: {
              criteriaId: criteriaId,
              cxsid: cxsid,
              semid: semid,
            },
          });
        }
      }
    }
  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainerModalsLevel">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{alertText}</p>
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
