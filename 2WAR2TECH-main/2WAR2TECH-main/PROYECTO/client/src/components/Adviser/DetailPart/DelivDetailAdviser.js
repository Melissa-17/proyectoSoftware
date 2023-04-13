import React, { useState, createContext, useContext, useEffect } from "react";
import "#Styles/Student/DetailPart/DelivDetail.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InitialPart from "./InitialPart";
import FinalPart from "./FinalPart";
import MiddlePart from "./MiddlePart";
import { axiosGetFinalAssignmentDetail } from "#API/FinalAssignment.js";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import Loading from "../../Loading/Loading";
import { UserContext } from "#Context/userContext";

export default function DelivDetailAdviser() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { index, student, course} = useLocation().state;
  let revisaUsuario = false;

  const [finalAssign, setFinalAssign] = useState(null);
  const [evaluadores, setEvaluadores] = useState(null);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [isLoadingDocsRetro, setIsLoadingDocsRetro] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  //   const [isLoading, setIsLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem('user'));
  

  const getAllFinalAssign = () => {
    axiosGetFinalAssignmentDetail(JWTtoken, params.id)
      .then((response) => {
        const data = response.data || "";
        setFinalAssign(data);
        setEvaluadores(data.studentAssignment.ASSIGNMENT.ASSIGNMENT_X_ROLEs.filter((e) => {
          // console.log(e.name == 'Evaluador');
          return e.name =='Evaluador';
        }).map((e) => {return e.ROLE;}));
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error Final Assign Detail: ${error}`);
      });
  };
  const showVistoBueno = () => {
    evaluadores.map(e => {
      revisaUsuario = revisaUsuario || e.id == user.ROLEs[0].id;
    })
    // Rol es asesor y no lo revisa
    // console.log(user.ROLEs[0].description == 'Asesor' && !revisaAsesor);
    // console.log(revisaUsuario);
    return revisaUsuario;  // rol q revisa es el usuario conectado
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     getAllFinalAssign();
  //     setLoading(true);
  //     const a = await setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //   }

  //   fetchData();
  // }, [setLoading]);
  useEffect(() => {
    getAllFinalAssign();
  });
  
  // console.log("Evaluadores: " + JSON.stringify(evaluadores, null, 2));

  const retrocesoClicAdvisor = () => {
    if (params.option == 2) navigate(`/revisor/alumno/partial`,{
      state: {
        student: student,
        course: course,
      }
    });
    else if (params.option == 1) navigate("/revisor/alumno/deliverable",{
      state:{
        student: student,
        course: course,
      }
    });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="todoDeliverable">
          <CreateNewUserPageStudent />
          <div className="contenedorDetalle">
            <div className="contenedorEncabezadoDetalle">
              <div className="contenedorTitutoDetalleAdviser">
                <h1 className="titulo">ENTREGABLES </h1>
              </div>
              <button onClick={retrocesoClicAdvisor} className="botonRetrocesoDetalle">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>

            <div className="contenedorLineaDetalle">
              <hr color="#CED4DA" className="linea" />
            </div>
            {/* {console.log(finalAssign)} */}
            <InitialPart assign={finalAssign}  />
            <MiddlePart
              valor={params.id}
              opcion={params.option}
              assign={finalAssign}
              index={index}
              student={student}
              course={course}
              evaluadores={evaluadores}
              revisaUsuario={showVistoBueno}
              isLoadingDocs={isLoadingDocs}
              setIsLoadingDocs={setIsLoadingDocs}
              isLoadingDocsRetro={isLoadingDocsRetro}
              setIsLoadingDocsRetro={setIsLoadingDocsRetro}
              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}
              
            />

            <FinalPart assign={finalAssign} />
          </div>
        </div>
      )}
    </div>
  );
}
