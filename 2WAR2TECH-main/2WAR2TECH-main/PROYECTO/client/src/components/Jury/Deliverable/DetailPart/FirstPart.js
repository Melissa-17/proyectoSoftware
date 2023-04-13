import React, {useState} from 'react'
import '../../../../assets/styles/Jury/Deliverable/DetailPart/FirstPart.css'

export default function FirstPart(props) {
    
    const cambio = () =>{
        var x = document.getElementById("Seleccionar").value;
        if(x == "Asignado")
        props.setSelectOption(1);
        else if(x == "Calificado") props.setSelectOption(2);
        else if(x == "Entregado") props.setSelectOption(3);
    }
  return (
    <div className='contenedorFirstPartJury'>
      <div className='contenedorEstadoFirstPartJury'>
        <p>Estado</p>
        <select id='Seleccionar' onClick={cambio}>
            <option value="">Elige una opción</option>
            <option value="Asignado">Asignado</option>
            <option value="Calificado">Calificado</option>
            <option value="Entregado">Entregado</option>
        </select>
      </div>
      <div className='contenedorNombreFirstPartJury'>
        <p>Nombre</p>
        <input placeholder='Ingrese un nombre' type="text"></input>
      </div>
      <div>
        <button className='botonBuscarFirstPart'>Buscar</button>
      </div>
    </div>
  )
}
