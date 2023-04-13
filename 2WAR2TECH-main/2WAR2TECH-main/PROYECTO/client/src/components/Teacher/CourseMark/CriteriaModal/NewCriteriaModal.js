import React, { useEffect, useState } from "react";
import "#Styles/Teacher/CourseMark/CriteriaModal/NewCriteriaModal.css";
import Form from "react-bootstrap/Form";
import { axiosAddCalificationsCriteria } from "#API/Calification";

function NewCriteriaModal({
  closeMessage,
  criteriaList,
  setCriteriaList,
  cxsid,
  semid,
}) {
  const JWTtoken = sessionStorage.getItem("token");
  const handleProposeSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector(
      ".contenedorNombreModalCriterioControl"
    ).value;
    const peso = document.querySelector(
      ".contenedorPesoModalCriterioControl"
    ).value;
    const description = document.querySelector(
      ".contenedorDescripModalCriterioControl"
    ).value;

    const proposeFormData = {
      name: name,
      peso: peso,
      description: description,
    };

    const assignmentData = {
      "name": name,
      "peso": peso,
      "description": description,
    }

    axiosAddCalificationsCriteria(JWTtoken, cxsid, semid, proposeFormData)
      .then((res) => {
        console.log(res);
        const newPropose = {
          name: proposeFormData.name,
          weight: Number(proposeFormData.peso)
        }
        //console.log("pfd",newPropose);
        //console.log("Criteria",criteriaList);
        const arr = [...criteriaList,newPropose]
        //console.log("Merge", arr)
        setCriteriaList(arr);
      })
      .catch((err) => {
        console.log(err);
      });
      closeMessage(false);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const a = await setTimeout(() => {
  //       closeMessage(false);
  //     }, 2500);
  //   }
  //   fetchData();
  // }, []);

  return (
    <form
      id="modalContentpropose-form"
      className="modalContentpropose-form"
      method="post"
      onSubmit={handleProposeSubmit}
    >
      <div className="modalMessageBackgroundNCM">
        <div className="modalMessageContainer">
          <div className="modalNCBody">
            <div className="lineaPrimeraModalBodyNCM">
              <p>Nuevo Criterio</p>
              <button
                onClick={() => {
                  closeMessage(false);
                }}
                type="button"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <hr color="black" className="lineaModalCriterioIO" />
            <div className="criterioYpeso">
              <Form.Group
                className="mb-3 contenedorNombreModalCriterio"
                controlId="formTittle"
              >
                <Form.Label className="contenedorNombreModalCriterio">
                  <strong>Nombre del criterio:</strong>
                </Form.Label>
                <Form.Control
                  className="contenedorNombreModalCriterioControl"
                  type="text"
                  placeholder="Ingrese el nombre"
                  // onChange={inputNameHandler}
                />
              </Form.Group>
              {/* <div className="contenedorNombreModalCriterio">
                <p>Peso</p>
                <input type="text" placeholder="1" />
              </div> */}
              <Form.Group
                className="mb-3 contenedorNombreModalCriterio"
                controlId="formTittle"
              >
                <Form.Label className="contenedorNombreModalCriterio">
                  <strong>Peso:</strong>
                </Form.Label>
                <Form.Control
                  className="contenedorNombreModalCriterio contenedorPesoModalCriterioControl"
                  type="number"
                  placeholder="Ingrese el peso"
                />
              </Form.Group>
            </div>
            <div className="descripcionNCM">
              <Form.Group
                className="mb-3 contenedorNombreModalCriterio"
                controlId="formTemaPropuesto"
              >
                <Form.Label className="descriptitlencm">
                  <strong>Descripción:</strong>
                </Form.Label>
                <Form.Control
                  className="contenedorDescripModalCriterio contenedorDescripModalCriterioControl"
                  as="textarea"
                  rows={8}
                  style={{resize:"none"}}
                />
              </Form.Group>
            </div>
            <div className="contenedorBotonAceptarModalCriterio">
              <button
                // onSubmit={() => {
                //   closeMessage(false);
                // }}
                className="aceptarBotonNCM"
                type="submit"
                form="modalContentpropose-form"
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

export default NewCriteriaModal;
