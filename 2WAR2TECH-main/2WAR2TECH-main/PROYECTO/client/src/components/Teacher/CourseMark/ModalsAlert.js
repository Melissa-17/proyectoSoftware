import React from "react";
import "../../Modals/ModalsAlert.css";
import { axiosDeleteCalificationCriteria } from "../../../api/Calification";
import { axiosDeleteEvaluation } from "../../../api/Calification";

export default function ModalsAlert({
  closeAlert,
  alertText,
  modalMensaje,
  setDeleteAssignList,
  deleteCriterio,
  option,
  setValidacionEvaluacion
}) {
  const JWTtoken = sessionStorage.getItem("token");
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
                if (option == 2) {
                  axiosDeleteEvaluation(JWTtoken, deleteCriterio)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  setDeleteAssignList([]);
                  closeAlert(false);
                  modalMensaje ? modalMensaje(true) : (() => {})();
                } else {
                  deleteCriterio.map((e) => {
                    axiosDeleteCalificationCriteria(JWTtoken, e)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  });

                  setDeleteAssignList([]);
                  setValidacionEvaluacion(true);
                  closeAlert(false);
                  modalMensaje ? modalMensaje(true) : (() => {})();
                }
              }}
            >
              Aceptar
            </button>
            <button className="MAcancel" onClick={() => closeAlert(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
