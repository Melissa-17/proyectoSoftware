import React, { useState } from "react";
import "#Styles/Adviser/ThesisThemes/ProposalCard.css";
import { useNavigate } from "react-router";
import { Buffer } from "buffer";
import ModalsAlert from "../../Modals/ModalsAlert";
import { axiosDeleteUserThesis } from "../../../api/Thesis";

function ProposalCard(props) {
  const [openAlert, setOpenAlert] = useState(false);
  const JWTtoken = sessionStorage.getItem("token");

  const propuesta = props.propuesta;
  const alumno = props.student;
  const {setConfirmDelete, setLoadDelete} = props;

  const numAlumnos = alumno.length;
  const navigate = useNavigate();

  const sendToProposeDetail = () => {
    navigate("/asesor/proposeDetail", {
      state: {
        thesisId: propuesta.THESIS.id,
      },
    });
  };
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
    }else if (status == "SUSTENTADA") {
      return (
        <div className="iconoClock">
          {" "}
          <i class="bi bi-hand-index-thumb" style={{color:"#f4f4f4"}}></i>{" "}
        </div>
      );
    }else{
      return (
        <div className="iconoClock">
          {" "}
          <i class="bi bi-dash-circle-fill" style={{color:"#f4f4f4"}}></i>{" "}
        </div>
      );
    }
  };
  

  const deletePropose = (idThesis) => {
    setLoadDelete(true);
    axiosDeleteUserThesis(JWTtoken, idThesis, "ASESOR_POSTULANT")
    .then((res) => {
      setLoadDelete(false);
      setConfirmDelete(true);
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    }) 
 

  }

  // console.log(alumno[0] ? alumno[0].USER : "nada");

  //console.log(propuesta)
  return propuesta && alumno ? (
    <div>
      <div className="AdviserProposalCardContainer">
        <div className="AdviserProposalRowCard">
          <div className="ThesisData">
            <p>
              <strong>
                {propuesta
                  ? propuesta.THESIS.title.toUpperCase()
                  : "No hay titulo"}
              </strong>
            </p>
          </div>
        </div>
        <div className="studentCard">
          {alumno[0] && alumno[0].USER && alumno[0].USER.photo ? (
            <img
              className="profile-img"
              src={`data:image/png;base64,${Buffer.from(
                alumno[0].USER.photo.data
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
            <strong>
              {alumno[0] &&
              alumno[0].USER
                ? numAlumnos > 1
                  ? "Cuenta con más de un alumno asociado"
                  : alumno[0].USER.name +
                    " " +
                    alumno[0].USER.fLastName +
                    " " +
                    alumno[0].USER.mLastName
                : "No hay alumno asociado"}
            </strong>
          </p>
        </div>
        <div className="MPbotonesProposeRow">
          <div className="MPcardIcon">
            <div>
              {MPicono(
                propuesta.THESIS.status ? propuesta.THESIS.status : "PENDIENTE"
              )}
            </div>
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
              onClick={() => {
                setOpenAlert(true);
              }}
              type="button"
              // hidden={propose.type == "OWNER"}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {openAlert && (
        <ModalsAlert
          closeAlert={setOpenAlert}
          action={deletePropose}
          alertText="¿Está seguro que desea eliminar la propuesta?"
          messageText="Propuesta eliminada con éxito"
          item={propuesta.THESIS.id}
        />
      )}
    </div>
  ) : (
    <p>No hay alumno</p>
  );
}

export default ProposalCard;
