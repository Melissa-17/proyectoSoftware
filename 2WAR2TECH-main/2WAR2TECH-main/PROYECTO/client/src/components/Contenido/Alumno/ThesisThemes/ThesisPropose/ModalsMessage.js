import React from "react";
import "../../../../Modals/ModalsMessage.css";
import { useNavigate } from "react-router";

export default function ModalsMessage({ closeMessage, message, opcion }) {
  const navigate = useNavigate();
  const retrocederPantalla = () => {
    if (opcion == 1) {
      navigate("/asesor-approval");
    } else {
      navigate("/Thesis/propose");
    }
  };
  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              type="button"
              className="MMacceptance"
              onClick={() => {
                closeMessage(true);
                retrocederPantalla();
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
