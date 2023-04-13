import React, { useState, useEffect } from "react";
import "#Styles/Student/InfoPresentation/index.css";
import { useNavigate, useLocation } from "react-router-dom";
import InitialPart from "../../../components/Student/InfoPresentation/InitialPart.js";
import MiddlePart from "../../../components/Student/InfoPresentation/MiddlePart";
import FinalPart from "../../../components/Student/InfoPresentation/FinalPart";
import Navbar from "../../../components/SidebarMenu/Navbar";
import { useParams } from "react-router-dom";
import { axiosGetFinalAssignmentDetail } from "#API/FinalAssignment.js";
import { axiosGetPresentationAssignmentDetail } from "#API/PresentationAssignment.js";
import { getScore, formatDate } from "#Helpers/assignmentHelpers.js";
import Jury from "./Jury.js";
import { GridLoader } from "react-spinners";

//import FinalPart from './FinalPart';
//import MiddlePart from './MiddlePart';

export default function InfoPresentation() {
  const navigate = useNavigate();
  const location = useLocation();
  const {cxsid, courseName} = location.state;

  const retrocesoClic = () => {
    navigate("/presentation",{
      state:{
        cxsid:cxsid,
        courseName:courseName
      }
    });
  };

  const params = useParams();
  var numero = parseInt(params.num);

  const [advance, setAdvance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");

  const getDetailAdvance = () => {
    axiosGetPresentationAssignmentDetail(JWTtoken, params.id)
      .then((response) => {
        console.log(response);
        const data = response.data || "";
        setAdvance(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error Advance Detail: ${error}`);
      });
  };

  useEffect(() => {
    getDetailAdvance();
  }, []);

  const revisorsArray =
    advance && advance.assignmentRevisors ? advance.assignmentRevisors : null;
  const assignment =
    advance && advance.studentAssignment && advance.studentAssignment.ASSIGNMENT
      ? advance.studentAssignment.ASSIGNMENT
      : null;

  const studentAssignment =
    advance && advance.studentAssignment ? advance.studentAssignment : null;
  
  // console.log(assignment);

  return (
    isLoading?(
      <GridLoader
        className="mx-auto"
        color="#042354"
        loading={isLoading}
        size={24}
      />
    )
    :
      <div className="contenedorInfoExposicion">
        <Navbar />
        <div className="contenedorDetalle">
          <div className="contenedorEncabezadoExposicion">
            <div className="contenedorTitutoExposicion"
            style={{marginRight:"180px"}}
            >
              <h1 className="titulo">Presentación Oral</h1>
            </div>
            <button
              onClick={retrocesoClic}
              className="botonRetrocesoExposicion"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoExposicion"
              />
            </button>
          </div>
          <div className="contenedorLineaExposicion">
          <hr color="black" className="lineaContenidoAvance" style={{width:"1240px"}}/>
          </div>
          <div className="expoContent">
            <div className="expoInfo">
              <div>
                <p className="expoItitle">{assignment.assignmentName}</p>
                {studentAssignment && studentAssignment.meetingDate ?
                <>
                  <p className="expoIstart">
                    Fecha:{" "}
                    {formatDate(studentAssignment.meetingDate, "DD/MM/YYYY", true)}
                  </p>
                </>
                :
                ''
                }
                {/* <p className="expoIstart">
                  Fecha:{" "}
                  {studentAssignment && studentAssignment.meetingDate ? formatDate(studentAssignment.meetingDate, "DD/MM/YYYY", true) : "No hay fecha"}
                </p> */}
                {
                  studentAssignment && studentAssignment.meetingDate ? 
                  <>
                    <p className="expoIend">
                      Hora:{"  "}
                      {formatDate(studentAssignment.meetingDate, "hh:mm", true)}
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
            <div className="expoLocation">
              {studentAssignment.linkVirtualSession ? (
                <p>
                  Enlace a la{" "}
                  <a
                    href={studentAssignment.linkVirtualSession}
                    target="_blank"
                  >
                    sesión virtual
                  </a>
                </p>
              ) : studentAssignment.location ? (
                <p>Ubicación: {studentAssignment.location} </p>
              ) : (
                <i class="bi bi-info-circle">
                  {"  "}Aún no se ha definido la forma en la que se realizará la
                  presentación oral.
                </i>
              )}
            </div>
            <div className="expoFeedback">
              <div className="EFBtitle">
                <i class="bi bi-person-workspace fa-2x"></i>
                <p>Retroalimentación de jurados:</p>
              </div>
              <div className="EFBjurys">
              
                {revisorsArray && revisorsArray.length > 0 ? (
                  revisorsArray.map((jury, index) => {
                    console.log(jury)
                    return (
                      
                      <div key={index} className="jurySpace">
                        <Jury
                          jury={jury}
                          maxScore={assignment.maxScore}
                          studentAssignment={studentAssignment}
                          option={numero}
                          id={params.id}
                          cxsid={cxsid}
                          courseName={courseName}
                        />
                      </div>
                    );
                  })
                ) : (
                  <i class="bi bi-info-circle">
                    {"  "}Aún no hay jurados asignados a la presentación oral.
                  </i>
                )}
              </div>
            </div>
          </div>
          <div className="expoFooter"></div>
          {/* <InitialPart id={params.id} assign={advance} /> */}
          {/* <MiddlePart id={params.id} num={params.num} assign={advance} /> */}
          {/*<FinalPart assign={advance} /> */}
        </div>
      </div>
  );
}
