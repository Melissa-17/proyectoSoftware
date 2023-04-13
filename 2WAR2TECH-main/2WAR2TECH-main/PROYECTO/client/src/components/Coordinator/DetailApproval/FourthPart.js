import React from 'react'
import '../../../assets/styles/Coordinador/DetailApproval/FourthPart.css'
import { capitalize } from "#Helpers/stringHelpers";

export default function FourthPart(props) {
  return (
    <div className='contenedorCuartaParteCoordinador'>
      <h2>Comentario:</h2>
      <div className='contenedorComentarioFourthPart'>
        <p>{props.thesis.comment ? capitalize(props.thesis.comment) : "No hay comentario"}</p>
      </div>
    </div>
  )
}
