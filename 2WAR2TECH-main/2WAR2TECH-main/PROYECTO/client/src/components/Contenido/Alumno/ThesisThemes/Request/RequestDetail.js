import React, { useEffect, useState } from "react";
import Navbar from "../../../../SidebarMenu/Navbar";
import "#Styles/Alumno/ThesisThemes/Request/RequestDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosGetThesisDetails } from "#API/Thesis";
import { axiosGetUserInfo } from "#API/User";
import { capitalize, capitalizeTitle } from "#Helpers/stringHelpers.js";
import { Buffer } from "buffer";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import { axiosGetTeam } from "../../../../../api/Thesis";

function RequestDetail(props) {
  const navigate = useNavigate();
  const { thesisId, status } = useLocation().state;
  const [userInfo, setUserInfo] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [requestDetail, setRequestDetail] = useState(null);
  const getUserInfo = () => {
    axiosGetUserInfo(JWTtoken)
      .then((response) => {
        // console.log(response.data);
        const data = response.data || null;
        setUserInfo(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  console.log(userInfo);
  // const asesor =
  //   requestDetail && requestDetail.USERs ? requestDetail.USERs[1] : null;
  const JWTtoken = sessionStorage.getItem("token");

  

  const getRequestDetail = () => {
    axiosGetThesisDetails(JWTtoken, thesisId)
      .then((response) => {
        console.log(response.data);
        const data = response.data || [];
        setRequestDetail(data);

        axiosGetTeam(JWTtoken, thesisId) 
        .then((res) => {
          // console.log("TEAM: " + JSON.stringify(res.data))
          setTeamMembers(res.data);
        })
        .catch((err) => {
          console.error(`Error TEAM: ${err}`);
        })
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [])
  
  useEffect(() => {
    
    getRequestDetail();
  }, [userInfo]);

  const retrocesoClic = () => {
    navigate("/Thesis/request");
  };
  

  // const teamMembers =
  //   requestDetail && userInfo
  //     ? requestDetail.USERs.filter((user) => {
  //       console.log(user);
  //       // console.log(userInfo.TEAM.id);
  //         return (
  //           user.USER_X_THESIS.type == "STUDENT_APPLICANT" &&
  //           user.id != userInfo.id &&
  //           user.TEAM && userInfo.TEAMs && userInfo.TEAMs.include(user.TEAM.id)

  //         );
  //       })
  //     : null;

  const asesor =
  requestDetail && userInfo
      ? requestDetail.USERs.filter((user) => {
          return (
            user.USER_X_THESIS.type == "ASESOR"

          );
        })[0]
      : null;
  return requestDetail && asesor ? (
    <div>
      <Navbar />
      <div className="requestDetailContainer">
        <div className="RDheader">
          <h1 className="RDtitle">DETALLE DE TEMA DE TESIS</h1>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
        <hr color="black" className="lineaMPmiddle" />

        <div className="RDcontent">
          <div className="RDleft">
            <div className="RDstate">
              <p className="RD-state">
                <strong>Estado:</strong>
              </p>
              <p className="RDDstate">
                {capitalizeTitle(status)}
              </p>
            </div>
            <div className="RDteam">
              {console.log(teamMembers)}
              <p className="RD-team">
                <strong>Equipo:</strong>
              </p>
              {teamMembers && teamMembers.length > 0 ? (
                teamMembers.map((mem, index) => {
                  const member = mem.USER_X_THESIS.USER;
                  return (
                    <div className="RDteamCard">
                      {member.photo ? (
                        <img
                          className="RDcardpfp"
                          src={`data:image/png;base64,${Buffer.from(
                            member.photo.data
                          ).toString("base64")}`}
                          alt="profile-pic"
                        />
                      ) : (
                        <img
                          className="RDcardpfp"
                          //src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                          src="https://wallpapercave.com/uwp/uwp2417748.png"
                          alt="foto asesor"
                        />
                      )}
                      <p>
                        {member.name +
                          " " +
                          member.fLastName +
                          " " +
                          member.mLastName}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="RDteamCard">
                  {/* <img
                        className="RDcardpfp"
                        //src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        src="https://wallpapercave.com/uwp/uwp2417748.png"
                        alt="foto asesor"
                      /> */}
                  <i class="bi bi-person fa-6x"></i>
                  <p>No cuenta con equipo</p>
                </div>
              )}
            </div>
            <div className="RDadviser">
              <p className="RD-team">
                <strong>Asesor:</strong>
              </p>
              <div className="RDcardAdviser">
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
                    className="RDcardpfp"
                    //src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    src="https://wallpapercave.com/uwp/uwp2417748.png"
                    alt="foto asesor"
                  />
                )}
                <p className="RDcardName">
                  {console.log("Hola")}
                  <strong>
                    {asesor
                      ? asesor.name +
                        " " +
                        asesor.fLastName +
                        " " +
                        asesor.mLastName
                      : "No hay un asesor asignado"}
                  </strong>
                </p>
                <p className="RDcardSpecialty">Ingeniería Informática</p>
              </div>
            </div>
          </div>
          <div className="RDright">
            <div className="RDdTitle">
              <p className="RD-title">
                <strong>Título:</strong>
              </p>
              <div className="RDDtitleDiv">
                <p className="RDDtitle">
                  {requestDetail.title
                    ? requestDetail.title.toUpperCase()
                    : "No hay título"}
                </p>
              </div>
            </div>
            <div className="RDdArea">
              <p className="RDarea">
                <strong>Área:</strong>
              </p>
              <div className="RDDareaDiv">
                <p className="RDDarea">
                  {requestDetail.areaName
                    ? requestDetail.areaName.toUpperCase()
                    : "No hay área"}
                </p>
              </div>
            </div>
            <div className="RDdProposedTheme">
              <p className="RDproposedTheme">
                <strong>Objetivo:</strong>
              </p>
              <div className="RDDproposedThemeDiv">
              <p className="RDDproposedTheme">
                {requestDetail.objective
                  ? requestDetail.objective.toUpperCase()
                  : "No hay un objetivo"}
              </p>
              </div>
            </div>
            <div className="RDdObservations">
              <p className="RDobservations">
                <strong>Descripción:</strong>
              </p>
              <div className="RDDobservationsDiv">
              <p className="RDDobservations">
                {requestDetail.description
                  ? requestDetail.description.toUpperCase()
                  : "No hay una descripción"}
              </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className="RDfooter"></div>
    </div>
  ) : null;
}

export default RequestDetail;
