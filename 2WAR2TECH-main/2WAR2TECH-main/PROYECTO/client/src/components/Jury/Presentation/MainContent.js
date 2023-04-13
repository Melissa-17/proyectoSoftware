import React, { useEffect, useState, useContext } from "react";
import "#Styles/Jury/Presentation/MainContent.css";
import Cursos from "./Cursos";
import { axiosListAllSemesters } from "../../../api/Semestres";
import { GridLoader } from "react-spinners";
import { axiosGetCoursesBySpecialty } from "../../../api/Cursos";
import { axiosGetSemestresbyUserId } from "../../../api/Semestres";
import { axiosGetCursosBySemesterId } from "../../../api/Cursos";
import { axiosGetScheduleProfessor } from "../../../api/horario";
import { UserContext } from "#Context/userContext";
import { Paginacion } from "#Components/Pagination/Pagination.js";

export default function MainContent(props) {
  const {num} = props;
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  const [count, setcount] = useState(0);

  const [horarioList, setHorarioList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const [semestreLista, setSemestreLista] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState({ id: 999999 });

  const [semestreList, setSemestreList] = useState(null);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(9999);
  const [semLoading, setSemLoading] = useState(true);

  const [curLoading, setCurLoading] = useState(true);
  const [cursoList, setCursoList] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(9999);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(9999);

  const [horLoading, setHorLoading] = useState(true);
  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(3);

  const maximo = count ? Math.ceil(count / porPagina) : 0;

  const getSchedulesList = (page) => {
    axiosGetScheduleProfessor(
      JWTtoken,
      cursoSeleccionado,
      semestreSeleccionado,
      user.id,
      page,
      porPagina
    )
      .then((response) => {
        const list = response.data || [];
        // console.log(list);
        setHorarioList(list.rows);
        setcount(list.count);
        setHorLoading(false);
        // const listOne = response.data || [];
        // setSemestreList(listOne);
        // setSemLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getSchedulesList();
  }, [cursoSeleccionado, semestreSeleccionado]);

  const getCursoList = () => {
    axiosGetCoursesBySpecialty(JWTtoken)
      .then((response) => {
        const list = response.data || [];
        setCursoList(list);
        // console.log(list);
        setCursoSeleccionado(list.length ? list[0].id : 999999);
        setCurLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCursoList();
  }, []);

  const getSemestreList = () => {
    axiosListAllSemesters(JWTtoken)
      .then((response) => {
        const listOne = response.data || [];
        setSemestreList(listOne);
        setSemestreSeleccionado(listOne.length ? listOne[0].id : 999999);
        setSemLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getSemestreList();
  }, []);

  const handleSemesterChange = (e) => {
    var a = document.getElementById("seleccionPrincipalSemestre").value;
    setSemestreSeleccionado(a);
  };

  const handleCourseChange = (e) => {
    const a = document.getElementById("seleccionPrincipalCurso").value;
    setCursoSeleccionado(a);
  };

  return (
    <div className="main-box-content">
      <div className="opcionesMainContentPresentation">
        <div
          className="contenedorSemestreSelected"
          style={{ marginRight: "50px" }}
        >
          <p>Semestres:</p>
          {semLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={semLoading}
              size={10}
            />
          ) : semestreList && semestreList.length > 0 ? (
            <select
              className="seleccionPrincipalSemestre"
              id="seleccionPrincipalSemestre"
              onChange={handleSemesterChange}
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
          {curLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={curLoading}
              size={10}
            />
          ) : cursoList && cursoList.length > 0 ? (
            <select
              className="seleccionPrincipalCurso"
              id="seleccionPrincipalCurso"
              onChange={handleCourseChange}
              style={{ width: "480px" }}
            >
              {cursoList.map((horarioItem, index) => {
                return (
                  <option value={horarioItem.id}>{horarioItem.name}</option>
                );
              })}
            </select>
          ) : (
            <div>No hay cursos</div>
          )}
        </div>
      </div>
      <hr className="espacio-opciones"></hr>
      <div className="contenido">
        {horLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={horLoading}
            size={10}
          />
        ) : horarioList && count > 0 ? (
          horarioList.map((horarioItem, index) => {
            return (
              <div key={index} className="curso-unico">
                <Cursos curso={horarioItem} num={num}/>
              </div>
            );
          })
        ) : (
          <div className="no-cursos">
            <p>No existen presentaciones en el curso</p>
          </div>
        )}
        {/* {console.log(horarioSeleccionado)} */}
      </div>
      <div className="contenedorBotoneriaEntregable" style={{marginTop:"20px"}}>
          {count>0?
          <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          setIsLoading={setHorLoading}
          onClickHandler={getSchedulesList}
        />:""}
      </div>
    </div>
  );
}
