import React, { useState } from "react";
import "../../../../../assets/styles/Teacher/Timeline/RubricaPart/PrimeraParte.css";
import { axiosEditRubricInformation } from "../../../../../api/Rubric";
import ModalsAlert from "./ModalsAlert";
import ModalMensaje from "./ModalMensaje";

export default function PrimeraParte(props) {
  const JWTtoken = sessionStorage.getItem("token");
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  // console.log(props.entregable)
  const cambioAlerta = () => {
    setModalAlerta(true);
  };
  const cambioConfirmacion = () => {
    setModalConfirmacion(true);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentObjetivo = document.querySelector(
      ".textAreaObjetivoRubricaEdit"
    ).value;
    const commentAnotaciones = document.querySelector(
      ".textAreaAnotacionesRubricaEdit"
    ).value;
    // console.log(commentAnotaciones);
    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      objetivo: commentObjetivo,
      anotaciones: commentAnotaciones,
    };
    console.log(commentObjetivo);
    // llamada al servicio
    axiosEditRubricInformation(JWTtoken, props.rubricId, commentFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(props.entregable)

  return (
    <form
      id="editRubricaIdForm"
      className="editRubricaIdForm"
      method="patch"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="contenedorPrimeraParteProfesor">
        <div className="contenedorInformacionPrimeraParteProfesor">
          <p>Información general</p>
        </div>

        <div className="lineaFacultadCursoPrimeraParteProfesor">
          <div className="lineaFacultadPrimeraParteProfesor">
            <p className="facultad">Facultad</p>
            <p className="area">
              {props.entregable && props.entregable.specialty
                ? props.entregable.specialty.name
                : "No contiene una facultad"}
            </p>
          </div>
          <div className="lineaCursoPrimeraParteProfesor">
            <p className="curso">Curso</p>
            <p className="titulo">
              {props.entregable &&
              props.entregable.assignment &&
              props.entregable.assignment.COURSE_X_SEMESTER &&
              props.entregable.assignment.COURSE_X_SEMESTER.COURSE
                ? props.entregable.assignment.COURSE_X_SEMESTER.COURSE.name
                : "No contiene un curso vinculado"}
            </p>
          </div>
        </div>

        <div className="lineaEntregablePrimeraParteProfesor">
          <p className="entregable">Entregables</p>
          {props.entregableAnterior.ASSIGNMENT_TASKs &&
          props.entregableAnterior.ASSIGNMENT_TASKs.length != 0 ? (
            props.entregableAnterior.ASSIGNMENT_TASKs.map((taskAssign) => {
              return (
                <ul>
                  <li>{taskAssign.name}</li>
                </ul>
              );
            })
          ) : (
            <p className="fallo">No hay entregas hechas</p>
          )}
        </div>

        <div className="lineaObjetivoAnotacionPrimeraParteProfesor">
          <div className="lineaObjetivoPrimeraParteProfesor">
            <p className="objetivo">Objetivo</p>
            <textarea
              wrap="soft"
              placeholder="Ingrese el objetivo de la rúbrica..."
              defaultValue={
                props.entregable.rubric ? props.entregable.rubric.objective : ""
              }
              className="textAreaObjetivoRubricaEdit"
            />
            {/* <p className="descripcion">Descripción de Objetivo</p> */}
          </div>
          <div className="lineaAnotacionPrimeraParteProfesor">
            <p className="anotacion">Anotaciones</p>
            <textarea
              wrap="soft"
              placeholder="Ingrese sus anotaciones sobre la rúbrica..."
              defaultValue={
                props.entregable.rubric
                  ? props.entregable.rubric.annotations
                  : ""
              }
              className="textAreaAnotacionesRubricaEdit"
            />
            {/* <p className="Veranotacion">Ver Anotaciones</p> */}
          </div>
        </div>

        <div className="contenedorBotoneriaRubricaProfesor" style={{marginRight:"270px"}}>
          <button className="cancelar" onClick={cambioAlerta} type="button">
            Cancelar
          </button>
          <button
            className="guardar"
            form="editRubricaIdForm"
            type="submit"
            onClick={() => {
              setModalConfirmacion(true);
            }}
          >
            Guardar
          </button>
        </div>
      </div>

      <div>
        {modalAlerta && (
          <ModalsAlert
            closeAlert={setModalAlerta}
            alertText="¿Desea cancelar los cambios?"
            num={props.num}
            cxsid={props.cxsid}
            id={props.id}
            rubricId={props.rubricId}
          />
        )}
        {modalConfirmacion && (
          <ModalMensaje
            num={props.num}
            message="Se guardó correctamente el cambio"
            cxsid={props.cxsid}
            id={props.id}
            rubricId={props.rubricId}
          />
        )}
      </div>
    </form>
  );
}
