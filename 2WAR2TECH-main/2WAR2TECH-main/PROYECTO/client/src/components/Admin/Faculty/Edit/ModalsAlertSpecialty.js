import React, {useState} from "react";
import "../../../Modals/ModalsAlert.css";
import { axiosDisableSpecialty } from "../../../../api/Specialty";
import { axiosDeleteSpecialty } from "../../../../api/Specialty";
import {axiosDeleteTeacherSchedule} from "#API/User"

export default function ModalsAlertSpecialty({
  closeAlert,
  alertText,
  modalMessage,
  especialidad,
  coordinadorItem,
  horarioItem,
  profesorItem,
  option,
  setModalMensaje2
}) {
  const JWTtoken = sessionStorage.getItem("token");
  var a=[];
  return (
    <div className="modalAlertBackground">
      <div className="modalAlertContainer">
        <div className="MAbody">
          <div className="MAalert">
            <i class="bi bi-question-circle"></i>
            <p
              className="MAdescripcionTextoSpecialty"
              style={{ color: "white" }}
            >
              {alertText}
            </p>
          </div>
          <div className="MAfooter">
            <button
              className="MAaccept"
              type="button"
              onClick={() => {
                if (option == 3) {
                  axiosDeleteTeacherSchedule(
                    JWTtoken,
                    horarioItem.id,
                    profesorItem.id
                  )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  closeAlert(false);
                  modalMessage ? modalMessage(true) : (() => {})();
                }else if (option == 4) {
                  // setDeleteList(horarioItem.id);
                  a.push(horarioItem.id);
                  axiosDeleteTeacherSchedule(
                    JWTtoken,
                    a,
                    profesorItem.id
                  )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  closeAlert(false);
                  setModalMensaje2(true);
                  modalMessage ? modalMessage(true) : (() => {})();
                }
                else if (option == 2) {
                  axiosDisableSpecialty(
                    JWTtoken,
                    coordinadorItem.id,
                    especialidad.id
                  )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  closeAlert(false);
                  modalMessage ? modalMessage(true) : (() => {})();
                } else {
                  axiosDeleteSpecialty(JWTtoken, especialidad.id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  closeAlert(false);
                  modalMessage ? modalMessage(true) : (() => {})();
                }
                // console.log(especialidad.id);
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
