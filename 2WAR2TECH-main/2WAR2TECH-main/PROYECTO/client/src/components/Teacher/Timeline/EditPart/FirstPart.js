import React from "react";
import '../../../../assets/styles/Teacher/Timeline/EditPart/FirstPart.css'

export default function FirstPart() {
  return (
    <div>
      <p className="info">Información General</p>
      <div className="contenedorColumnasInfoGeneralEditPart">
        <div className="contenedorPrimeraColumnaInfoGeneralEditPart">
          <div className="contenedorNombre">
            <p>Nombre</p>
            <input type="text" placeholder="Semana 3" />
          </div>
          <div className="nombreEntregable">
            <p>Nombre del N° Entregable</p>
            <input type="text" placeholder="Entregable Parcial 1.3" />
          </div>
        </div>

        <div className="contenedorSegundaColumnaInfoGeneralEditPart">
          <p>Responsable(s)</p>
          <div>
            <input type="checkbox" /> Asesor
          </div>

          <div>
            <input type="checkbox" /> Jurado
          </div>

          <div>
            <input type="checkbox" /> Profesor del curso
          </div>

          <div>
            <input type="checkbox" /> Coordinador
          </div>
        </div>
      </div>
    </div>
  );
}
