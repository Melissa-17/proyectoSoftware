import React from "react";
import { useNavigate } from "react-router-dom";
import "#Styles/Adviser/ThesisThemes/StuProposeCard.css";
import { formatDate, getUserPhoto } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer";

function StuProposeCard(props) {
  const navigate = useNavigate();

  const sendToProposeDetail = () => {
    navigate("/asesor/stuProposeDetail", {
      state: {
        thesisId: stPropose.id,
      },
    });
  };

  const { stPropose, stList } = props;

  const numAlumnos = stList.length;

  return stPropose && stList ? (
    <div className="StuProposeCardContainer">
      <div className="StuProposeRowCard">
        <div className="ThesisData">
          <p>
            <strong>
              {stPropose.title
                ? stPropose.title.toUpperCase()
                : "No hay título"}
            </strong>
          </p>
        </div>
        <div className="MPdate">
          <p className="MPcardDateTitle">Fecha de solicitud: </p>
          <p className="MPcardDateDisp">
            {stPropose.createdAt
              ? formatDate(stPropose.createdAt)
              : "No hay una fecha registrada"}
          </p>
        </div>
      </div>
      <div className="studentCard">
        {stList[0] && stList[0].USER && stList[0].USER.photo ? (
          <img
            className="profile-img"
            src={`data:image/png;base64,${Buffer.from(
              stList[0].USER.photo.data
            ).toString("base64")}`}
            alt="profile-pic"
          />
        ) : (
          <img
            className="profile-img"
            // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            src="https://wallpapercave.com/uwp/uwp2417748.png"
            alt="foto alumno"
          />
        )}
        <p>
          <strong>{stList[0] && stList[0].USER && stList[0].USER.name && stList[0].USER.fLastName && stList[0].USER.mLastName ? numAlumnos > 1 ? "Cuenta con más de un alumno asociado" : stList[0].USER.name + " " + 
          stList[0].USER.fLastName + " " + stList[0].USER.mLastName : "No hay alumno asociado"}</strong>
        </p>
      </div>

      <div className="MRAcciones">
        <button
          className="MLSeeDetailBtn"
          onClick={sendToProposeDetail}
          type="button"
        >
          Ver detalle
        </button>
      </div>
    </div>
  ) : null;
}

export default StuProposeCard;
