import React from "react";
import { Buffer } from "buffer"; 

function ThesisDetail(props) {
  const thesis = props.thesis;
  console.log(thesis.USERs);
  const adviser =
    thesis && thesis.USERs
      ? thesis.USERs.filter((e) => e.USER_X_THESIS.type == "ASESOR")[0]
      : null;

  // const adviser = null;

  //   const thesis = null;
  //   const adviser = null;
  //     if (props.thesis) {
  //      thesis = props.thesis;
  //   }
  //   if (props.thesis.USERs[0]) {
  //      adviser = props.thesis.USERs[0];
  //   }

  return thesis ? (
    <div>
      <div className="TSrequestAdviser">
        <p className="TSadviser">
          <strong>Asesor:</strong>
        </p>
        <div className="TScardAdviser">
          {adviser && adviser.photo ? (
            <img
              className="TScardpfp"
              src={`data:image/png;base64,${Buffer.from(
                adviser.photo.data
              ).toString("base64")}`}
              alt="profile-pic"
            />
          ) : (
            <img
              className="TScardpfp"
              src="https://wallpapercave.com/uwp/uwp2417748.png"
              alt="foto asesor"
            />
          )}
          <div className="TScardData">
            <p className="TScardName">
              <strong>
                {adviser && adviser.name} {adviser && adviser.fLastName}{" "}
                {adviser && adviser.mLastName}
                {
                  (!adviser ||  (!adviser.name && !adviser.fLastName && !adviser.mLastName) ? "No tiene asesor" : "")
                }
              </strong>
            </p>
            <p className="TScardSpecialty">Ingeniería Informática</p>
          </div>
        </div>
      </div>

      <div className="TDdescription">
        <div className="TDdTitle">
          <p className="TDtitle">
            <strong>Título:</strong>
          </p>
          <div className="TDDtitleDiv">
            <p className="TDDtitle">
              {thesis.title ? thesis.title.toUpperCase() : "NO HAY TITULO"}
            </p>
          </div>
        </div>
        <div className="TDdArea">
          <p className="TDarea">
            <strong>Área:</strong>
          </p>
          <div className="TDDareaDiv">
            <p className="DIKDarea">
            {thesis.areaName
              ? thesis.areaName.toUpperCase()
              : "No hay área"
            }
            </p>
          </div>
        </div>
        <div className="TDdProposedTheme">
          <p className="TDproposedTheme">
            <strong>Objetivo:</strong>
          </p>
          <div className="TDDproposedThemeDiv">
            <p className="TDDproposedTheme">
              {thesis.objective
                ? thesis.objective.toUpperCase()
                : "NO HAY OBJETIVO"}
            </p>
          </div>
        </div>
        <div className="TDdObservations">
          <p className="TDobservations">
            <strong>Descripción:</strong>
          </p>
          <div className="TDDobservationsDiv">
            <p className="TDDobservations">
              {thesis.description
                ? thesis.description.toUpperCase()
                : "NO HAY DESCRIPCIÓN"}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ThesisDetail;
