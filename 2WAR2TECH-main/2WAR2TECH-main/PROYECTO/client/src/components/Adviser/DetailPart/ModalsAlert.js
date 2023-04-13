import React from "react";
import "../../Modals/ModalsAlert.css";
import { axiosChangeAssignmentStatus } from "../../../api/AssignmentStudent";

export default function ModalsAlertEditCriteria({
  closeAlert,
  message,
  studAssignment,
  option,
}) {
  const JWTtoken = sessionStorage.getItem("token");

  const funcionCambioStatus = () => {
    if(option==1){
      const commentFormData = {
        idAXS: studAssignment.id,
        status: "Visto Bueno",
      };
      axiosChangeAssignmentStatus(JWTtoken, commentFormData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }else{
      const commentFormData = {
        idAXS: studAssignment.id,
        status: "Entregado",
      };
      axiosChangeAssignmentStatus(JWTtoken, commentFormData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    closeAlert(false);
  };

  return (
    <div className="modalAlertBackground">
      <div className="modalAlertContainer">
        <div className="MAbody">
          <div className="MAalert">
            <i class="bi bi-question-circle"></i>
            <p className="MAdescripcionTexto">{message}</p>
          </div>
          <div className="MAfooter">
            <button className="MAaccept" 
            onClick={funcionCambioStatus}
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
