import React, { useEffect, useState } from "react";
import { axiosGetPostulationPeriodByName } from "#API/PostulationPeriod";
import { axiosGetListProposals } from "#API/Thesis";
import { formatDate } from "#Helpers/assignmentHelpers";
import ProposalCard from "./ProposalCard";
import { useNavigate } from "react-router-dom";
import "#Styles/Adviser/ThesisThemes/Propose.css";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import ModalsMessage from "../../Contenido/Profesor/ModalsMessage";
import ModalCargando from "../../Contenido/Profesor/ModalCargando.js";

function Propose() {
  const [proposeList, setProposeList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [habilitado, setHabilitado] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfDaysLesft, setNumberOfDaysLesft] = useState(0);
  const [inputText, setInputText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);

  
  const JWTtoken = sessionStorage.getItem("token");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);

  const navigate = useNavigate();
  const nuevoClic = () => {
    navigate("/asesor/NewPropose");
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

        setHabilitado((endDate - today) >= 0 && (today - startDate) >= 0);
      })
      .catch((err) => {
        setHabilitado(false);
        console.error(`Get Period: ${err}`);
      });
  };

  const getProposeList = (page) => {
    axiosGetListProposals(JWTtoken, inputText, page, porPagina)
      .then((response) => {
        // console.log({ text: inputText, page: page, porPagina: porPagina });
        const data = response.data || [];
        setProposeList(data[0].rows);
        setStudentList(data[1]);
        setcount(data[0].count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getPeriodHab();
  }, [isLoading]);

  useEffect(() => {
    getProposeList();
  }, [inputText, confirmDelete]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  return (
    <div className="AdviserProposeMainContainer">
      <div className="APcomponenteAviso">
        <div className="APcardAviso">
          <i class="bi bi-clock fa-2x"></i>
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
      <div className="RsearchPropose">
        <p className="RsearchTitlepp">
          Ingrese una palabra asociada al título: 
        </p>
        <div className="searching">
          <input
            className="searchWord"
            type="text"
            placeholder="Search"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="busquedaNombre">
            <i class="bi bi-search" />
          </button>
        </div>
      </div>

      <div className="AdviserRequestTitles">
        <p className="alumno">
          <strong>Alumno asociado</strong>
        </p>
        <p className="MpEstado">
          <strong>Estado</strong>
        </p>
      </div>
      <div className="AdviserProposalsContainerAA">
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : (
          proposeList
            // .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
            .map((adviserPropose, index) => {
              return (
                <div key={index} className="espaciadoPropose">
                  <ProposalCard
                    propuesta={adviserPropose}
                    student={studentList[index]}
                    setLoadDelete={setLoadDelete}
                    setConfirmDelete={setConfirmDelete}
                  />
                </div>
              );
            })
        )}
      </div>
      {loadDelete && <ModalCargando estacargando={loadDelete} 
          message={"Se está eliminando su propuesta..."}
          />}
      {confirmDelete && (
        <ModalsMessage
          closeMessage={setConfirmDelete}
          // action={deletePropose}
          // alertText="¿Está seguro que desea eliminar la propuesta?"
          message="Se ha eliminado su propuesta"
          //item={fileToDelete}
        />
      )}
      
      <div className="contenedorFinal">
        <div className="contenedorBotoneriaEntregable">
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getProposeList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Propose;
