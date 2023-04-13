import React, { useState, useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { useNavigate } from "react-router";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalConfirmated from "../../Coordinator/Curso/ModalConfirmated";
import {axiosGetJurys} from "#API/User";
import JuradoRow from "./JuradoRow";


function CoordJurados() {
  const JWTtoken = sessionStorage.getItem("token");

  const [deleteList, setDeleteList] = useState([]);
  const [juradoList, setJuradoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [count, setcount] = useState(0);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalConfirmacionSeleccionado, setModalConfirmacionSeleccionado] =
    useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  const navigate = useNavigate();

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);
  const maximo = count ? Math.ceil(count / porPagina) : 1;

  const getJuradoList = (pagina) => {
    axiosGetJurys(JWTtoken, pagina, porPagina)
      .then((response) => {
        const list = response.data.rows || [];
        console.log(response.data);
        setJuradoList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getJuradoList();
  }, [modalMensaje,modalConfirmacion]);
  
  const addNewJurado = () => {
    navigate("/teacher/Jurados/registro");
  };
  const confirmacionModalSeleccionado = () => {
    setModalConfirmacionSeleccionado(true);
  };

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>JURADOS</h1>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>

        <div className="CoordBody">
          <div className="CoordButtons" style={{marginBottom:"10px"}}>
            <button
              className="BotonBorrar"
              onClick={confirmacionModalSeleccionado}
              type="button"
            >
              Desactivar
            </button>
            <button className="BotonIngresar" onClick={addNewJurado}>
              Registrar Usuario
            </button>
          </div>
          <div className="CoordMain">
            {isLoading ? (
              <GridLoader
                className="mx-auto"
                color="#042354"
                loading={isLoading}
                size={24}
              />
            ) : juradoList && juradoList.length > 0 ? (
              juradoList
                .map((jurado, index) => (
                  <JuradoRow
                    jurado={jurado}
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                    modalConfirmacion={modalConfirmacion}
                    setModalConfirmacion={setModalConfirmacion}
                  />
                ))
            ) : (
              "No hay jurados"
            )}
          </div>
        </div>
        <div
          className="contenedorBotoneriaEntregable"
          style={{
            width: "1000px",
            marginTop: "20px",
          }}
        >
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getJuradoList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
      <div className="">
        {modalConfirmacionSeleccionado && (
          <ModalsAlert
            alertText="¿Seguro que desea borrar el (los) jurados (res)?"
            closeAlert={setModalConfirmacionSeleccionado}
            closeMensaje={setModalMensaje}
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            source="JURADO"
          />
        )}
        {modalMensaje && (
          <ModalConfirmated
            closeMessage={setModalMensaje}
            message="Se ha eliminado correctamente"
          />
        )}
      </div>
    </div>
  );
}

export default CoordJurados;
