import React from "react";
import "../../Modals/ModalsAlert.css";
import { axiosDeleteUser } from "../../../api/User";

export default function ModalsAlertEditCriteria({
  closeAlert,
  alertText,
  modalMessage,
  deleteStudentAdviser,
  setStudentAdviser,
  cxsid
}) {
  const JWTtoken = sessionStorage.getItem("token");
  return (
      <div className="modalAlertBackground">
        <div className="modalAlertContainer">
          <div className="MAbody">
            <div className="MAalert">
              <i class="bi bi-question-circle"></i>
              <p className="textoAlertDesahabilitar">{alertText}</p>
            </div>
            <div className="MAfooter">
              <button
                className="MAaccept"
                onClick={() => {
                  axiosDeleteUser(JWTtoken, { "ids": deleteStudentAdviser,})
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });

                  setStudentAdviser([]);
                  closeAlert(false);
                  modalMessage ? modalMessage(true) : (() => {})();
                }}
                type="submit"
                form="pantallaGestionPersonaProfesor"
              >
                Aceptar
              </button>
              <button className="MAcancel" onClick={() => closeAlert(false)} type="button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
