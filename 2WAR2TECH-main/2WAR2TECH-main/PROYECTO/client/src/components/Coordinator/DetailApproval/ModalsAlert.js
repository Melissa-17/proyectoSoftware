import React from "react";
import "../../Modals/ModalsAlert.css";
import { axiosUnlinkAsesor } from "../../../api/Thesis";
import { axiosUnlinkStudent } from "../../../api/Thesis";

export default function ModalsAlert({closeAlert, modalMessage, alertText, thesisData, usuario, usuarios, option}) {
  const JWTtoken = sessionStorage.getItem("token");
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
                if(option==1){
                  axiosUnlinkAsesor(
                    JWTtoken,
                    thesisData.id,
                    usuario.id
                  )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  closeAlert(false);
                  modalMessage ? modalMessage(true) : (() => {})();
                  console.log(usuario.id);
                }else if(option==2){
                  usuarios.map((e, index) => {
                    axiosUnlinkStudent(
                      JWTtoken,
                      thesisData.id,
                      e.id
                    )
                      .then((res) => {
                        console.log(res);
                        if (index == (usuarios.length-1)) {
                          closeAlert(false);
                          modalMessage ? modalMessage(true) : (() => {})();
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  })
                  
                  
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
