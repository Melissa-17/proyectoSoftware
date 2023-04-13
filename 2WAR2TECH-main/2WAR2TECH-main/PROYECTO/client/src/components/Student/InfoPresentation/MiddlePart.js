import React from "react";
import "../../../assets/styles/Student/InfoPresentation/MiddlePart.css";
import { useNavigate } from 'react-router-dom';
import { getScore } from '#Helpers/assignmentHelpers.js';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function MiddlePart(props) {

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
  const link = props.assign ? props.assign.studentAssignment.linkVirtualSession : '';
// console.log(props);
  const rubricaClicExposicion = () =>{
    
    navigate(`/rubrica/${props.id}/${props.num*-1}/${revisor.USER.id}`,{
        state: {
            assignment: studAssignment,
            revisor: revisor,
            index: props.num
        }
    });
  }
  return (
    (props.assign && studAssignment && studAssignment.ASSIGNMENT) ? 
    <div className="parteIntermediaPresentacion">
      <div className="trabajoIntermedioPresentacion">
        <div className="tituloEncabezadoPresentacion">
          <p className="tituloIntermedioPresentacion">Trabajo</p>
          <p className="estadoIntermedioPresentacion">Asignado</p>
        </div>
        <div className="contenedorLinkZoom">
          <a href={link} className='linkZoom'>LINK DE LA SESION DE ZOOM</a>
        </div>
      </div>

      <div className="puntajeIntermedioPresentacion">
        <div className="tituloNotaPresentacion">
          <p>Nota Final</p>
        </div>
        <div className="notaIntermedioPresentacion">
          <p>{getScore(studAssignment.score)}/{studAssignment.ASSIGNMENT.maxScore}</p>
        </div>
        <div className="botonRubricaPresentacion">
          <button onClick={rubricaClicExposicion}
          className="rubricaIntermedioPresentacion">Rúbrica</button>
        </div>
      </div>
    </div>
    : null
  );
}
