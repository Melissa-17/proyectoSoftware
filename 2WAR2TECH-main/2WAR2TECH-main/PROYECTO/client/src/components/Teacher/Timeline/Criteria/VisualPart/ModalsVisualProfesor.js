import React from 'react'
import '../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/ModalsVisualProfesor.css'
import ReactHtmlParser from "react-html-parser";

export default function ModalsVisualProfesor({closeVisual, level}) {

  return (
    <div className="contenedorModalsVisualProfesorGeneral">
      <div className="contendorModalsVisualProfesor">
        <div className="contenedorHeaderModalsVisualProfesor">
          <p>Detalle del criterio</p>
          <button onClick={() => {closeVisual(false);}}>
            <i class="bi bi-x-lg" />
          </button>
        </div>

        <div>
            <hr color="black" className="lineaModalsVisualProfesor" />
        </div>

        <div className='contenedorPrimeraFilaVisualProfesor'>
            <div className='nombreCriterioVisualProfesor'>
                <p className='titulo'>Nombre del criterio</p>
                <p className='nivel'>{level.name? level.name: "No tiene un nombre"}</p>
            </div>
            <div className='puntajeMaximoVisualProfesor'>
                <p className='titulo'>Puntaje máximo</p>
                <p className='valor'>{level.maxScore ? level.maxScore : "No tiene un puntaje máximo"}</p>
            </div>
        </div>

        <div className='contenedorDescripcionVisualProfesor'>
            <p className='titulo'>Descripción</p>
            <p className='descripcion'>
              <p>{level.description ? ReactHtmlParser(level.description) : "No contiene una descripción"}</p>
            </p>
        </div>
      </div>
    </div>
  )
}
