import React, { useState } from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import Header from "./Header";
import "#Styles/Admin/Specialty/Principal.css";
import {
  axiosGetPaginationFaculties,
  axiosGetDetailFaculty,
} from "../../../api/Faculty";
import { useEffect } from "react";
import CardEspecialidadFacultyPart from "../Faculty/Visual/CardEspecialidadFacultyPart";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalNuevaFacultad from "./ModalNuevaFacultad";
import ModalsMessageFacultyAdmin from "./ModalsMessageLevel";
import { GridLoader } from "react-spinners";

export default function PrincipalSpecialty() {
  const [facultadSeleccionado, setFacultadSeleccionado] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [facultyDetail, setFacultyDetail] = useState();
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalNuevaFacultad, setModalNuevaFacultad] = useState(false);

  const [modalMensaje, setModalMensaje] = useState(false);
  const [count, setCount] = useState(1);
  const [isLoadingEspecialidad, setIsLoadingEspecialidad] = useState(true);

  const JWTtoken = sessionStorage.getItem("token");

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  const getFacultyList = (page) => {
    axiosGetPaginationFaculties(JWTtoken)
      .then((response) => {
        // console.log("A");
        // console.log(response.data);
        const list = response.data || [];
        setFacultyList(list.rows);
        
        setFacultadSeleccionado(list.rows.length  ? list.rows[0].id : null);
        getEspecialidadFacultad(1, list.rows[0].id);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getFacultyList();
  }, []);

  const handleChange = (e) => {
    var a = document.getElementById("seleccionPrincipalSpecialty").value;
    // console.log(a);
    setFacultadSeleccionado(a);
  };

  // console.log(facultadSeleccionado);

  const getEspecialidadFacultad = (page, facSel) => {
    // facSel = facSel ? facSel : facultadSeleccionado;
    setIsLoadingEspecialidad(true);
    // console.log(facultadSeleccionado);
    axiosGetDetailFaculty(JWTtoken, facultadSeleccionado, page, porPagina)
      .then((response) => {
        // console.log(facultadSeleccionado, JSON.stringify(response.data));
        const data = response.data || "";
        setFacultyDetail(data);
        setCount(data.specialty.count);
        setIsLoadingEspecialidad(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getEspecialidadFacultad();
  }, [facultadSeleccionado, modalConfirmacion, modalMensaje]);

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalSpecialty">
        <Header />

        <div className="contenedorFacultadSelected">
          <p>Facultad:</p>
          <select
            className="seleccionPrincipalSpecialty"
            id="seleccionPrincipalSpecialty"
            onChange={handleChange}
          >
            {facultyList
              ? facultyList.map((facultyItem, index) => {
                  return (
                    <option value={facultyItem.id}>
                      {facultyItem.name.toUpperCase()}
                    </option>
                  );
                })
              : <p>Aún no hay facultades registradas</p>}
          </select>
        </div>

        <div className="contenedorListEspecialidad">
          <div className="primeraLineaPrincipalSpecialty">
            <p>Especialidades*</p>
            <button
              onClick={() => {
                setModalNuevaFacultad(true);
              }}
            >
              Agregar Especialidad
            </button>
          </div>
          <div className="cardPrincipalSpecialty">
            {isLoadingEspecialidad ? (
              <GridLoader
                className="mx-auto"
                color="#042354"
                loading={isLoadingEspecialidad}
                size={16}
              />
            ) : facultadSeleccionado && facultyDetail &&
              facultyDetail.specialty &&
              facultyDetail.specialty.count > 0 ? (
                // console.log("")
              facultyDetail.specialty.rows.map((especialidad, index) => {
                
                return (
                  <div key={index} className="espaciadoDeliverable">
                    <CardEspecialidadFacultyPart
                      especialidad={especialidad}
                      option={2}
                      setModalMensaje={setModalMensaje}
                      modalMensaje={modalMensaje}
                      modalConfirmacion={modalConfirmacion}
                      setConfirmacion={setModalConfirmacion}
                    />
                  </div>
                );
              })
            ) : (
              <p className="error">Aún no hay especialidades registradas</p>
            )}
          </div>
        </div>
        <div
          className="contenedorBotoneriaEntregable"
          style={{ marginTop: "20px" }}
        >
          {facultyDetail && facultyDetail.specialty && facultyDetail.specialty.count>0?
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} 
        onClickHandler={getEspecialidadFacultad}
            setIsLoading={isLoadingEspecialidad}
        />:""  
        }
        </div>
        <div>
          {modalNuevaFacultad && (
            <ModalNuevaFacultad
              closeMessage={setModalNuevaFacultad}
              facultadSeleccionado={facultadSeleccionado}
              modalMessage={setModalConfirmacion}
            />
          )}
          {modalConfirmacion && (
            <ModalsMessageFacultyAdmin
              closeMessage={setModalConfirmacion}
              closeOtroModal={setModalNuevaFacultad}
              message="Se registró correctamente"
            />
          )}
        </div>
      </div>
    </div>
  );
}
