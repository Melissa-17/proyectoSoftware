import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../SidebarMenu/Navbar";
import { axiosGetPostulationPeriod } from "#API/PostulationPeriod";
import { axiosGetListProposals } from "#API/Thesis";
import Propose from "./Propose";
import "#Styles/Adviser/ThesisThemes/ContentPropose.css";

function ContentPropose() {
  const [isActive, setIsActive] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const navigate = useNavigate();


  
  // const [proposeList, setProposeList] = useState(null);
  // const [revisors, setRevisorList] = useState(null);
  // const [habilitado, setHabilitado] = useState(false);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [numberOfDaysLesft, setNumberOfDaysLesft] = useState(0);

  // const JWTtoken = sessionStorage.getItem("token");

  // const getProposeList = () => {
  //   // console.log(proposeList);
  //   axiosGetListProposals(JWTtoken)
  //     .then((response) => {
  //       const list = response.data || [];
  //       setProposeList(list[0]);
  //       setRevisorList(list[1]);
  //       // console.log(proposeList);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  // const getPeriodHab = () => {
  //   axiosGetPostulationPeriod(JWTtoken)
  //   .then((response) => {
  //     // Formato para quitar el Timezone (causa un error que muestre la fecha anterior)
  //     setStartDate(new Date(response.data.startDate.split('Z')[0]));
  //     setEndDate(new Date(response.data.endDate.split('Z')[0]));
  //     const today = new Date();
  //     // setNumberOfDaysLesft((new Date(response.data.endDate.split('Z')[0]) - new Date().getDate()));
  //     setNumberOfDaysLesft(Math.ceil(Math.abs(endDate-today)/(1000 * 60 * 60 * 24)));
      
  //     setHabilitado(true);
  //   })
  //   .catch((err) => {
  //     setHabilitado(false);
  //     console.error(`Get Period: ${err}`);
  //   });
  // }

  // useEffect(() => {
  //   getProposeList();
  //   getPeriodHab();
  // });

  const hizoClic1 = () => {
    navigate("/asesor/contentPropose");
    setIsActive(true);
    setIsActive2(false);
    setIsActive3(false);
  };
  const hizoClic2 = () => {
    navigate("/asesor/contentRequest");
    setIsActive(false);
    setIsActive2(true);
    setIsActive3(false);
  };
  const hizoClic3 = () => {
    navigate("/asesor/contentStudentPropose");
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(true);
  };

  return (
    <div className="PRtodoContent">
      <Navbar />
      <div className="contenedorContenidoPropose">
        <div className="contenedorTituloPropose">
          <h1 className="tituloGestionContentPropose">GESTIÓN DEL CURSO</h1>
        </div>
        <hr color="black" className="lineaContenidoDeliverable" />

        <div className="contenedorOpcionesEntregable">
          <ul>
            <button className="botonesOpcionSeleccionado" onClick={hizoClic1}>
              Mis propuestas
            </button>
          </ul>
          <ul>
            <button className="botonesOpcion" onClick={hizoClic2}>
              Solicitudes
            </button>
          </ul>
          <ul>
            {/* <button className="botonesOpcion" onClick={hizoClic3}>
              Propuestas alumnos
            </button> */}
          </ul>
        </div>

        <div className="contenedorCambiosPropose">
          <Propose />
        </div>
      </div>
    </div>
  );
}

export default ContentPropose;
