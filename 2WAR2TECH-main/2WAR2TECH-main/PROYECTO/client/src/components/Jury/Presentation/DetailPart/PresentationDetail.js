import React, { useState, createContext, useContext, useEffect } from "react";
import "#Styles/Jury/Presentation/DetailPart/PresentationDetail.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InitialPart from "./InitialPart";
import FinalPart from "./FinalPart";
import MiddlePart from "./MiddlePart";
import { axiosGetFinalAssignmentDetail } from "#API/FinalAssignment.js";
import Loading from "../../../Loading/Loading";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";

import { UserContext } from "#Context/userContext.js";
import { axiosGetDetailExpostionJury } from "#API/PresentationAssignment";
import { GridLoader } from "react-spinners";
import { capitalizeTitle } from "../../../../helpers/stringHelpers";
import { formatDate } from "../../../../helpers/assignmentHelpers";
import ModalsAlert from "../../../Modals/ModalsAlert";
import ModalsMessage from "../../../Modals/ModalsMessage";

export default function PresentationDetail() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { idAXS, curso, 
    presentation,
    num
  } = useLocation().state;
  // const index = 1;
  // const student = 1;
  // const course = 1;

  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));

  // console.log(user);
  // console.log(assignID);
  // console.log(curso);
  // console.log(presentation);

  const idR = user.id;

  const [expoDetail, setExpoDetail] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");
  // console.log(idAXS,idR)
  const getExpoDetail = () => {
    axiosGetDetailExpostionJury(JWTtoken, idAXS, idR)
      .then((response) => {
        console.log(response)
        const data = response.data || "";
        // console.log(data);
        setExpoDetail(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error Final Assign Detail: ${error}`);
      });
  };

  // const getAllFinalAssign = () => {
  //axiosGetDetailExpostionJury
  //   axiosGetFinalAssignmentDetail(JWTtoken, assignID)
  //     .then((response) => {
  //       const data = response.data || "";
  //       //console.log(data);
  //       setFinalAssign(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(`Error Final Assign Detail: ${error}`);
  //     });
  // };

  //  console.log(finalAssign);

  // const assignment =
  //   finalAssign && finalAssign.ASSIGNMENT ? finalAssign.ASSIGNMENT : null;
  // console.log(expoDetail)
  const expo =
    expoDetail && expoDetail.exposition ? expoDetail.exposition : null;
    // console.log(expo)
  const revision =
    expoDetail && expoDetail.revision ? expoDetail.revision : null;
    // console.log(revision)
  const userInfo = expo && expo.USER ? expo.USER : null;

  const Sname = userInfo && userInfo.name ? userInfo.name : "Error";
  const SFLname = userInfo && userInfo.fLastName ? userInfo.fLastName : " ";
  const SMLname = userInfo && userInfo.mLastName ? userInfo.mLastName : " ";

  const date =
    expo && expo.meetingDate ? expo.meetingDate : null;

  // console.log(revision);

  const retrocesoClic = () => {
    if(num==1){
      navigate(`/jury/presentation/students`, {
        state: {
          curso: curso,
          num:num
        },
      });
    }else{
      if(num==2){
        navigate(`/asesor/presentation/students`, {
          state: {
            curso: curso,
            num:num
          },
        });
      }else if(num==3){
        navigate(`/teacher/presentation/students`, {
          state: {
            curso: curso,
            num:num
          },
        });
      }
    }
  };

   //Modales
   const [alert, setAlert] = useState(false);
   const [confirmationSave, setConfirmationSave] = useState(false);
   const [saving, setSaving] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const [confirmationDelete, setConfirmationDelete] = useState(false); 

   useEffect(() => {
    getExpoDetail();
  },[]);

  return (
    <div>
      {loading ? (
        <GridLoader
          className="mx-auto"
          color="#042354"
          loading={loading}
          size={16}
        />
      ) : (
        <div className="main-box-detail">
          <CreateNewUserPageStudent />
          <div className="contenedor-detalle">
            <div className="contenedor-encabezado-detalle">
              <div className="contenedor-titulo-detalle-jurado">
                <h1 className="titulo-expo">Presentación Oral </h1>
                <div className="retrocederHeaderRegisterCoordinator">
                  <button
                    onClick={retrocesoClic}
                    className="botonRetrocesoDetalle"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                      className="imagenRetrocesoDetalle"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="contenedor-linea-detalle">
              <hr color="#CED4DA" className="linea" />
            </div>

            <div className="expoInfo">
              <div>
                {/* <p className="expoItitle">{assignment.assignmentName}</p> */}
                <p className="expoIstart">
                  Tema de Tesis:{" "}
                  {userInfo &&
                  userInfo.THEses &&
                  userInfo.THEses[0] &&
                  userInfo.THEses[0].title
                    ? capitalizeTitle(userInfo.THEses[0].title)
                    : "Error"}
                </p>
                <p className="expoIstart">
                  Alumno: {Sname} {SFLname} {SMLname}
                </p>
                {
                  date?
                  <> 
                  <p className="expoIstart">
                      Fecha: {formatDate(date, "DD/MM/YYYY")}
                  </p>
                  <p className="expoIend">
                    Hora:{"  "}
                    {formatDate(date, "hh:mm")}
                  </p>
                  </>
                  :
                  ''
                }
              </div>
              <div className="expoIasesor"></div>
            </div>
            <div className="contenedorLineaExposicion">
              <hr color="#CED4DA" className="linea" />
            </div>
            <div className="expoLocationJury">
              {expo && expo.linkVirtualSession ? (
                <p>
                  Enlace a la{" "}
                  <a href={expo.linkVirtualSession} target="_blank">
                    sesión virtual
                  </a>
                </p>
              ) : expo && expo.location ? (
                <p>Ubicación: {expo.location} </p>
              ) : (
                <i class="bi bi-info-circle">
                  {"  "}Aún no se ha definido la forma en la que se realizará la
                  presentación oral.
                </i>
              )}
            </div>
            <div className="EFBtitleJury">
              <i class="bi bi-person-workspace fa-2x"></i>
              <p>Retroalimentación:</p>
            </div>
            <MiddlePart revision={revision} expo={expo} 
            setConfirmationSave={setConfirmationSave}
            setConfirmationDelete={setConfirmationDelete}
            num={num} presentation={presentation}
            />
          </div>
          
        </div>
      )}
    </div>
  );
}
