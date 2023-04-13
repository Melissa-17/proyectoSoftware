import React, { useEffect, useState } from "react";
import "#Styles/Teacher/CourseMark/CriteriaModal/NewEvaluationModal.css";
import Form from "react-bootstrap/Form";
import { Combobox } from "react-widgets";
import { axiosSearchByTypeAndNameAssignmentController } from "../../../../api/Seeker";
import { axiosAddEvaluation } from "../../../../api/Calification";

function NewEvaluation({
  closeMessage,
  criteriaId,
  evaluationList,
  setEvaluationList,
  id,
  setValidacionEvaluacion,
  modalMessage,
  cxsid,
  semid
}) {
  const JWTtoken = sessionStorage.getItem("token");
  const [asignmentsList, setAsignmentsList] = useState([]);
  const [type, setType] = useState("");
  const [inputName, setInputName] = useState("");
  const [value, setValue] = useState(1);

  const funcionNombreTipo = () => {
    if (type == "FINAL ASSIGN") return "Entregable";
    else if (type == "PARTIAL ASSIGN") return "Entregable parcial";
    else if (type == "ADVANCE") return "Avance";
    else if (type == "EXPOSITION") return "Exposición";
  };

  // console.log(type);

  const getAllAssingments = () => {
    axiosSearchByTypeAndNameAssignmentController(
      JWTtoken,
      type,
      "",
      1,
      1000,
      cxsid,
      semid
    )
      .then((response) => {
        const list = response.data || [];
        // console.log(list);
        //console.log(response)
        setAsignmentsList(list);
        
        setValue(list.rows.length ? list.rows[0].id : -1);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllAssingments();
  }, [type]);

  // let inputNameHandler = (e) => {
  //   var lowerCase = e.target.value.toLowerCase();
  //   setInputName(lowerCase);
  //   getAllAssingments();
  // };

  // {console.log(value)}

  const handleProposeSubmitNewEvaluation = (e) => {
    e.preventDefault();

    const weight = document.querySelector(
      ".contenedorPesoModalCriterioControl"
    ).value;
    const idC = criteriaId;
    const idA = value;

    const proposeFormData = {
      weight: weight,
      idC: idC,
      idA: idA
    };
    // console.log(weight);

    // // const formData = new FormData();
    // // formData.append("name", name);
    // // formData.append("peso", peso);
    // // formData.append("description", description);

    axiosAddEvaluation(JWTtoken, proposeFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeMessage(false);
    // modalMessage(true);
  };
  /*axiosAddAssignmentCalification*/

  const handleChange = (e) =>{
    var a = document.getElementById("exampleFormControlSelect1").value;
    setValue(a);
    // valor=a;
    // console.log(valor);
  }

  return (
    <div className="modalMessageBackgroundNEM">
      <div className="modalMessageContainer">
        <div className="modalNEBodyNE">
          <div className="lineaPrimeraModalBodyNE">
            <p>Agregar Evaluación </p>
            <button
              onClick={() => {
                closeMessage(false);
              }}
              type="button"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <hr color="black" className="lineaModalCriterio" />
          <form
            id="modalContentproposeFormNewEvaluation"
            className="modalContentproposeFormNewEvaluation"
            method="post"
            onSubmit={(e) => handleProposeSubmitNewEvaluation(e)}
          >
            <div className="NEcontent">
              <div className="btnGrp">
                <div class="btn-group">
                  <button type="button" class="btn btn-secondary ">
                    {type
                      ? funcionNombreTipo()
                      : "Seleccione un tipo de evaluación"}
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary  dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="sr-only"></span>
                  </button>
                  <div class="dropdown-menu">
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => {
                        setType("FINAL ASSIGN");
                      }}
                    >
                      Entregable
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => {
                        setType("PARTIAL ASSIGN");
                      }}
                    >
                      Entregable parcial
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => {
                        setType("ADVANCE");
                      }}
                    >
                      Avance
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => {
                        setType("EXPOSITION");
                      }}
                    >
                      Exposición
                    </button>
                  </div>
                </div>
              </div>
              <Form.Group
                className="mb-3 contenedorNombreModalCriterio"
                controlId="formTittle"
              >
                <Form.Label className="contenedorNombreModalCriterio">
                  <strong>Nombre de la evaluación</strong>
                </Form.Label>
                <div class="form-group">
                  <select class="form-control" id="exampleFormControlSelect1"
                  onChange={handleChange}
                  >
                    {asignmentsList && asignmentsList.rows? (
                      asignmentsList.rows.map((assign, index) => {
                        // console.log(assign);
                        return (
                          <option value={assign.id}>{assign.assignmentName}</option>
                        );
                      })
                    ) : ""}
                    {/* {console.log(asignmentsList)} */}
                  </select>
                </div>
              </Form.Group>
              
              {/* {console.log(value)} */}
              {/* <div className="contenedorNombreModalCriterio">
                <p>Nombre de la evaluación</p>
                <input type="text" placeholder="Estudios Primarios" />
              </div> */}
              <Form.Group
                className="mb-3 contenedorNombreModalCriterio"
                controlId="formTittle"
              >
                <Form.Label className="contenedorNombreModalCriterioPE">
                  <strong>Peso:</strong>
                </Form.Label>
                <Form.Control
                  className="contenedorPesoModalCriterioControl"
                  type="number"
                  placeholder="Ingrese el peso"
                />
              </Form.Group>
              {/* <div className="contenedorNombreModalCriterio">
                <p>Peso</p>
                <input type="text" placeholder="1" />
              </div> */}

              <Form.Group
                className="mb-3 contenedorNombreModalCriterio"
                controlId="formTittle"
              ></Form.Group>

              <div className="contenedorBotonAceptarModalCriterio">
                <button
                  className="aceptarBtnNE"
                  type="submit"
                  form="modalContentproposeFormNewEvaluation"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewEvaluation;
