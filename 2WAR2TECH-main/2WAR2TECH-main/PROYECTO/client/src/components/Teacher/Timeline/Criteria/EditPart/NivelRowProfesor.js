import React from "react";
import '../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/NivelRowProfesor.css'

export default function NivelRowProfesor(props) {
  const cambioModal = () =>{
    props.cambio(true);
  }
  const cambioVisual = () =>{
    props.visual(true);
  }
  return (
    <div className="contenedorNivelesFila">
      <input type="checkbox" />
      <div className="contenedorNivelDeseado">
        <p className="nivel">Nivel deseado</p>
        <p className="puntaje">Puntaje máx: 4</p>
      </div>
      <hr color="black" className="lineaVerticalEditCriteria" />
      <button className="editar" onClick={cambioModal}>Editar</button>
      <button className="verDetalle" onClick={cambioVisual}>Ver detalle</button>
    </div>
  );
}
