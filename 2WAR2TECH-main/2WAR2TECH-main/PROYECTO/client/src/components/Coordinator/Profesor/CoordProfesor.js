import React, { useState, useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import { axiosGetProfessors } from "../../../api/horario";
import ProfesorRow from "./ProfesorRow";
import "../../../assets/styles/Coordinador/Mantenimiento/Profesor.css";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { useNavigate } from "react-router";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalConfirmated from "../Curso/ModalConfirmated";
import { Buffer } from "buffer";

function CoordProfesor() {
  const JWTtoken = sessionStorage.getItem("token");

  const [deleteList, setDeleteList] = useState([]);
  const [profesorList, setProfesorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputName, setInputName] = useState("");

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

  const getProfesorList = (pagina) => {
    axiosGetProfessors(JWTtoken, pagina, porPagina, inputName)
      .then((response) => {
        const list = response.data.rows || [];
        console.log(response.data);
        setProfesorList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getProfesorList();
  }, [modalMensaje, modalConfirmacion, inputName]);

  const addNewProfesor = () => {
    navigate("/Coordinador/profesores/registro");
  };
  const confirmacionModalSeleccionado = () => {
    setModalConfirmacionSeleccionado(true);
  };

  const handleNameChange = (e) => {
    var x = document.getElementById("busqueda").value;
    setInputName(x);
    setIsLoading(true);
    if (!x) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>PROFESOR</h1>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>

        <div className="CoordBody">
          <div className="CoordButtons" style={{ marginBottom: "18px" }}>
            <div className="searchAsesor">
              <label>Búsqueda por nombre: </label>
              <div className="search">
                <input
                  type="text"
                  id="busqueda"
                  className="Busqueda"
                  onChange={handleNameChange}
                  placeholder="Ingrese un nombre..."
                ></input>
                <button className="boton">
                  <i class="bi bi-search" />
                </button>
              </div>
            </div>
            <button
              className="BotonBorrar"
              onClick={confirmacionModalSeleccionado}
              type="button"
            >
              Desactivar
            </button>
            <button className="BotonIngresar" onClick={addNewProfesor}>
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
            ) : profesorList && profesorList.length > 0 ? (
              profesorList.map((profesor, index) => (
                <ProfesorRow
                  profesor={profesor}
                  deleteList={deleteList}
                  setDeleteList={setDeleteList}
                  modalConfirmacion={modalConfirmacion}
                  setModalConfirmacion={setModalConfirmacion}
                />
              ))
            ) : (
              "No hay profesores"
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
            onClickHandler={getProfesorList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
      <div className="">
        {modalConfirmacionSeleccionado && (
          <ModalsAlert
            alertText="¿Seguro que desea borrar el (los) profesor (res)?"
            closeAlert={setModalConfirmacionSeleccionado}
            closeMensaje={setModalMensaje}
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            source="PROFESOR"
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

export default CoordProfesor;
