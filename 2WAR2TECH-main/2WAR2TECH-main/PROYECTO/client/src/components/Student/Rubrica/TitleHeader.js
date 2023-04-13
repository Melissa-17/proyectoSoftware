import React from "react";
import "#Styles/Student/Rubrica/TitleHeader.css";
import { formatAssignmentName } from "#Helpers/assignmentHelpers.js";
import { createCompleteName, capitalizeTitle } from "#Helpers/stringHelpers";
import { getUserPhoto } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer"; 
export default function TitleHeader(props) {
  const { assignment, revisorName, revisorRol, index, opcion } = props;

  return (
    <div className="contenedorTitleHeader">
      <div className="titleHeader">
        <div className="File_1">
          <i className="bi bi-file-earmark-check-fill" />
          <p> {formatAssignmentName(index, assignment.type)} </p>
        </div>
        <div className="Fila_2">
          <p>{assignment.assignmentName}</p>
        </div>
      </div>
      <div className="inforHeader">
        {/* <div className="contenedorImagenHeader">
          {revisor && revisor.USER && revisor.USER.photo ? (
            <img
              className="profile-img-revisor"
              src={`data:image/png;base64,${Buffer.from(revisor.USER.photo.data).toString(
                "base64"
              )}`}
              alt="profile-pic"
            />
          ) : (
            <img
              className="profile-img-revisor"
              // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              src="https://wallpapercave.com/uwp/uwp2417748.png"
              alt="foto asesor"
            />
          )}
          {/* <img 
            src='https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/test-madurez_1.jpg' 
            className='imagenHeader' /> 
          
        </div> */}
        <div className="FilaTexto">
          {/* <p className="fw-bold">Asesor</p>
          <p className="tesisI">Tesis I</p> */}
          <p className="Nombre">
            {/* {createCompleteName(
              revisor.USER.name,
              revisor.USER.fLastName,
              revisor.USER.mLastName
            )} */}
            {revisorName}
          </p>
          <p className="Area">
            {/* {capitalizeTitle(
              revisor.USER.USER_X_SPECIALTies
                ? capitalizeTitle(
                    revisor.USER.USER_X_SPECIALTies[0].SPECIALTY.name
                  )
                : "No hay titulo"
            )} */}
            {revisorRol}
          </p>
        </div>
      </div>
    </div>
  );
}
