import React from "react";
import "#Styles/Coordinador/Approval/StateLegend.css";

function StateLegend(props) {
  const {close} = props;
  return (
    <div className="modalStateLegend">
      <div className="modalSLContainer">
        <div className="MLSBody">
          <div className="stateHeader">
            <button className="cerrao" onClick={() => close(false)}>X</button>
          </div>
          <div className="slState">
            <i class="bi bi-eye-fill text-primary"></i>
            <p>Observado</p>
          </div>
          <div className="slState">
            <i class="bi bi-check-circle-fill text-success"></i>
            <p>Aprobado</p>
          </div>
          <div className="slState">
            <i class="bi bi-check-circle-fill text-warning"></i>
            <p>Pendiente</p>
          </div>
          <div className="slState">
            <i class="bi bi-pass-fill text-secondary"></i>
            <p>Sustentado</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateLegend;
