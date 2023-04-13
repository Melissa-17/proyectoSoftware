import React, { useState } from "react";
import "#Styles/Coordinador/Sustain/ThesisRow.css";
import { axiosPatchThesis } from "#API/Thesis";

function ThesisRow(props) {
  const { thesis, confirmSustentado, setConfirmSustentado,  confirmNSustentado, setConfirmNSustentado,
  setLoadSustentado } = props;
  // const [sustain, setSustain] = useState(thesis && thesis.status ? thesis.status : "");
  const JWTtoken = sessionStorage.getItem("token");

  const patchThesis = (accion) => {
    setLoadSustentado(true);
    const body = {
      thesisId: thesis.id,
      status: accion,
    };

    axiosPatchThesis(JWTtoken, body)
      .then((response) => {
        setLoadSustentado(false);
        console.log(response.data);
        if (body.status == "SUSTENTADA") {
          setConfirmNSustentado(true);
        } else {
          setConfirmSustentado(true);
        }
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const sustain = thesis && thesis.status ? thesis.status : "";

  const funcionEstado = () => {
    if (sustain === "SUSTENTADA") {
      return (
        <div className="stateYes">
          <p>Sustentada</p>
        </div>
      );
    } else if (sustain === "APROBADO") {
      return (
        <div className="stateNo">
          <p>No Sustentada</p>
        </div>
      );
    }
  };

  const funcionBtn = () => {
    if (sustain === "SUSTENTADA") {
      return (
        <button
          onClick={() => {
            patchThesis("APROBADO");
          }}
        >
          <i class="bi bi-x-circle fa-2x text-danger"></i>
        </button>
      );
    } else if (sustain === "APROBADO") {
      return (
        <button
          onClick={() => {
            patchThesis("SUSTENTADA");
          }}
        >
          <i class="bi bi-check2-circle fa-2x text-success"></i>
        </button>
      );
    }
  };

  const name =
    thesis &&
    thesis.USER_X_THEses &&
    thesis.USER_X_THEses[0] &&
    thesis.USER_X_THEses[0].USER &&
    thesis.USER_X_THEses[0].USER.name
      ? thesis.USER_X_THEses[0].USER.name
      : "Error nombre";
  const flName =
    thesis &&
    thesis.USER_X_THEses &&
    thesis.USER_X_THEses[0] &&
    thesis.USER_X_THEses[0].USER &&
    thesis.USER_X_THEses[0].USER.fLastName
      ? thesis.USER_X_THEses[0].USER.fLastName
      : "Error aPat";
  const mlName =
    thesis &&
    thesis.USER_X_THEses &&
    thesis.USER_X_THEses[0] &&
    thesis.USER_X_THEses[0].USER &&
    thesis.USER_X_THEses[0].USER.mLastName
      ? thesis.USER_X_THEses[0].USER.mLastName
      : " ";
  const name1 =
    thesis &&
    thesis.USER_X_THEses &&
    thesis.USER_X_THEses[1] &&
    thesis.USER_X_THEses[1].USER &&
    thesis.USER_X_THEses[1].USER.name
      ? thesis.USER_X_THEses[1].USER.name
      : "Error nombre";
  const flName1 =
    thesis &&
    thesis.USER_X_THEses &&
    thesis.USER_X_THEses[1] &&
    thesis.USER_X_THEses[1].USER &&
    thesis.USER_X_THEses[1].USER.fLastName
      ? thesis.USER_X_THEses[1].USER.fLastName
      : "Error aPat";
  const mlName1 =
    thesis &&
    thesis.USER_X_THEses &&
    thesis.USER_X_THEses[1] &&
    thesis.USER_X_THEses[1].USER &&
    thesis.USER_X_THEses[1].USER.mLastName
      ? thesis.USER_X_THEses[1].USER.mLastName
      : " ";

  const cantAlumnos =
    thesis && thesis.USER_X_THEses && thesis.USER_X_THEses.length
      ? thesis.USER_X_THEses.length
      : 0;

  const funcionNombre = () => {
    if (cantAlumnos === 1)
      return (
        <p className="sdName">
          {name} {flName} {mlName}
        </p>
      );
    else if (cantAlumnos > 1)
      return (
        <div>
          <p className="sdName">
            {name} {flName} {mlName}
          </p>
          <p className="sdName">
            {name1} {flName1} {mlName1}
          </p>
        </div>
      );
  };

  return (
    <div className="thesisRowMainContainer">
      <div className="thesisData">
        <p className="tdTitle">
          <strong>
            {thesis && thesis.title ? thesis.title : "Error con el titulo"}
          </strong>
        </p>
      </div>
      <div className="studentData">
        {funcionNombre()}
        {/* <a href="mailto:m.gudielp@pucp.edu.pe">m.gudielp@pucp.edu.pe</a> */}
      </div>

      <div className="sustainState">{funcionEstado()}</div>
      <div className="btnData">{funcionBtn()}</div>
    </div>
  );
}

export default ThesisRow;
