import React from 'react'
import '../../../assets/styles/Coordinador/DetailApproval/SecondPart.css'
import { capitalize } from "#Helpers/stringHelpers";

export default function SecondPart(props) {
  return (
    <div className='contenedorGlobalDescripcionSecondPart'>
        <div className='tituloSecondPart'>
            <h2>Descripción:</h2>
        </div>
        <div className='contenedorDescripcionSecondPartCoordinador'>
            <p>
              {props.thesis.description ? capitalize(props.thesis.description) : "No hay descripción"}
            </p>
        </div>
    </div>
  )
}
