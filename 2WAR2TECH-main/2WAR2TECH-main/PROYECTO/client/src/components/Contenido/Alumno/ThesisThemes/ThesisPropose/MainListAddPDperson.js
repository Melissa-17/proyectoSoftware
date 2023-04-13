import React from "react";
import "#Styles/Alumno/ThesisThemes/ThesisPropose/MainListAddPDperson.css";

function MainListAddPDperson() {
  return (
    <div>
      <div className="PDperson">
        <div className="PDasesor">
          <p className="PDaddTitle">Profesor proponente:</p>
          <div className="MLteammateCards">
            <div className="cardAdd1">
              <i class="bi bi-person fa-6x"></i>
              <p>Agregar profesor proponente</p>
            </div>
          </div>
        </div>
        <div className="conten">
          <div className="MLteammates">
            <p className="MLaddTitle">Agregar compañero de equipo:</p>
            <div className="MLteammateCards">
              <div className="cardAdd1">
                <i class="bi bi-person fa-6x"></i>
                <p>Agregar compañero</p>
              </div>
              <div className="cardAdd-more">
                <i class="bi bi-people fa-6x"></i>
                <p>Agregar más compañeros</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainListAddPDperson;
