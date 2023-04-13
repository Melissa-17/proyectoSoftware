import React, { useEffect, useState } from "react";
import Navbar from "../../../SidebarMenu/Navbar";
import RequestStudentCard from "../RequestStudentCard";
import "#Styles/Adviser/ThesisThemes/RequestFiles/RequestDetail.css";
import { axiosGetThesisDetails, axiosUnselectTeam } from "#API/Thesis";
import { axiosGetUserInfo } from "#API/User";
import { useLocation, useNavigate } from "react-router";
import ModalStudentList from "./ModalStudentList";
import { axiosLinkThesisTeam } from "../../../../api/Thesis";
import { groupBy } from '#Helpers/assignmentHelpers.js';
import ModalsMessage from "../../../Modals/ModalsMessage";
import ModalCargando from "../../../Contenido/Profesor/ModalCargando";
import ModalsAlert from "../../../Modals/ModalsAlert";
import ModalsError from "../../../Modals/ModalsError";
import ModalValidacion from "../../../Admin/Semester/ModalValidacion";
import { GridLoader } from "react-spinners";

function  RequestDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  // const thesisId = location.state;
  // const studentList = location.studentList;
  const { thesisId, studentList } = useLocation().state;
  const [requestDetail, setRequestDetail] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(false);

  const asesor =
    requestDetail && requestDetail.USERs ? requestDetail.USERs[1] : null;
    // console.log(asesor);
  const [stList, setStList] = useState([]);
  const [owner, setOwner] = useState(null);
  const JWTtoken = sessionStorage.getItem("token");
  const [selected, setSelected] = useState(false);

  const [cambio, setCambio] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loadConfirm, setLoadConfirm] = useState(false);
  const [quit, setQuit] = useState(false);
  const [loadQuit, setLoadQuit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cambioEstado = () => {
    if(cambio==true) setCambio(false);
    else setCambio(true);
  }

  // console.log(thesisId);
  // console.log(studentList);

  //  setStudents(location.students);

  // const getUserInfo = () => {
  //   axiosGetUserInfo(JWTtoken)
  //     .then((response) => {
  //       // console.log(response.data);
  //       const data = response.data || null;
  //       setUserInfo(data);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  //console.log(student);
  
  const getRequestDetail = () => {
    setIsLoading(true);
    axiosGetThesisDetails(JWTtoken, thesisId)
      .then((response) => {
        const data = response.data || [];
        // console.log(data);
        
        // console.log(data.USERs.filter((e) => e.USER_X_THESIS.type == "STUDENT_APPLICANT"));
        const teamIdList = response.data.USERs.map((e, index) => {
          // console.log("A: " + JSON.stringify(e, null, 2));
          return e && e.USER_X_THEses && e.USER_X_THEses[0] 
          && e.USER_X_THEses[0].USER_X_TEAM_X_THEses && e.USER_X_THEses[0].USER_X_TEAM_X_THEses[0] &&
          e.USER_X_THEses[0].USER_X_TEAM_X_THEses[0].TEAMId ?
          e.USER_X_THEses[0].USER_X_TEAM_X_THEses[0].TEAMId 
          :
          0
        });
        data.USERs.map((e, index) => {
          e.TEAMId = teamIdList[index];
        });
        // console.log(data);
        

        setStList(
          Object.values(groupBy(data.USERs, "TEAMId"))
          .filter(team => {
            // console.log(e);
            if (team && team[0] && team[0].USER_X_THESIS && team[0].USER_X_THESIS.type == "OWNER") {
              setOwner(team);
            }
            return team && team[0].TEAMId != 0;
          })
          // TODO: convertir objetos a arreglo y luego filtrar
          );

          setRequestDetail(data);
          setIsLoading(false);
        })

        
      
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // console.log("Antes");
  // console.log(studentList);
  // console.log("Ahora");
  // console.log(stList);


  const handleConfirmStudent = () => {
    // console.log(team[0].TEAMId);
    if (team && team.length > 0)  {
      setLoadConfirm(true)
      axiosLinkThesisTeam(JWTtoken, {
        idThesis: thesisId,
        idTeam: team[0].TEAMId
      })
      .then((res) => {
        console.log(res);
        setLoadConfirm(false);
        setConfirm(true);
      })
      .catch((err) => {
        console.error(`ERROR axiosLinkThesis ${err}`);
      })
    } else {
      setError(true);
    }
    
  }

  const handleUnlinkStudent = (teamId) => {
    // console.log(teamId);
    setLoadQuit(true);
    axiosUnselectTeam(JWTtoken, {
      "idThesis": thesisId,
      "idTeam": teamId
    })
    .then((res) => {
      console.log(res);
      setOwner(null);
      setLoadQuit(false);
      setQuit(true);
      // getRequestDetail();
    })
    .catch((err) => {
      console.error(`ERROR handleUnlinkStudent ${err}`);
    })
  }

  

  useEffect(() => {
    getRequestDetail();
    // getUserInfo();
  }, [quit, confirm]);

  // console.log(studentList)
  

  

  const retrocesoClic = () => {
    navigate("/asesor/contentRequest");
  };
  return (
    stList ?
    <div>
      <Navbar />
      <div className="adviserRequestDetailContainer">
        <div className="ARDheader">
          <h1 className="PDtitle">DETALLE PROPUESTA TESIS</h1>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
        <hr color="#CED4DA" className="linea" style={{width:"1120px"}}/> 
        {
          isLoading ?
          <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
          />
          :
          <div className="ARDcontent">
          <div className="ARDleft-student">
            <div className="studentCardSelect">
              <p className="SLlist">
                <strong>Grupo seleccionado</strong>
              </p>
              
              {/* {console.log(owner)} */}
              {
                owner ?
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setTeam(owner);
                  }}
                  type="button" class="btn text-decoration-none"
                >                
                <RequestStudentCard studentList={owner} user={owner[0]}/>
                </button>
                :
              selected ? (
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setTeam(team);
                  }}
                  type="button" class="btn text-decoration-none"
                >
                <RequestStudentCard studentList={team} user={team[0]}/>
                </button>
              ) : (
                <p className="SLlist">
                  <strong>Aún no ha seleccionado algún alumno o equipo</strong>
                </p>
              )}
            </div>
            {/* {console.log("OWNER: " + JSON.stringify(owner))} */}
            <div className="studentSelectionBtn">
              <button
                className="confirmStudent"
                type="button"
                onClick={handleConfirmStudent}
              >
                Confirmar selección
              </button>
              <button
                className="confirmStudent"
                onClick={() => {
                  (owner && owner[0])
                  ? 
                    handleUnlinkStudent(owner[0].TEAMId)
                    // setOwner([])
                  :
                    setSelected(false)
                    setTeam([])
                    
                }}
                type="button"
              >
                Quitar selección
              </button>
            </div>
            <div className="studentList">
              <p className="SLlist">
                <strong>Alumnos solicitando</strong>
              </p>
              <div className="studentCards">
                {stList && stList.length ? (
                  stList.map((team, index) => {
                    if (team && team[0] && team[0].USER_X_THESIS && team[0].USER_X_THESIS.type != "OWNER") {
                    return (
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setTeam(team);
                          setSelected(true);
                        }}
                      >
                        <RequestStudentCard studentList={team} user={team[0]}/>
                      </button>
                    );
                  }})
                ) : (
                  <div className="NoHayAlumnoContenedor">
                    <div className="content">
                      <i class="bi bi-dash-circle fa-2x"></i>
                      <p> Aún no hay alumnos solicitando este tema</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>



          {requestDetail ? (
            <div className="ARDright-detail">
              <p className="ARDTitle">
                {requestDetail.title
                  ? requestDetail.title.toUpperCase()
                  : "NO HAY TITULO"}
              </p>
              <div className="ARDdArea">
                <p className="ARDDarea">
                  <strong>Área:</strong>
                </p>
                <div className="ARDareaDiv">
                  <p className="ARDarea">
                    {requestDetail.areaName
                      ? requestDetail.areaName.toUpperCase()
                      : "NO HAY AREA"}
                  </p>
                </div>
              </div>
              <div className="ARDdObservations">
                <p className="TDobservations">
                  <strong>Descripción:</strong>
                </p>
                <div className="ARDobservationsDiv">
                  <p className="ARDobservations">
                    {requestDetail.description
                      ? requestDetail.description.toUpperCase()
                      : "NO HAY DESCRIPCIÓN"}
                  </p>
                </div>
              </div>
              <div className="ARDdProposedTheme">
                <p className="TDproposedTheme">
                  <strong>Objetivo:</strong>
                </p>
                <div className="ARDproposedThemeDiv">
                  <p className="ARDproposedTheme">
                    {requestDetail.objective
                      ? requestDetail.objective.toUpperCase()
                      : "NO HAY OBJETIVO"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>No hay detalle</p>
          )}
        </div>}
        <div className="ARDfooter"></div>
      </div>
      {openModal && (
        <ModalStudentList closeModal={setOpenModal} studentList={team} />
      )}
      {
        confirm && (
          <ModalsMessage 
          closeMessage={setConfirm}
          message={"Se ha seleccionado el alumno/grupo con éxito."}
          />
        )
      }
      {
        loadConfirm && (
          <ModalCargando 
          estacargando={loadConfirm}
          message={"Procesando su selección..."}
          />
        )
      }
      {
        loadQuit && (
          <ModalCargando 
          estacargando={loadQuit}
          message={"Retirando al alumno..."}
          />
        )
      }
      {
        quit && (
          <ModalsMessage 
          closeMessage={setQuit}
          message={"Se ha quitado la elección del alumno/grupo con éxito."}
          />
        )
      }
      {
        error && (
          <ModalValidacion
          closeMessage={setError}
          message={"Debe seleccionar un alumno/grupo."}
          />
        )
      }
    </div>
    : null
  );
}

export default RequestDetail;
