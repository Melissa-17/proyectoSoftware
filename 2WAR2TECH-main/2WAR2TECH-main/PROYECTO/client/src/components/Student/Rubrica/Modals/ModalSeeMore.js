import React from "react";
import "./ModalSeeMore.css";
import ReactHtmlParser from 'react-html-parser';

function Modal({ closeModal, title, criteria }) {
  return (
    <div className="modalBackgroundAR">
      <div className="modalContainer">
        <button className="titleCloseBtn" onClick={() => closeModal(false)}>
          X
        </button>
        <div className="title">
          <h1>
            {criteria.obtainedScore ? criteria.obtainedScore : "-"}/{criteria.LEVEL_CRITERIum.maxScore}
          </h1>
          <strong><p className="tituloDescripcion">{title}</p></strong>
        </div>
        <div className="body">
          <div className="descripcionRubrica">
            <p className="descripcionTexto">Descripción de la Rubrica</p>
            <p className="contenidoTexto">
              {criteria.LEVEL_CRITERIum.description ? ReactHtmlParser(criteria.LEVEL_CRITERIum.description) : "No contiene una descripción"}
              {/* {criteria.LEVEL_CRITERIum.description} */}
            </p>
          </div>
          <div className="observacionTexto">
            <p className="observa">Observaciones</p>
            <p className="descripObserva">{criteria.notes}</p>
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
