import React from "react";
import "#Styles/Teacher/CourseMark/CriteriaModal/EditCriteriaModal.css";
import Form from "react-bootstrap/Form";
import { axiosEditWeightEvaluationController } from "../../../../api/Calification";

function EditCriteriaModal({ closeMessage, evaluationList, setEvaluationList, id }) {
  const JWTtoken = sessionStorage.getItem("token");
  
  const handleProposeSubmit = (e) => {
    e.preventDefault();
    const peso = document.querySelector(
      ".contenedorPesoModalCriterioControl"
    ).value;
    const proposeFormData = {
      weight: peso,
    };
    // console.log(id);

    axiosEditWeightEvaluationController(JWTtoken, id, proposeFormData)
      .then((res) => {
        console.log(res); 
      })
      .catch((err) => {
        console.log(err);
      });
      closeMessage(false);
  };

  return (
    <div className="modalMessageBackground">
      <div className="modalMessageContainerEditCriteria">
        <form
          id="modalECBodyproposeForm"
          className="modalECBodyproposeForm"
          method="patch"
          onSubmit={(e)=>{handleProposeSubmit(e);}}
        >
          <div className="lineaPrimeraModalBodyEC">
            <p>Editar Criterio</p>
            <button
              onClick={() => {
                closeMessage(false);
              }}
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <hr color="black" className="lineaModalCriterioEC" />
          <div className="modalContent">
            <Form.Group
              className="mb-3 contenedorNombreModalCriterioEC"
              controlId="formTittle"
            >
              <Form.Label className="contenedorNombreModalCriterioEC">
                <strong>Peso:</strong>
              </Form.Label>
              <Form.Control
                className="contenedorPesoModalCriterioControl"
                type="number"
                placeholder="Ingrese el peso"
              />
            </Form.Group>
             
          </div>
          <div className="contenedorBotonAceptarModalCriterioEditModal">
              <button
                className="aceptarBotonEC"
                type="submit"
                form="modalECBodyproposeForm" 
              >
                Aceptar
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCriteriaModal;
