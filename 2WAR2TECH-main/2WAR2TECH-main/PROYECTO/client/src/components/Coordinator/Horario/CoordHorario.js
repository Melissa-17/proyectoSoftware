import React, { useState, useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "../../../assets/styles/Coordinador/Mantenimiento/Container.css";
import { axiosGetCoursesBySpecialty } from "#API/Cursos";
import { axiosListAllSemesters } from "#API/Semestres";
import { axiosGetSchedule } from "#API/horario";
import HorarioRow from "./HorarioRow";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { useNavigate } from "react-router";
import ModalsAlert from "../../Modals/ModalsAlert";
import Combobox from "react-widgets/Combobox";
import ModalConfirmated from "../Curso/ModalConfirmated";
import { GridLoader } from "react-spinners";

function CoordHorario() {
  const [semestreList, setSemestreList] = useState(null);
  const [cursoList, setCursoList] = useState(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(-1);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(-1);

  const JWTtoken = sessionStorage.getItem("token");
  const [horarioList, setHorarioList] = useState(null);
  const [deleteList, setDeleteList] = useState([]);
  const navigate = useNavigate();
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalConfirmacionSeleccionado, setModalConfirmacionSeleccionado] =
    useState(false);
  const [count, setcount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getCursoList = () => {
    axiosGetCoursesBySpecialty(JWTtoken)
      .then((response) => {
        const list = response.data || [];
        setCursoList(list);
        setCursoSeleccionado(list.length ? list[0].id : -1);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCursoList();
  }, [semestreSeleccionado]);

  const getSemestreList = () => {
    axiosListAllSemesters(JWTtoken)
      .then((response) => {
        const listOne = response.data || [];
        setSemestreList(listOne);
        setSemestreSeleccionado(listOne.length ? listOne[0].id :  -1);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getSemestreList();
  }, []);

  const handleChangeTwo = (e) => {
    var a = document.getElementById("seleccionPrincipalSemestre").value;
    setSemestreSeleccionado(a);
  };

  const handleChangeOne = (e) => {
    var a = document.getElementById("seleccionPrincipalCurso").value;
    setCursoSeleccionado(a);
  };

  const getHorariosList = (page) => {
    axiosGetSchedule(JWTtoken, cursoSeleccionado, semestreSeleccionado, page, porPagina)
      .then((response) => {
        const list = response.data || [];
        // console.log(list);
        setHorarioList(list.rows);
        setcount(list.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getHorariosList();
  }, [cursoSeleccionado, semestreSeleccionado, modalMensaje]);

  const addNewHorario = () => {
    navigate("/Coordinador/horario/registro", {
      state: {
        cursoSeleccionado: cursoSeleccionado,
        semestreSeleccionado: semestreSeleccionado,
      },
    });
  };

  const confirmacionModalSeleccionado = () => {
    setModalConfirmacionSeleccionado(true);
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>HORARIOS</h1>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>

        <div className="CoordBody">
          <div className="CoordButtons">
            <button
              className="BotonBorrar"
              onClick={confirmacionModalSeleccionado}
            >
              Desactivar
            </button>
            <button className="BotonIngresar" onClick={addNewHorario}>
              Agregar horario
            </button>
          </div>

          <div className="CoordMainHorario">
            <div className="contenedorSemestreSelected">
              <p>Semestres:</p>
              {semestreList ? (
                <select
                  className="seleccionPrincipalSemestre"
                  id="seleccionPrincipalSemestre"
                  onChange={handleChangeTwo}
                >
                  {semestreList.map((semestreItem, index) => {
                    return (
                      <option value={semestreItem.id}>
                        {semestreItem.abbreviation}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <p>No hay semestres</p>
              )}
            </div>

            <div className="contenedorCursoSelected">
              <p>Curso:</p>
              {cursoList ? (
                <select
                  className="seleccionPrincipalCurso"
                  id="seleccionPrincipalCurso"
                  onChange={handleChangeOne}
                >
                  {cursoList.map((cursoItem, index) => {
                    return (
                      <option value={cursoItem.id}>{cursoItem.name}</option>
                    );
                  })}
                </select>
              ) : (
                <div>No hay cursos</div>
              )}
            </div>
          </div>

          <div className="CoordMainCard">
            {isLoading ? (
              <GridLoader
                className="mx-auto"
                color="#042354"
                loading={isLoading}
                size={24}
              />
            ) : horarioList && horarioList.length > 0 ? (
              horarioList
                // .slice(
                //   (pagina - 1) * porPagina,
                //   (pagina - 1) * porPagina + porPagina
                // )
                .map((horario, index) => (
                  <HorarioRow
                    horario={horario}
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                    cursoSeleccionado={cursoSeleccionado}
                    semestreSeleccionado={semestreSeleccionado}
                  />
                ))
            ) : (
              <p style={{marginTop:"150px"}}>No hay horarios</p>
            )}
          </div>
        </div>
        <div
          className="contenedorBotoneriaEntregable"
          style={{ width: "1000px" }}
        >
          {horarioList && horarioList.length>0?
          <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getHorariosList}
          setIsLoading={setIsLoading}
        />:""}
        </div>
      </div>
      <div className="">
        {modalConfirmacionSeleccionado && (
          <ModalsAlert
            alertText="¿Seguro que desea borrar el (los) horario (s)?"
            closeAlert={setModalConfirmacionSeleccionado}
            closeMensaje={setModalMensaje}
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            source="HORARIO"
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

export default CoordHorario;
