import React from "react";
import "../../Modals/ModalsAlert.css";
import { axiosDeleteSemester } from "../../../api/Semestres";

export default function ModalsAlertFacultyAdmin({
  closeAlert,
  alertText,
  modalMessage,
  deleteList,
  setDeleteList,
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
                // console.log(deleteList);
                axiosDeleteSemester(JWTtoken, deleteList)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.error(err);
                  });

                setDeleteList([]);
                closeAlert(false);
                modalMessage ? modalMessage(true) : (() => {})();
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
