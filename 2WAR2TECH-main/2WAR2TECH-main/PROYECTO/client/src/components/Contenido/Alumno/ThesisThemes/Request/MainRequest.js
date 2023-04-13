import React, { useEffect, useState } from "react";
import Navbar from "../../../../SidebarMenu/Navbar";
import "#Styles/Alumno/ThesisThemes/Request/MainRequest.css";
import RequestRow from "./RequestRow";
import { axiosGetRequestsByUser } from "#API/Thesis";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import ModalsMessage from "../../../../Modals/ModalsMessage";

function MainRequest() {
  const [requestList, setRequestList] = useState([]);
  const [asesor, setAsesor] = useState([]);
  const [asesorList, setAsesorList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getRequestList = (page) => {
    axiosGetRequestsByUser(JWTtoken, page, porPagina)
      .then((response) => {
        console.log(response.data);
        const list = response.data || [];
        setRequestList(list.thesis);
        setAsesorList(list.asesors);
        setStatusList(list.status);
        // setAsesor(list.asesors[0]);
        setIsLoading(false);
        setCount(list.thesis.count);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const porPagina = 3;
  let maximo = requestList ? Math.ceil(requestList.count / porPagina) : 1;
  maximo = maximo ? maximo : 1;

  useEffect(() => {
    getRequestList();
  }, [confirmDelete]);

  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading, setIsLoading]);

  return requestList ? (
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
            <h2 className="MPPLtitle">Mis solicitudes</h2>

            <p className="MPPinfo">Estado</p>
            <hr color="black" className="lineaMPmiddle" />
          </div>
          <div className="MPcomponentList">
            {requestList && !isLoading ? (
              requestList.rows.length ? (
                requestList.rows
                  // .slice(
                  //   (pagina - 1) * porPagina,
                  //   (pagina - 1) * porPagina + porPagina
                  // )
                  .map((request, index) => {
                    return (
                      <RequestRow
                        request={request}
                        asesor={asesorList[index]}
                        key={index}
                        status={statusList[index]}
                        setConfirmDelete={setConfirmDelete}
                      />
                    );
                  })
              ) : (
                <div className="fs-3">No hay solicitudes para mostrar</div>
              )
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
          onClickHandler={getRequestList}
          setIsLoading={setIsLoading}
        />:""}
        </div>
      </div>
      {confirmDelete && (
            <ModalsMessage
              closeMessage={setConfirmDelete}
              message="¡Se eliminó la tesis con éxito!"
            />
          )}
    </div>
  ) : null;
}

export default MainRequest;
