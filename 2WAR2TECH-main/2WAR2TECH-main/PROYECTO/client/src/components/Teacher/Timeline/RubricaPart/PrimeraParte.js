import React from "react";
import "../../../../assets/styles/Teacher/Timeline/RubricaPart/PrimeraParte.css";
import { useNavigate } from "react-router";

export default function PrimeraParte(props) {
  const navigate = useNavigate();
  // console.log(props.entregable)

  const cambioEditar = () => {
    navigate(`/timeline/rubrica/edit/${props.num}`, {
      state: {
        cxsid: props.cxsid,
        id: props.id,
        rubricId: props.entregableAnterior.RUBRICId,
        rubricaDetail: props.entregable
      },
    });
  };
  return (
    <div className="contenedorPrimeraParteProfesor">
      <div className="contenedorInformacionPrimeraParteProfesor">
        <p>Información general</p>
        <button className="editar" onClick={cambioEditar}>
          Editar
        </button>
      </div>

      <div className="lineaFacultadCursoPrimeraParteProfesor">
        <div className="lineaFacultadPrimeraParteProfesor">
          <p className="facultad">Facultad</p>
          <p className="area">
            {props.entregable.specialty
              ? props.entregable.specialty.name
              : "No contiene una facultad"}
          </p>
        </div>
        <div className="lineaCursoPrimeraParteProfesor">
          <p className="curso">Curso</p>
          <p className="titulo">
          {props.entregable && props.entregable.assignment && props.entregable.assignment.COURSE_X_SEMESTER 
              && props.entregable.assignment.COURSE_X_SEMESTER.COURSE
                ? props.entregable.assignment.COURSE_X_SEMESTER.COURSE
                    .name
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
          {/* <textarea  wrap="soft" placeholder="Ingrese el objetivo de la rúbrica..." /> */}
          <p className="descripcion">{props.entregable.rubric && props.entregable.rubric.objective != ""?
          props.entregable.rubric.objective:
          "No contiene un objetivo determinado"}</p>
        </div>
        <div className="lineaAnotacionPrimeraParteProfesor">
          <p className="anotacion">Anotaciones</p>
          {/* <textarea  wrap="soft" placeholder="Ingrese sus anotaciones sobre la rúbrica..." /> */}
          <p className="Veranotacion">{props.entregable.rubric && props.entregable.rubric.annotations != ""?
          props.entregable.rubric.annotations:
          "No contiene alguna anotación"}</p>
        </div>
      </div>
    </div>
  );
}
