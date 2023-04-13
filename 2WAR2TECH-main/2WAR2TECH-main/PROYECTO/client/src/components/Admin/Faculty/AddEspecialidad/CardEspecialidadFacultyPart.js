import React from "react";
import "../../../../assets/styles/Admin/Faculty/Visual/CardEspecialidadFacultyPart.css";

export default function CardEspecialidadFacultyPart() {
  return (
    <div className="contenedorCardEspecialidad">
      {/* {revisor.photo ? (
          <img
            className="foto"
            src={`data:image/png;base64,${Buffer.from(
              revisor.photo.data
            ).toString("base64")}`}
            alt="foto asesor"
          />
        ) : (
          <img
            className="foto"
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="foto asesor"
          />
        )} */}
        <img
            className="foto"
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="foto asesor"
        />
      <div className="infoCard">
        <p className="carrera">Juan Alberto Romero Sanchez</p>
        <p className="info">Ingeniería Informática</p>
      </div>
      <button className="botonEliminarCoordinador">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  );
}
