import React, { useEffect, useState } from "react";
import "../../../assets/styles/Student/InfoPresentation/InitialPart.css";
import { createCompleteName, capitalizeTitle } from "#Helpers/stringHelpers.js";
import { Buffer } from "buffer";
import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function InitialPart(props) {
  let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    let revisor = JSON.parse(localStorage.getItem('asesor'));
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };
  const studAssignment = props.assign ? props.assign.studentAssignment : null;
  return (
    studAssignment && revisor ?
    <div className="parteInicial">
      <div className="contenedorInfo">
        <div className="titulo">
          <h2>Exposición {props.id} - Parcial</h2>
        </div>
        <div className="contenido">
          <div className="infoContenido">
            <div className="fechaEnvio">
              <p className="fecha">Fecha de envio:</p>
              <p className="fechaSolucion">{formatDate(studAssignment.ASSIGNMENT.startDate)}</p>
            </div>

            <div className="fechaEntrega">
              <p className="fecha">Fecha de entrega:</p>
              <p className="fechaSolucion">{formatDate(studAssignment.ASSIGNMENT.limitCompleteDate)}</p>
            </div>
          </div>
          <div className="lineaContenido">
            <hr color="#CED4DA" className="linea" />
          </div>
        </div>
      </div>
      <div className="contenedorFotoPresentacion">
        <div className="fotoPersona">
          {revisor.photo ? (
            <img
              className="fotoPresentacion"
              src={`data:image/png;base64,${Buffer.from(
                revisor.photo.data
              ).toString("base64")}`}
              alt="foto asesor"
            />
          ) : (
            <img
              className="fotoPresentacion"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="foto asesor"
            />
          )}
        </div>
        <div className="separadorPresentacion"/>
        <div className="informacionPresentacion">
          <p className="tesis">TESIS I</p>
          <p className="nombreUsuario">
            {createCompleteName(
              revisor.name,
              revisor.fLastName,
              revisor.mLastName
            )}
          </p>
          <p className="area">{capitalizeTitle(revisor.USER.USER_X_SPECIALTies ? capitalizeTitle(revisor.USER.USER_X_SPECIALTies[0].SPECIALTY.name) : "No hay titulo")}</p>
        </div>
      </div>
    </div>
    :
    null
  );
}
