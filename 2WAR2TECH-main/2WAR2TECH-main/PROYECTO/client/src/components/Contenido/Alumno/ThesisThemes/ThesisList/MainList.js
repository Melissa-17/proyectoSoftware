import React, { useEffect, useState } from "react";
import Navbar from "../../../../SidebarMenu/Navbar";
import "#Styles/Alumno/ThesisThemes/ThesisList/MainList.css";
import MainListRow from "./MainListRow";
import MainListAddTeammate from "./MainListAddTeammate";
import moment from "moment";
import { axiosGetAsesorsThesisList } from "#API/Thesis";
import { axiosGetPostulationPeriodByName } from "#API/PostulationPeriod";
import { formatDate } from "#Helpers/assignmentHelpers";
import ModalsMessage from "../../../Profesor/ModalsMessage";
import { GridLoader } from "react-spinners";
import { Paginacion } from "#Components/Pagination/Pagination.js";

import { capitalizeTitle } from "#Helpers/stringHelpers.js";
import { axiosNewGetAsesorsThesisList } from "../../../../../api/Thesis";

function MainList() {
  const [thesisList, setThesisList] = useState([]);
  const [searchThesisInput, setSearchThesisInput] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfDaysLesft, setNumberOfDaysLesft] = useState(0);
  const [asesores, setAsesor] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const JWTtoken = sessionStorage.getItem("token");
  const [count, setCount] = useState(1);

  const getAllThesisList = (page) => {
    // console.log(thesisList[0]);
    // console.log({page, porPagina});
    axiosNewGetAsesorsThesisList(JWTtoken, searchThesisInput, page, porPagina)
      .then((response) => {
        // console.log("A");
        
        const list = response.data || [];
        console.log(response.data);
        setCount(list.count);
        setThesisList(list.rows);
        // setAsesor(list.thesis.USERs ? list.thesis.USERs[0] : null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // const getPeriodHab = () => {
  //   axiosGetPostulationPeriodByName(JWTtoken, "solicitud")
  //     .then((response) => {
  //       // Formato para quitar el Timezone (causa un error que muestre la fecha anterior)
  //       setStartDate(new Date(response.data.startDate.split("Z")[0]));
  //       setEndDate(new Date(response.data.endDate.split("Z")[0]));
  //       const today = new Date();
  //       // setNumberOfDaysLesft((new Date(response.data.endDate.split('Z')[0]) - new Date().getDate()));
  //       setNumberOfDaysLesft(
  //         Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
  //       );
  //       // console.log((endDate - today));
  //       setHabilitado(endDate - today >= 0);
  //     })
  //     .catch((err) => {
  //       setHabilitado(false);
  //       console.error(`Get Period: ${err}`);
  //     });
  // };

  const actualizarLista = () => {
    getAllThesisList();
  };

  // useEffect(() => {
  //   getPeriodHab();
  // }, [isLoading]);

  useEffect(() => {
    getAllThesisList(pagina);
  }, [searchThesisInput]);

  useEffect(() => {
    getAllThesisList();
  }, [openConfirmation]);

  useEffect(() => {}, [isLoading, setIsLoading]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const porPagina = 4;

  const maximo = count ? Math.ceil(count / porPagina) : 0;

  const handleSearch = (e) => {
    setSearchThesisInput(e.target.value);
  };

  return (
    <div>
      <Navbar />
      {/* {console.log(count)} */}
      <div className="mainListContainer">
        <div className="MLheader">
          <h1 className="MLtitle">TEMAS DE TESIS</h1>
          <div className="contenedorLineaDetalle">
            <hr color="#CED4DA" className="linea" />
          </div>
        </div>
        <div className="MLThemeList">
          <h2 className="MLTLtitle">Lista de temas</h2>
          {/* <div className="MPPcomponenteAviso">
            <div className="MPPcardAviso">
              <i class="bi bi-clock"></i>
              <p>
                {habilitado
                  ? `Se puede solicitar tesis hasta el día ${formatDate(
                      endDate,
                      "DD/MM"
                    )}.
                    Le quedan ${numberOfDaysLesft} días restantes...`
                  : "No se pueden solicitar temas en este momento."}
              </p>
            </div>
          </div> */}
          <div className="MLsearch">
            <p>Ingrese una palabra asociada:</p>
            <input
              className="searchWord"
              type="text"
              placeholder="Search"
              onChange={handleSearch}
            />
            <button className="busquedaNombre">
              <i class="bi bi-search" />
            </button>
            <hr color="#000" className="linea2" />
          </div>
          <div className="contenedorLineaDetalle">
            <hr color="#CED4DA" className="linea" />
          </div>
          {
            isLoading ?
            <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
            :
          thesisList && thesisList.length ? (
            thesisList
              // .slice(
              //   (pagina - 1) * porPagina,
              //   (pagina - 1) * porPagina + porPagina
              // )
              .map((thesis, index) => {
                // let publicDate = new Date(thesis.Date);
                // publicDate = moment(publicDate).format("DD/MM/YYYY");
                const asesor =
                  thesis && thesis.USERs && thesis.USERs[0]
                    ? thesis.USERs[0]
                    : null;
                return thesis ? (
                  <div key={index} className="MLrows">
                    <MainListRow
                      title={
                        thesis ? capitalizeTitle(thesis.title) : "No hay título"
                      }
                      adviserName={
                        asesor && asesor.name
                          ? asesor.name
                          : "No"
                      }
                      adviserFLastame={
                        asesor && asesor.fLastName
                          ? asesor.fLastName
                          : "tiene"
                      }
                      adviserMLastame={
                        asesor && asesor.mLastName
                          ? asesor.mLastName
                          : "asesor"
                      }
                      adviserPfp={
                        asesor && asesor.photo
                          ? asesor.photo
                          : null
                      }
                      index={thesis.id}
                      habilitado={habilitado}
                      confirmation={setOpenConfirmation}
                    />
                  </div>
                ) : null;
              })
          ) : (
            <p>Aún no hay temas publicados</p>
          )}
        </div>
        <div className="MLfooter">{/* paginación */}</div>
        <div className="contenedorBotoneriaEntregable">
          {count>0?
          <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getAllThesisList}
          setIsLoading={setIsLoading}
        />:""}
        </div>
      </div>
      {openConfirmation && (
        <ModalsMessage
          closeMessage={setOpenConfirmation}
          closeOtroModal={setOpenConfirmation}
          closeunmodalmas={setOpenConfirmation}
          message="Se ha solicitado con éxito"
        />
      )}
    </div>
  );
}

export default MainList;
