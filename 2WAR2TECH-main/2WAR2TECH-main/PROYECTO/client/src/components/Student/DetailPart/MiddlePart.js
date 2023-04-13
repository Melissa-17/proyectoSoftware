import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "#Styles/Student/DetailPart/MiddlePart.css";
import { getScore, formatDate } from "#Helpers/assignmentHelpers.js";
import UploadDoc from "../../UploadDoc/UploadDoc";
import UploadDocAdviser from "../../Adviser/UploadDoc/UploadDocAdviser.js";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import RevisorModal from "./RevisorModal";

export default function MiddlePart(props) {
  const navigate = useNavigate();

  const {
    docs,
    setDocs,
    isLoadingDocs,
    setIsLoadingDocs,
    isLoadingDocsRetro,
    setIsLoadingDocsRetro,
    openConfirm,
    setOpenConfirm,
    cxsid,
    courseName,
    assign,
  } = props;

  const [openListRevisors, setOpenListRevisors] = useState(false);
  const studAssignment = props.assign ? props.assign.studentAssignment : null;

  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  let revisor = JSON.parse(localStorage.getItem("asesor"));
  // const revisor = (user.asesor) ? user.asesor : {
  //     USER: {name: 'Eduardo',
  //     fLastName: 'Rios',
  //     mLastName: 'Campos',
  //     SPECIALTies: [{
  //         name: 'Ingeniería Informática'
  //     }]}
  // };
  const revisorList =
    assign && assign.userRIdlist && assign.userRIdlist[0]
      ? assign.userRIdlist
      : null;
      // console.log(revisorList);
  // const rubricaClic = () =>{
  //     let revisorId = assign && assign.userRIdlist && assign.userRIdlist[0] ?  assign.userRIdlist[0] : revisor.USER.id;
  //     navigate(`/rubrica/${props.valor}/${props.opcion}/${revisorId}`, {
  //         state: {
  //             assignment: studAssignment,
  //             revisor: revisor,
  //             index: props.index,
  //             cxsid:cxsid,
  //             courseName:courseName
  //         }
  //     });
  // }

  return (
    props.assign &&
    studAssignment &&
    studAssignment.ASSIGNMENT && (
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
            <UploadDoc
              assign={studAssignment}
              docs={docs}
              setDocs={setDocs}
              getAssignDetail={props.getAssignDetail}
              isLoadingDocs={isLoadingDocs}
              setIsLoadingDocs={setIsLoadingDocs}
              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}
            />

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
            <UploadDocAdviser
              assign={studAssignment}
              isLoadingDocsRetro={isLoadingDocsRetro}
              setIsLoadingDocsRetro={setIsLoadingDocsRetro}
              revisaUsuario={() => {
                return false;
              }}
            />

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
              <button
                className="rubricaIntermedio"
                onClick={() => {
                  setOpenListRevisors(true);
                }}
              >
                Rúbrica
              </button>
            </div>
          </div>
        </div>
        {openListRevisors && (
          <RevisorModal
            revisorList={revisorList}
            valor={props.valor}
            opcion={props.opcion}
            studAssignment={studAssignment}
            revisor={revisor}
            cxsid={cxsid}
            index={props.index}
            courseName={courseName}
            closeMessage={setOpenListRevisors}
          />
        )}
      </div>
    )
  );
}
