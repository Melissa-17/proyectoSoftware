import React, { useEffect, useState } from "react";
import "../../../Modals/ModalsAlert.css";
import { axiosDeleteRubrics } from "../../../../api/Rubric";
import { axiosDeleteCriteriaLevels } from "../../../../api/RubricCriteria";
import { axiosDeleteCalificationCriteria } from "../../../../api/Calification";

function ModalsAlert(props) {
  // const [openMessage, setOpenMessage] = useState(false);
  const {
    closeAlert,
    alertText,
    action,
    item,
    estado,
    setEstado,
    setFileList,
    fileList,
    closeMensaje,
    deleteAssignList,
    setDeleteAssignList,
    source,
    rubricId,
    criterioId,
    setEstadoDeleteLevel,
    setEstadoChecked
  } = props;
  const JWTtoken = sessionStorage.getItem("token");
  // console.log(deleteAssignList);
  useEffect(() => {}, [setEstado, setFileList, fileList]);

  return (
    <div className="modalAlertBackground">
      <div className="modalAlertContainer">
        <div className="MAbody">
          <div className="MAalert">
            <i class="bi bi-question-circle"></i>
            <p className="MAdescripcionTexto">{alertText}</p>
          </div>
          <div className="MAfooter">
            <button
              className="MAaccept"
              onClick={() => {
                if (source == "CRITERIA") {

                  axiosDeleteRubrics(JWTtoken, rubricId, {"criterios": deleteAssignList})
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });

                  setDeleteAssignList([]);
                  setEstadoChecked(false);
                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (() => {})();
                  

                } else if (source == "NIVEL") {

                  // console.log(deleteAssignList)
                  
                  axiosDeleteCriteriaLevels(JWTtoken, criterioId, {"levels": deleteAssignList})
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });

                  setDeleteAssignList([]);
                  setEstadoDeleteLevel(false);
                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (() => {})();
                }
                else if (source == "CURSO"){
                  deleteAssignList.map((id) => {
                    axiosDeleteCalificationCriteria(JWTtoken, id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                  })
                   
                  setEstadoChecked(false);
                  setDeleteAssignList([]);
                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (() => {})();
                }
                // update ? update() : (()=>{})();
              }}
            >
              Aceptar
            </button>
            {/* {closeMensaje && (
              <ModalsMessage
                closeMessage={closeMensaje}
                message={messageText}
              />
            )} */}
            {/* {console.log(criterioId)} */}
            <button className="MAcancel" onClick={() => closeAlert(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalsAlert;
