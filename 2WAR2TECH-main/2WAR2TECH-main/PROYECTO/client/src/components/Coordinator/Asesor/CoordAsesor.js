import React, { useState, useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { useNavigate } from "react-router";
import "../../../assets/styles/Coordinador/Mantenimiento/Profesor.css";
import AsesorRow from "./AsesorRow";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalConfirmated from "../Curso/ModalConfirmated";
import { axiosGetAsesorsBySpecialty } from "#API/User";

function CoordAsesor() {
  const JWTtoken = sessionStorage.getItem("token");

  const [deleteList, setDeleteList] = useState([]);
  const [asesorList, setAsesorList] = useState([]);
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

  const getAsesorList = (page) => {
    
    axiosGetAsesorsBySpecialty(JWTtoken, page, porPagina, inputName)
    
      .then((response) => {
        const list = response.data || [];
        console.log(list);
        setAsesorList(list.rows);
        setcount(list.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAsesorList();
  }, [modalMensaje, modalConfirmacion, inputName]);

  const addNewAsesor = () => {
    navigate("/Coordinador/asesores/registro");
  };

  const confirmacionModalSeleccionado = () => {
    setModalConfirmacionSeleccionado(true);
  };

  const handleNameChange = (e) => {
    var x = document.getElementById("busqueda").value;
    setInputName(x);
    setIsLoading(true);
    if(!x){setIsLoading(false)}
  };

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>ASESORES</h1>
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
            <button className="BotonIngresar" onClick={addNewAsesor}>
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
            ) : asesorList && asesorList.length > 0 ? (
              asesorList.map((asesor, index) => (
                <AsesorRow
                  asesor={asesor}
                  deleteList={deleteList}
                  setDeleteList={setDeleteList}
                  modalConfirmacion={modalConfirmacion}
                  setModalConfirmacion={setModalConfirmacion}
                />
              ))
            ) : (
              "No hay asesores"
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
            onClickHandler={getAsesorList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
      <div className="">
        {modalConfirmacionSeleccionado && (
          <ModalsAlert
            alertText="¿Seguro que desea borrar el (los) asesores (s)?"
            closeAlert={setModalConfirmacionSeleccionado}
            closeMensaje={setModalMensaje}
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            source="ASESOR"
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

export default CoordAsesor;
