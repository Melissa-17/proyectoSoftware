import React, { useState } from "react";
import { useNavigate } from "react-router";
import "#Styles/Student/DetailPart/RevisorModal.css";
import { GridLoader } from "react-spinners";
import RevisorLine from "./RevisorLine";

function RevisorModal(props) {
  const {
    revisorList,
    valor,
    opcion,
    studAssignment,
    revisor,
    cxsid,
    index,
    courseName,
    closeMessage,
  } = props;
  const navigate = useNavigate();

  // const rubricaClic = () => {
  //   navigate(`/rubrica/${valor}/${opcion}/${revisorId}`, {
  //     state: {
  //       assignment: studAssignment,
  //       revisor: revisor,
  //       index: index,
  //       cxsid: cxsid,
  //       courseName: courseName,
  //     },
  //   });
  // };
  // console.log(revisorList);

  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="RMBody">
          <div className="RMHeader">
            <div className="pt1">
              <p className="RMHtitle">¿Qué retroalimentación desea ver?</p>
              <button onClick={()=>{closeMessage(false)}}>X</button>
            </div>
            <i class="bi bi-info-circle text-muted">
              Al hacer click en el nombre, le redirigirá a la rúbrica del
              revisor
            </i>
            <hr color="black" className="lineaRevModal" />
          </div>
          <div className="RMContent">
            {revisorList && revisorList.length > 0 ? (
              revisorList.map((revisorL, ind) => {
                return (
                  <div key={ind} className="espacioRevisors">
                    <RevisorLine
                      revisorId={revisorL[0]}
                      revisorName={revisorL[1]}
                      revisorRol={revisorL[2]}
                      studAssignment={studAssignment}
                      revisor={revisor}
                      index={index}
                      cxsid={cxsid}
                      courseName={courseName}
                      valor={valor}
                      opcion={opcion}
                    />
                  </div>
                );
              })
            ) : (
              <p>No hay revisores asigados</p>
            )}
          </div>
          <div className="RMFooter"></div>
        </div>
      </div>
    </div>
  );
}

export default RevisorModal;
