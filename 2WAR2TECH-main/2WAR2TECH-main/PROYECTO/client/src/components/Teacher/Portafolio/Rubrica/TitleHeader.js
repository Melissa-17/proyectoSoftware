import React from 'react'
import '#Styles/Adviser/Rubrica/TitleHeader.css';
import { formatAssignmentName } from '#Helpers/assignmentHelpers.js';
import { createCompleteName, capitalizeTitle } from '#Helpers/stringHelpers';
import { getUserPhoto } from "#Helpers/assignmentHelpers.js";

export default function TitleHeader(props) {
  const { assignment, revisor, index, opcion } = props;

  return (
    <div className='contenedorTitleHeader'>
      <div className='titleHeader'>
        <div className='File_1'>
            <i className="bi bi-file-earmark-check-fill"/>
            <p> {formatAssignmentName(opcion, assignment.type)}  </p>
        </div>
        <div className='Fila_2'>
            <p>{assignment.assignmentName}</p>
        </div>
      </div>
      <div className='inforHeader'>
        <div className='contenedorImagenHeader'>
            {/* <img 
            src='https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/test-madurez_1.jpg' 
            className='imagenHeader' /> */}
            {getUserPhoto(revisor.USER.photo)}
        </div>
        <div className='FilaTexto'>
            <p className='tesisI'>Tesis I</p>
            <p className='Nombre'>{createCompleteName(revisor.USER.name, revisor.USER.fLastName, revisor.USER.mLastName)}</p>
            <p className='Area'>{capitalizeTitle(revisor.USER.USER_X_SPECIALTies ? capitalizeTitle(revisor.USER.USER_X_SPECIALTies[0].SPECIALTY.name) : "No hay titulo")}</p>
        </div>
      </div>
    </div>
  )
}
