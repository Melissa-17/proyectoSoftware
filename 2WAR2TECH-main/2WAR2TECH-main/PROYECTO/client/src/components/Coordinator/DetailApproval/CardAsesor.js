import React, { useState } from "react";
import "../../../assets/styles/Coordinador/DetailApproval/CardAsesor.css";

export default function CardAsesor(props) {
  const {
    asesorItem,
    index,
    seleccionado,
    setSeleccionado,
    indexSeleccionado,
    setIndexSeleccionado,
    setAsesorSeleccionado,
    option,
  } = props;

  const funcionCambio = () => {
    if (seleccionado == true && indexSeleccionado != index) {
      setSeleccionado(true);
      setIndexSeleccionado(index);
      setAsesorSeleccionado(asesorItem);
    } else if (seleccionado == true && indexSeleccionado == index) {
      setSeleccionado(false);
      setIndexSeleccionado(-1);
    } else if (seleccionado == false) {
      setSeleccionado(true);
      setIndexSeleccionado(index);
      setAsesorSeleccionado(asesorItem);
    }
  };

  const funcionNombreCambio = () => {
    if (seleccionado == false || indexSeleccionado != index)
      return "contenedorCardAsesor";
    else if (seleccionado == true && indexSeleccionado == index)
      return "contenedorCardAsesorSeleccionado";
  };
  console.log(props)
  return (
    <div>
      {option == 1 ? (
        <button className={funcionNombreCambio()} onClick={funcionCambio}>
          <p className="nombre">
            {console.log("BYE")}
            {asesorItem &&
            asesorItem.name &&
            asesorItem.fLastName &&
            asesorItem.mLastName
              ? asesorItem.name +
                " " +
                asesorItem.mLastName +
                " " +
                asesorItem.fLastName
              : "No tiene nombre"}
          </p>
          <p className="especialidad">
            {asesorItem &&
            asesorItem.SPECIALTies &&
            asesorItem.SPECIALTies[0] &&
            asesorItem.SPECIALTies[0].name
              ? asesorItem.SPECIALTies[0].name
              : "No tiene especialidad"}
          </p>
        </button>
      ) : (
        <button className={funcionNombreCambio()} onClick={funcionCambio}>
          <p className="nombre">
            {asesorItem &&
            asesorItem.name &&
            asesorItem.fLastName &&
            asesorItem.mLastName
              ? asesorItem.name +
                " " +
                asesorItem.mLastName +
                " " +
                asesorItem.fLastName
              : "No tiene nombre"}
          </p>
          <p className="codigoPUCP">
            {asesorItem && asesorItem.idPUCP?
          asesorItem.idPUCP:"No tiene código PUCP"  
          }
          </p>
        </button>
      )}
    </div>
  );
}
