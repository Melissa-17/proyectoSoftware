import React, { useEffect, useState } from "react";
import "#Styles/Jury/Presentation/DetailPart/InitialPart.css";
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
  const student = studAssignment? studAssignment.USER:'';
  const studentName = student.name + ' ' + student.fLastName + ' '+student.mLastName;
  // console.log(studAssignment);
  const fecha = studAssignment? studAssignment.registerDate:'';
  return (
    revisor ?
    <div className="parte-inicial">
      <div className="contenedor-info">
        <div className="titulo-expo">
          <h2>Exposición 1 - Parcial</h2>
        </div>
        <div className="contenido-expo">
          <div className="info-contenido">
              <p className="alum-expo">{studentName}</p>
              <p className="fecha-envio">Fecha de envio:</p>
              <p className="fecha-expo">{formatDate(fecha)}</p>
          </div>
          <div className="linea-contenido">
            <hr color="#CED4DA" className="linea" width='400px'/>
          </div>
        </div>
      </div>
      {/* <div className="contenedor-foto-presentacion">
        <div className="foto-persona">
          {revisor.photo ? (
            <img
              className="foto-presentacion"
              src={`data:image/png;base64,${Buffer.from(
                revisor.photo.data
              ).toString("base64")}`}
              alt="foto asesor"
            />
          ) : (
            <img
              className="foto-presentacion"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="foto asesor"
            />
          )}
        </div>
        <div className="separador-presentacion"/>
        <div className="informacion-presentacion">
          <p className="tesis-expo">TESIS I</p>
          <p className="nombre-usuario-expo">
            {createCompleteName(
              revisor.name,
              revisor.fLastName,
              revisor.mLastName
            )}
          </p>
          <p className="area-expo">{capitalizeTitle(revisor.USER.USER_X_SPECIALTies ? capitalizeTitle(revisor.USER.USER_X_SPECIALTies[0].SPECIALTY.name) : "No hay titulo")}</p>
        </div>
      </div> */}
    </div>
    :
    null
  );
}
