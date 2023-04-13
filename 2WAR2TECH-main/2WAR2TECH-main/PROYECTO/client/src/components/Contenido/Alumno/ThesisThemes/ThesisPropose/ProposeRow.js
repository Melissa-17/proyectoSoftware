import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "#Helpers/stringHelpers.js";
import { formatDate } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer";
import "#Styles/Alumno/ThesisThemes/ThesisPropose/ProposeRow.css";
import { axiosDeleteUserThesis } from "#API/Thesis";
import ModalsAlert from "../../../../Modals/ModalsAlert";
import { useState } from "react";

function ProposeRow(props) {
  const navigate = useNavigate();
  const { propose, asesor, setLoadDelete } = props;
  const JWTtoken = sessionStorage.getItem("token");
  const [openAlert, setAlert] = useState(false);

  const sendToProposeDetail = () => {
    navigate("/Thesis/proposeDetail", {
      state: {
        thesisId: propose.THESIS.id,
        asesor: asesor,
      },
    });
  };

  const handleDeletePropose = () => {
    setAlert(false);
    setLoadDelete(true);
    axiosDeleteUserThesis(JWTtoken, propose.THESIS.id, "STUDENT_POSTULANT")
      .then((res) => {
        console.log(res);
        
        setLoadDelete(false);
        props.confirmation(true)
      })
      .catch((err) => {
        console.error(`Handle Delete Propose: ${err}`);
      });
      
      ;


  };

  console.log(propose.THESIS)

  const MPicono = (status) => {
    if (status == "APROBADO") {
      return (
        <div className="iconoCheck">
          {" "}
          <i className="bi bi-check-circle-fill"></i>{" "}
        </div>
      );
    } else if (status == "EN OBSERVACIÓN") {
      return (
        <div className="iconoEye">
          {" "}
          <i className="bi bi-eye-fill"></i>{" "}
        </div>
      );
    } else if (status == "PENDIENTE") {
      return (
        <div className="iconoClock">
          {" "}
          <i className="bi bi-clock-fill"></i>{" "}
        </div>
      );
    }
  };

  return propose && asesor ? (
    <div className="MPcomponentList">
      <div className="MPcardList">
        <div className="MPprimerContenedor">
          <div className="MPcardData">
            <p className="MPcardTitle">
              <strong>
                {propose.THESIS.title
                  ? propose.THESIS.title.toUpperCase()
                  : "No hay un titulo "}
              </strong>
            </p>
            <div className="MPdate">
              <p className="MPcardDateTitle">Fecha de solicitud: </p>
              <p className="MPcardDateDisp">
                {propose.updatedAt
                  ? formatDate(propose.updatedAt)
                  : "No hay una fecha registrada"}
              </p>
            </div>
          </div>
          <div className="MPcardAdviser">
            {asesor.photo ? (
              <img
                className="profile-img"
                src={`data:image/png;base64,${Buffer.from(
                  asesor.photo.data
                ).toString("base64")}`}
                alt="profile-pic"
              />
            ) : (
              <img
                className="MPcardpfp"
                // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                src="https://wallpapercave.com/uwp/uwp2417748.png"
                alt="foto asesor"
              />
            )}
            <p className="MPardName">
              {asesor
                ? asesor.name + " " + asesor.fLastName + " " + asesor.mLastName
                : "No hay un asesor asignado"}
            </p>
          </div>
        </div>
        <div className="MPbotonesProposeRow">
          <div className="MPcardIcon">
            <div>{MPicono(propose.THESIS.status)}</div>
          </div>
          <div className="MRAcciones">
            <button
              className="MLSeeDetailBtn"
              onClick={sendToProposeDetail}
              type="button"
            >
              Ver detalle
            </button>
            <button
              className="MLRequestBtn"
              onClick={setAlert}
              type="button"
              hidden={propose.THESIS.status == "APROBADO"}
            >
              Eliminar
            </button>
            {openAlert && (
              <ModalsAlert
                closeAlert={setAlert}
                action={handleDeletePropose}
                alertText="¿Está seguro que desea eliminar esta solicitud? "
                messageText="Se ha eliminado con exito la solicitud"
                setLoadDelete={setLoadDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ProposeRow;
