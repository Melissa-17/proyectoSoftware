import React , { useState, useEffect }from 'react'

function CardHorario(props) {
  const {horarioItem} = props;
  return (
    <div className='contenedorCardEspecialidad2'>
      <div className='contenedorInfoCardEspecialidad2'>
        <p className='especialidad'
        style={{fontSize:"24px", marginTop:"10px", marginBottom:"10px"}}
        >{horarioItem.abbreviation? horarioItem.abbreviation: "No tiene nombre"}</p>        
      </div>
    </div>
  )
}

export default CardHorario