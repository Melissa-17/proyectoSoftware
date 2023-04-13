import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "#Styles/Student/DetailPart/MiddlePart.css";
import { getScore, formatDate } from "#Helpers/assignmentHelpers.js";
import UploadDoc from "../../../UploadDoc/UploadDoc";
import UploadDocAdviser from "../../../Adviser/UploadDoc/UploadDocAdviser";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function MiddlePartTeacher(props) {
  const navigate = useNavigate();

  const studAssignment = props.assign ? props.assign.studentAssignment : null;
  let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    let revisor = JSON.parse(localStorage.getItem('asesor'));
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };

  const rubricaClic = () => {
    navigate(`/rubricaTeacher/${props.valor}/${props.opcion}/${revisor.USER.id}`, {
      state: {
        assignment: studAssignment,
        revisor: revisor,
        index: props.index,
        student: props.student,
        num:props.num,
        course: props.course
      },
    });
  };

  return (
    (props.assign && studAssignment) && (
      <div className="parteInterm">
        <div className="trabajoInterm">
          <div className="contenedorTituloEntregable">
            <p className="tituloIntermedio">Trabajo</p>
            <p className="estadoIntermedio">{studAssignment.status}</p>
          </div>
          {/* <div>
                <img
                src={UploadDoc.ImageSelectedPrevious}
                alt=""
                height="150px"
                width="250px"
                />
            </div> */}
          <div className="botoneriaEncabezado">
            <UploadDoc assign={studAssignment} />
            {/* <UploadDoc assign={studAssignment}/> */}

            {/* <button className='anhadir' >
                + Añadir o crear
                </button> */}
            {/* <button className='entregar' >
                    Entregar
                </button> */}
          </div>
        </div>
        <div className="areaLabor">
          <div className="encabezado">
            <div className="tituloEncabezado">
              <i className="bi bi-person-square" />
              <p className="retroIntermedio">Retroalimentación</p>
            </div>
            <UploadDocAdviser assign={studAssignment} />
            {/* <input type="file" name="files" multiple onChange={(e)=>subirArchivos(e.target.files)}/>  */}
          </div>

          <div className="puntajeInterm">
            <div className="tituloNota">
              <p>Nota</p>
            </div>
            <div className="notaIntermedio">
              <p>
                {getScore(studAssignment.score)}/
                {studAssignment.ASSIGNMENT.maxScore}
              </p>
            </div>
            <div className="botonRubrica">
              <button className="rubricaIntermedio" onClick={rubricaClic}>
                Rúbrica
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
