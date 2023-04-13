import React from 'react'
import '../../../Modals/ModalsMessage.css'
import { useNavigate } from "react-router";

export default function ModalsMessage({message, option, coordinadorItem}) {
  const navigate = useNavigate();
    const retroceder = () =>{
      if (option == 1) navigate("/coordinator");
      else if(option == 3) navigate("/Coordinador/profesores");
      else if(option == 5) navigate("/teacher/jurados");
      else if(option == 4) navigate("/Coordinador/asesores");
      // else if(option == 6) navigate("/welcome");
      else if (option == 2)
        navigate("/coordinator", {
          state: {
            coordinadorItem: coordinadorItem,
          },
        });
    }
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
              onClick={retroceder}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}