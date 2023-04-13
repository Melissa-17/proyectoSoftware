import React, { useState, useEffect } from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import Header from "./Header";
import "../../../assets/styles/Admin/Semester/PrincipalSemester.css";
import Botoneria from "./Botoneria";
import CardSemester from "./CardSemester";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { axiosListPaginationSemesters } from "../../../api/Semestres";
import { GridLoader } from "react-spinners";
import { LogarithmicScale } from "chart.js";
import { axiosGetFaculties } from "../../../api/Faculty";
import { axiosGetDetailFaculty } from "../../../api/Faculty";

export default function PrincipalSemester() {
  const [deleteList, setDeleteList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const [semetreList, setSemetreList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(7);

  const maximo = count ? Math.ceil(count / porPagina) : 0;

  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalConfirmacion2, setModalConfirmacion2] = useState(false);

  const [facultadList, setFacultyList] = useState([]);
  const [isLoadingFacultad, setIsLoadingFacultad] = useState(true);
  const [facultadSeleccionado, setFacultadSeleccionado] = useState("");
  const [facultyDetail, setFacultyDetail] = useState("");
  const [isLoadingEspecialidad, setIsLoadingEspecialidad] = useState(true);
  const [especialidadSeleccionado, setEspecialidadSeleccionado] = useState(0);

  const getFacultyList = () => {
    axiosGetFaculties(JWTtoken)
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        setFacultyList(list);
        // console.log(list);
        setIsLoadingFacultad(false);
        setFacultadSeleccionado(list && list[0] ? list[0].id : 0);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getFacultyList();
  }, []);

  const handleChange = (e) => {
    var a = document.getElementById("selectFacultadNuevoSemestre").value;
    setFacultadSeleccionado(a);
  };

  const getEspecialidadFacultad = () => {
    axiosGetDetailFaculty(JWTtoken, facultadSeleccionado)
      .then((response) => {
        // console.log(response.data);
        const data = response.data || "";
        setFacultyDetail(data);
        setEspecialidadSeleccionado(
          data &&
            data.specialty &&
            data.specialty.rows &&
            data.specialty.rows[0] &&
            data.specialty.rows[0].id
            ? data.specialty.rows[0].id
            : 0
        );
        setIsLoadingEspecialidad(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getEspecialidadFacultad();
  }, [facultadSeleccionado]);

  const handleChangeEspecialidad = (e) => {
    var a = document.getElementById("seleccionModalAsignarEspecialidad").value;
    setEspecialidadSeleccionado(a);
  };

  const getSemestreList = (page) => {
    setIsLoading(true);
    axiosListPaginationSemesters(JWTtoken, page, porPagina, especialidadSeleccionado)
      .then((response) => {
        // console.log(response.data);

        const list = response.data || [];
        setSemetreList(list.rows);
        setIsLoading(false);
        setCount(list.count ? list.count : 0);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getSemestreList();
  }, [
    modalConfirmacion,
    modalMensaje,
    modalConfirmacion2,
    especialidadSeleccionado,
  ]);

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalSemester">
        <div className="headerPrincipalSemester">
          <Header />
        </div>
        <div className="botoneriaPrincipalSemester">
          <Botoneria
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            modalConfirmacion={modalConfirmacion}
            setModalConfirmacion={setModalConfirmacion}
            modalMensaje={modalMensaje}
            setModalMensaje={setModalMensaje}
          />
        </div>

        {/* <div className="contenedorSeleccionFacultadEspecialidadPrincipalSemester">
          <div
            className="contenedorComboBoxModalNuevoSemestre"
            style={{ marginRight: "20px" }}
          >
            <select
              className="selectFacultadNuevoSemestre"
              id="selectFacultadNuevoSemestre"
              onChange={handleChange}
            >
              {facultadList && !isLoadingFacultad && facultadList.length > 0
                ? facultadList.map((facultyItem, index) => {
                    return (
                      <option value={facultyItem.id}>
                        {facultyItem.name.toUpperCase()}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>

          <div className="contenedorComboBoxModalNuevoSemestre">
            <select
              className="seleccionModalAsignarEspecialidad"
              id="seleccionModalAsignarEspecialidad"
              onChange={handleChangeEspecialidad}
            >
              {facultyDetail &&
              !isLoadingEspecialidad &&
              facultyDetail.specialty &&
              facultyDetail.specialty.count > 0 ? (
                facultyDetail.specialty.rows.map((especialidadItem, index) => {
                  return (
                    <option value={especialidadItem.id}>
                      {especialidadItem.name.toUpperCase()}
                    </option>
                  );
                })
              ) : (
                <option>Aún no hay especialidades registradas</option>
              )}
            </select>
          </div>
        </div> */}

        <div>
          {/* {console.log(semetreList)} */}
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={16}
            />
          ) : semetreList && semetreList.length > 0 ? (
            semetreList.map((semestreItem, index) => {
              return (
                <div key={index} className="espaciadoDeliverable">
                  <CardSemester
                    semestreItem={semestreItem}
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                    modalConfirmacion2={modalConfirmacion2}
                    setModalConfirmacion2={setModalConfirmacion2}
                  />
                </div>
              );
            })
          ) : (
            <p className="error">No tiene una lista de semestres</p>
          )}
        </div>
        <div
          className="contenedorBotoneriaEntregable"
          style={{ marginTop: "20px", width: "1000px" }}
        >
          {/* {console.log(count)} */}
          {count>0?<Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            setIsLoading={setIsLoading}
            onClickHandler={getSemestreList}
          />:""}
        </div>
      </div>
    </div>
  );
}
