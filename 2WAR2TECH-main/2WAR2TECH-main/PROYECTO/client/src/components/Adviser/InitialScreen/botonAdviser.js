import React from 'react'
import '../../../assets/styles/Adviser/InitialScreen/botonAdviser.css'

export default function botonAdviser() {
  return (
    <div className='contenidoBotonAdviser'>
      <div className='contenidoTituloBotonAdviser'>
        <div className='sesionEscrita'>
            <p>Samuel Menendez Salvattore</p>
            <p>Ingeniería Industrial</p>
        </div>
        <div className='imagenAdviser'>
            <img src='' className='imgAdviser'/>
        </div>
      </div>
      <div className='tituloPrincipal'>
        <h1>Sistema de gestión y control de alumnos</h1>
      </div>
      <div className='estadoAdviser'>
        <p>Entregado</p>
      </div>
    </div>
  )
}
