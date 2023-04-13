import React from 'react'
import '../../../Modals/ModalsMessage.css'
import { useNavigate } from "react-router";

export default function ModalsMessage({message}) {
  const navigate = useNavigate();
    const retroceder = () =>{
      navigate("/users");
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