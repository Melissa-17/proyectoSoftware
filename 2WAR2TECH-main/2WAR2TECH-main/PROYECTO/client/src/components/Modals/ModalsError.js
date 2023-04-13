import React from 'react'
import "./ModalsError.css";

export default function ModalsError({closeError, message}) {
  return (
    <div className="modalErrorBackground">
      <div className="modalErrorContainer">
        <div className="MMbody">
          <div className="MMError">
            <i class="bi bi-exclamation-circle-fill"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {
                closeError(false);
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
