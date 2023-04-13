import React from 'react'
import '#Styles/Coordinador/DetailApproval/EditDetail/SecondPart.css'
import { capitalize } from "#Helpers/stringHelpers";

export default function SecondPart(props) {

  let handleDescriptionChange = (e) =>{
    const nuevaDescripcion = e.target.value;
    if(nuevaDescripcion!='')
      props.setNewDescription(nuevaDescripcion);
    else
      props.setNewDescription(props.thesis.description);
  }

  return (
    <div className='contenedorGlobalDescripcionSecondPart'>
        <div className='tituloSecondPart-edit'>
            <h2>Descripción:
              <i class="bi bi-pencil-square fa-1x"></i>
            </h2>
        </div>
         
        <input className='contenedorDescripcionSecondPart-edit'
        defaultValue={props.thesis.description ? capitalize(props.thesis.description) : "No hay descripción"}
        onChange={handleDescriptionChange}/>
    </div>
  )
}
