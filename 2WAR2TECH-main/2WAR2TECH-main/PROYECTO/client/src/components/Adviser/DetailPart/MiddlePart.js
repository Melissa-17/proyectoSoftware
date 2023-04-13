import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "#Styles/Student/DetailPart/MiddlePart.css";
import { getScore, formatDate } from "#Helpers/assignmentHelpers.js";
import UploadDoc from "../../UploadDoc/UploadDoc";
import UploadDocAdviser from "../UploadDoc/UploadDocAdviser";
import ModalsAlertEditCriteria from "./ModalsAlert";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import ModalsError from "../../Modals/ModalsError";

export default function MiddlePart(props) {
  const navigate = useNavigate();
  const [modalMensaje, setModalMensaje] = useState(false);
  const { revisaUsuario, isLoadingDocs, setIsLoadingDocs, isLoadingDocsRetro, setIsLoadingDocsRetro,
  openConfirm, setOpenConfirm } = props;

  const studAssignment = props.assign && props.assign.studentAssignment ? props.assign.studentAssignment : null;
  // console.log(props)
  const [status, setStatus] = useState(studAssignment.status);
  const [openMdRub, setOpenMdRub] = useState(false);

  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem('user'));
  
    
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };
    let revisor = JSON.parse(localStorage.getItem('asesor'));
    // console.log(user);


    const getRevisorId = () => {
      if (user.ROLEs[0] && user.ROLEs[0].description == "Alumno")  {
        return revisor.USER.id;
      } else {
        return user.id;
      }
    }

    

    // showVistoBueno();
    
  const rubricaClic = () => {
    
    navigate(`/rubricaAdviser/${props.valor}/${props.opcion}/${getRevisorId()}`, {
      state: {
        assignment: studAssignment,
        revisor: revisor,
        index: props.index,
        student: props.student,
        course: props.course,
      },
    });
  };

  const cambioVistoBueno = () =>{
    setModalMensaje(true);
  }

  const funcionVistoBueno = () =>{
    if(studAssignment.status == "Entregado"){
      return <button className="vistoBueno" onClick={cambioVistoBueno}>
        Dar visto bueno
      </button>;
    }else{
      if(studAssignment.status == "Visto Bueno"){
        // console.log("a")
        return <button className="vistoBueno" onClick={cambioVistoBueno}>
          No dar visto bueno
        </button>;
      }else{
        return "";
      }
    }
  }

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
            <UploadDoc assign={studAssignment} 
            isLoadingDocs={isLoadingDocs}
            setIsLoadingDocs={setIsLoadingDocs}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            />
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
            <div className="botoneriaIntermedio">
              <UploadDocAdviser 
              revisaUsuario={revisaUsuario} assign={studAssignment} 
              isLoadingDocsRetro={isLoadingDocsRetro}
              setIsLoadingDocsRetro={setIsLoadingDocsRetro}
              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}
              />
            </div>
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
            <div className="botonVistoBueno">
              { !revisaUsuario() ? funcionVistoBueno() : null}
            </div>
          </div>
        </div>
        
        <div>
          {modalMensaje && <ModalsAlertEditCriteria
           closeAlert={setModalMensaje}
           message="¿Seguro que quiere aprobar el entregable?"
           studAssignment={studAssignment}
           option={studAssignment.status == "Entregado" ? 1:2}
           />}
           {
            openMdRub && 
            <ModalsError
            closeError={setOpenMdRub} 
            message={"No puede acceder a la rúbrica, debe esperar a que el asesor brinde el visto bueno."}
            />
           }
        </div>
      </div>
    )
  );
}
