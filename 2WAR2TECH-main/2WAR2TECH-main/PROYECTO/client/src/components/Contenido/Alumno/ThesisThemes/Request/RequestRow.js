import React from "react";
import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "#Helpers/stringHelpers.js";
import { formatDate } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer";
import "#Styles/Alumno/ThesisThemes/Request/RequestRow.css";
import { axiosDeleteUserThesis } from "#API/Thesis";
import ModalsAlert from '../../../../Modals/ModalsAlert'

function RequestRow(props) {
  const navigate = useNavigate();
  const { request, asesor, status, setConfirmDelete } = props;
  const [openAlert, setAlert] = useState(false);

  const JWTtoken = sessionStorage.getItem("token");

  const sendToRequestDetail = () => {
    navigate("/Thesis/request/detail", {
      state: {
        thesisId: request.id,
        status: status
      },
    });
  };

  const handleDeleteRequest = () => {
    axiosDeleteUserThesis(JWTtoken, request.id, 'STUDENT_APPLICANT')
    .then((res) => {
      console.log(res);
      setConfirmDelete(true);
    })
    .catch((err) => {
      console.error(`Handle Delete Request: ${err}`);
    })
  }

  const MPicono = (status) => {
    if (status == "APROBADO") {
      return (
        <div className="iconoCheck">
          {/* {" "} */}
          <i className="bi bi-check-circle-fill"></i>{" "}
        </div>
      );
    } else if (status == "RECHAZADO") {
      return (
        <div className="iconoEye">
          {/* {" "} */}
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
    } else if (status == "DENEGADO") {
    return (
      <div className="iconoDenied">
        {" "}
        <i className="bi bi-x-circle-fill"></i>{" "}
      </div>
    );
  }
  };

  const getStatus = (thesis) => {
    const status = thesis && thesis.USERs && thesis.USERs[0] 
    && thesis.USERs[0].USER_X_THESIS && thesis.USERs[0].USER_X_THESIS.type == "OWNER" ?
    "APROBADO"
    :
    thesis.USERs[0].USER_X_THESIS.type == "STUDENT_APPLICANT" ?
    "PENDIENTE"
    :
    null;

    return status;
  }

  return request 
  // && asesor 
  ? (
    <div className="MPcomponentList">
      <div className="MPcardList">
        {/* {console.log(request)} */}
        <div className="MPprimerContenedor">
          <div className="MPcardData">
            <p className="MPcardTitle">
              <strong>
                {request.title
                  ? request.title.toUpperCase()
                  : "No hay un titulo "}
              </strong>
            </p>
            <div className="MPdate">
              <p className="MPcardDateTitle">Fecha de solicitud: </p>
              <p className="MPcardDateDisp">
                {(request.USERs && request.USERs[0] && request.USERs[0].updatedAt)
                  ? formatDate(request.USERs[0].updatedAt)
                  : "No hay una fecha registrada"}
              </p>
            </div>
          </div>
          <div className="MPcardAdviser">
            {asesor && asesor.photo ? (
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
            <div>{MPicono(
              status
              // "DENEGADO"
              )}</div>
          </div>
          <div className="MRAcciones">
            <button className="MLSeeDetailBtn" onClick={sendToRequestDetail} type="button">
              Ver detalle
            </button>
            <button className="MLRequestBtn" type="button" onClick={setAlert}>Eliminar</button>
            {openAlert&&<ModalsAlert
                        closeAlert={setAlert}
                        action={handleDeleteRequest}
                        alertText="¿Está seguro que desea eliminar esta solicitud? "
                        messageText="Se ha eliminado con exito la solicitud"
                    />}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default RequestRow;
