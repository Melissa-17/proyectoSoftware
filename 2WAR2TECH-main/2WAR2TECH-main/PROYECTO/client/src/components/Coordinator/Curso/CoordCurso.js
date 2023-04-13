import React, { useState, useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "../../../assets/styles/Coordinador/Mantenimiento/Container.css";
import CursoRow from "./CursoRow";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { axiosGetCoursesBySpecialty } from "#API/Cursos";
import { useNavigate } from "react-router";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalConfirmated from "./ModalConfirmated";
import ModalsError from "../../Modals/ModalsError";

function CoordCurso() {
  const [cursoList, setCursoList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [deleteList, setDeleteList] = useState([]);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalConfirmacionSeleccionado, setModalConfirmacionSeleccionado] =
    useState(false);
    const [modalAlertaVacio, setModalAlertaVacio] = useState(false);

  const getCursoList = () => {
    axiosGetCoursesBySpecialty(JWTtoken)
      .then((response) => {
        const list = response.data || [];
        console.log(response.data)
        setCursoList(list);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCursoList();
  }, [modalMensaje]);

  const addNewCurso = () => {
    navigate("/Coordinador/curso/registro");
  };

  const confirmacionModalSeleccionado = () => {
    setModalConfirmacionSeleccionado(true);
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(cursoList.length / porPagina);

  return (
    <div className="CoordContainerAll">
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>CURSOS</h1>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>
        <div className="CoordBody">
          <div className="CoordButtons">
            <button
              className="BotonBorrar"
              onClick={() => {if(deleteList.length > 0) setModalConfirmacionSeleccionado(true); else setModalAlertaVacio(true)}}
              type="button"
            >
              Desactivar
            </button>
            <button className="BotonIngresar" onClick={addNewCurso}>
              Agregar curso
            </button>
          </div>
          <div className="CoordMain">
            {
            cursoList.length ?
            cursoList
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((curso, index) => (
                <CursoRow
                  curso={curso}
                  deleteList={deleteList}
                  setDeleteList={setDeleteList}
                />
              ))
              :
              <div className="fs-5 my-2 mx-auto">No hay cursos para mostrar</div>
            }
          </div>
        </div>
        <div
          className="contenedorBotoneriaEntregable"
          style={{ marginTop:"10px", width:"1000px" }}
        >
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </div>
      <div className="">
        {modalConfirmacionSeleccionado && (
          <ModalsAlert
            alertText="¿Seguro que desea borrar el (los) cursos (s)?"
            closeAlert={setModalConfirmacionSeleccionado}
            closeMensaje={setModalMensaje}
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            source="CURSO"
          />
        )}
        {modalMensaje && (
          <ModalConfirmated
            closeMessage={setModalMensaje}
            message="Se ha eliminado correctamente"
          />
        )}
      </div>
      {modalAlertaVacio && <ModalsError closeError={setModalAlertaVacio} message="Debe seleccionar elementos de la lista" />}
    </div>
  );
}

export default CoordCurso;
