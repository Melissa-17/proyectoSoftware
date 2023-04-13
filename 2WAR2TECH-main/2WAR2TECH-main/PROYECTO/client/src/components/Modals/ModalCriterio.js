import React from "react";
import "./ModalCriterio.css";
import { axiosAddRubric } from "#API/Rubric.js";


function ModalCriterio({ closeMessage, rubricId, modalMessage }) {
  const JWTtoken = sessionStorage.getItem("token");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
	
    const comment = document.querySelector(".inputNombreModalCriterio").value;
    const commentFormData = {
      name: comment,
      idR: rubricId
    };
		// llamada al servicio
    {console.log(commentFormData)}
    axiosAddRubric(JWTtoken, commentFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form
      id="ModalCriterioIdForm"
      className="ModalCriterioIdForm"
      method="post"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="modalMessageBackgroundMNC">
        <div className="modalMessageContainer">
          <div className="modalsCriterio">
            <div className="lineaPrimeraModalsBodyMNC">
              <p className="nuevoCriterio">Nuevo Criterio</p>
              <button
                onClick={() => {
                  closeMessage(false);
                }}
              >
                <i class="bi bi-x-lg" style={{color:"black"}}></i>
              </button>
            </div>
            <hr color="black" className="lineaModalsCriterio" />
            <div className="contenedorNombreModalsCriterio">
              <p>Nombre del criterio</p>
              <input type="text" placeholder="Estudios Primarios" className="inputNombreModalCriterio"/>
            </div>
            <div className="contenedorBotonAceptarModalCriterio">
              <button
                onClick={() => {
                  // closeMessage(false);
                  modalMessage(true);
                }}
                className="aceptarBoton"
                form="ModalCriterioIdForm"
                type="submit"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalCriterio;
