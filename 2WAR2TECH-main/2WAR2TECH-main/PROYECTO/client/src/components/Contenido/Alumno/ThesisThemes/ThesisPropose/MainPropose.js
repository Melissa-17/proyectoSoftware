import React, { useEffect, useState } from "react";
import Navbar from "../../../../SidebarMenu/Navbar";
import ProposeRow from "./ProposeRow";
import "#Styles/Alumno/ThesisThemes/ThesisPropose/MainPropose.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { axiosGetListProposals } from "#API/Thesis";
import { axiosGetPostulationPeriodByName } from "#API/PostulationPeriod";
import { formatDate } from "#Helpers/assignmentHelpers";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import ModalsMessage from "../../../Profesor/ModalsMessage";
import ModalCargando from "../../../Profesor/ModalCargando";

function MainPropose() {
  const navigate = useNavigate();
  const nuevoClic = () => {
    navigate("/Thesis/newPropose");
  };

  const [proposeList, setProposeList] = useState(null);
  const [habilitado, setHabilitado] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [endDate, setEndDate] = useState(null);
  // const [page, setPage] = useState(1);
  const [numberOfDaysLesft, setNumberOfDaysLesft] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [count, setCount] = useState(0);
  const [loadDelete, setLoadDelete] = useState(false);

  const JWTtoken = sessionStorage.getItem("token");

  const getProposeList = (page) => {
    // console.log(proposeList[0]);
    axiosGetListProposals(JWTtoken, "", page, porPagina)
      .then((response) => {
        // console.log(response.data);
        const list = response.data || [];
        setProposeList(list);
        setIsLoading(false);
        setCount(list.length);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const getPeriodHab = () => {
    axiosGetPostulationPeriodByName(JWTtoken, "propuesta")
      .then((response) => {
        // Formato para quitar el Timezone (causa un error que muestre la fecha anterior)
        setStartDate(new Date(response.data.startDate.split("Z")[0]));
        setEndDate(new Date(response.data.endDate.split("Z")[0]));
        const today = new Date();
        // setNumberOfDaysLesft((new Date(response.data.endDate.split('Z')[0]) - new Date().getDate()));
        setNumberOfDaysLesft(
          Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        );

        // console.log(today - startDate);
        setHabilitado(endDate - today >= 0 && today - startDate >= 0);
      })
      .catch((err) => {
        setHabilitado(false);
        console.error(`Get Period: ${err}`);
      });
  };
  useEffect(() => {
    getPeriodHab();
  }, [isLoading]);

  useEffect(() => {
    getProposeList();
  }, [openConfirmation]);

  useEffect(() => {
    getProposeList();
  }, []);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const porPagina = 8;

  const maximo =
    proposeList && proposeList[0] && proposeList[0].rows
      ? Math.ceil(count / porPagina)
      : 0;

  useEffect(() => {}, [isLoading, setIsLoading]);

  return (
    <div>
      <Navbar />
      <div className="mainProposeContainer">
        <div className="MPheader">
          <h1 className="MPtitle">TEMAS DE TESIS</h1>
          <div className="contenedorLineaDetalle">
            <hr color="#CED4DA" className="linea" /> 
          </div>
        </div>
        <div className="MPProposeList">
          <div className="contenedorMPPLtittle">
            <h2 className="MPPLtitle">Mis propuestas</h2>
            <div className="MPPcomponenteAviso">
              <div className="MPPcardAviso">
                <i class="bi bi-clock"></i>
                <p>
                  {habilitado
                    ? `Se puede subir propuestas de tesis hasta el día ${formatDate(
                        endDate,
                        "DD/MM"
                      )}.
                    Le quedan ${numberOfDaysLesft} días restantes...`
                    : "No se pueden subir propuestas en este momento."}
                </p>
              </div>
              <div className="MPPbut">
                <button
                  className="MPPbutton"
                  type="button"
                  onClick={nuevoClic}
                  hidden={!habilitado}
                >
                  Nueva propuesta
                </button>
              </div>
            </div>
            <p className="MPPinfo">Estado</p>
            <hr color="black" className="lineaMPmiddle" />
          </div>
          <div className="MPcomponentList">
            {!isLoading &&
            proposeList &&
            proposeList[0] &&
            proposeList[0].rows &&
            proposeList[0].rows.length > 0 ? (
              proposeList[0].rows
                // .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
                .map((propose, index) => {
                  // console.log(propose);
                  return proposeList[1][index] ? (
                    <ProposeRow
                      propose={propose}
                      asesor={proposeList[1][index].USER}
                      key={index}
                      confirmation={setOpenConfirmation}
                      setLoadDelete={setLoadDelete}
                    />
                  ) : null;
                })
            ) : proposeList &&
              proposeList[0] &&
              proposeList[0].rows.length == 0 ? (
              <div className="fs-3">Aún no ha creado ninguna propuesta.</div>
            ) : (
              <GridLoader
                className="mx-auto"
                color="#042354"
                loading={isLoading}
                size={24}
              />
            )}
          </div>
          <hr color="black" className="lineaMPfotter" />
        </div>
        <div className="MPfooter"></div>
        <div className="contenedorBotoneriaEntregable">
          {count>0?
          <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getProposeList}
          setIsLoading={setIsLoading}
        />:""}
        </div>
      </div>
      {openConfirmation && (
        <ModalsMessage
          closeMessage={setOpenConfirmation}
          closeOtroModal={setOpenConfirmation}
          closeunmodalmas={setOpenConfirmation}
          message="Se ha borrado con éxito"
        />
      )}
      {loadDelete && <ModalCargando estacargando={loadDelete} 
          message={"Se está borrando su propuesta"}
          />}
    </div>
  );
}

export default MainPropose;
