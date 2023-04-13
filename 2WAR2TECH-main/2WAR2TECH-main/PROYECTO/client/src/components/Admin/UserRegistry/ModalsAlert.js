import React from "react";
import "../../Modals/ModalsAlert.css";
import { axiosDeleteUser } from "../../../api/User";

export default function ModalsAlert({
  closeAlert,
  alertText,
  modalMessage,
  deleteList,
  setDeleteList,
}) {
  const JWTtoken = sessionStorage.getItem("token");
  return (
    <div className="modalMessageBackgroundMMM">
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
                const commentFormData = {
                  ids:deleteList
                };
                axiosDeleteUser(JWTtoken, commentFormData)
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
