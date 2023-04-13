import React from "react";
import { useNavigate } from "react-router";
import "#Styles/Teacher/Timeline/PrincipalPart/ModalsMessageConfirmated.css";

export default function ModalsSelected({
  setTipoSeleccionado,
  setModalFiltro,
}) {

  const handleChange = (e) =>{
    var a = document.getElementById("seleccionAssignModalsSelected").value;
    setTipoSeleccionado(a);
  }

  return (
    <div className="modalSelectedBackgroundMMC">
      <div className="modalSelectedBackground">
        <div className="lineaHeaderModalSelected">
          <div className="headerModalSelected">
            <p>Filtro de entregables</p>
            <button
              className="botonHeaderModalSelected"
              onClick={() => {
                setModalFiltro(false);
              }}
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <hr color="black" className="lineaHorizontalHeader" />
        </div>
        <div className="seleccionarModalsAssign">
          <p>Seleccione un tipo de entregable:</p>
          <select className="seleccionAssignModalsSelected"
          id="seleccionAssignModalsSelected"
          onChange={handleChange}
          >
            <option value={"FINAL ASSIGN"}>Entregable</option>
            <option value={"PARTIAL ASSIGN"}>Entregable Parcial</option>
            <option value={"ADVANCE"}>Avance</option>
            <option value={"EXPOSITION"}>Exposición</option>
          </select>
        </div>
      </div>
    </div>
  );
}
