import React from "react";
import "./ModalSeeMore.css";
import {useRef} from 'react';

function Modal({ closeModal, title, criteria }) {

  const gradeRef = useRef(null);
  const observacionRef = useRef(null);

  const partialSave = (newGrade, newObservacion) => {
    
    criteria.obtainedScore = newGrade==''? criteria.obtainedScore : newGrade;
    criteria.notes = newObservacion=='' ? criteria.notes : newObservacion ;
    // console.log(newGrade);
    // console.log(newObservacion);
    // console.log('hola de prueba')
  }

  const funcPrueba = (event, msg) =>{
    console.log(event);
    console.log(msg);

  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="close">
          <div className='vacio'></div>
          <button className="titleCloseBtn" onClick={() => closeModal(false)}>
            X
          </button>
        </div>
        
        <div className="title">
          <h1 >
          <input 
            ref={gradeRef}
                  className="partialGrade"
                  placeholder={criteria.obtainedScore}
                  id="grade"
                  name="grade"
                  >
            </input>
            / {criteria.LEVEL_CRITERIum.maxScore}
          </h1>
          <button className="boton-editar">
                <img
                  className="imagen-editar"
                  src='https://cdn-icons-png.flaticon.com/512/84/84380.png'/>
            </button>
        </div>
        <div className="body">
          <div className="descripcionRubrica">
              <strong><p className="tituloDescripcion">{title}</p></strong>       
            <div className="linea-descripcion">
              <p className="descripcionTexto">Descripción de la Rubrica</p>
              {/* <button className="boton-editar">
                <img
                  className="imagen-editar"
                  src='https://cdn-icons-png.flaticon.com/512/84/84380.png'/>
              </button> */}
            </div>
            <p className="contenidoTexto">
              {criteria.LEVEL_CRITERIum.description}
            </p>
          </div>
          <div className="observacionTexto">
            <div className='linea-observacion'>
              <p className="observa">Observaciones</p>
              <button className="boton-editar">
                  <img
                    className="imagen-editar"
                    src='https://cdn-icons-png.flaticon.com/512/84/84380.png'/>
                </button>
            </div>
            {/* <p className="descripObserva">{criteria.notes}</p> */}
            <textarea className="descripObserva"
            ref={observacionRef} 
            placeholder={criteria.notes}
            id='observaciones'
            name='observaciones'>
            </textarea>
          </div>
          <div className="subbuttons-edit">
            <button className="Guardar-cambios"
                onClick={(() => {partialSave( gradeRef.current? gradeRef.current.value:'',
                observacionRef.current?observacionRef.current.value:'' ); 
                closeModal(false)
              })
              }
            >
                Guardar
            </button>
            <button className="Cancelar-cambios" onClick={() => closeModal(false)}>
                Cancelar
            </button>
        </div>	
        </div>
      </div>
    </div>
  );
}

export default Modal;

// import React from 'react'

// function Modal({ isOpen, closeModal}) {
//   return (
//     <div className={`modal ${isOpen && 'modal-open'}`}>
//       <h1>Modal y la csmre</h1>
//     </div>
//   )
// }

// export default Modal
