import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import CourseCard from "./CourseCard";
import "#Styles/Teacher/CourseManagement/MainCourseManagement.css";
import Combobox from "react-widgets/Combobox";
import { axiosGetCoursesBySpecialty } from "#API/Cursos";
import { axiosListAllSemesters } from "#API/Semestres";
import { GridLoader } from "react-spinners";
import { UserContext } from "#Context/userContext";
import { axiosGetScheduleProfessor } from "#API/horario";
import { Paginacion } from "#Components/Pagination/Pagination.js";

function MainCourseManagement() {
  const JWTtoken = sessionStorage.getItem("token");
  const [semestreList, setSemestreList] = useState(null);
  const [cursoList, setCursoList] = useState(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(9999);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(9999);
  const [horarioList, setHorarioList] = useState(null);

  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  const [count, setcount] = useState(0);

  const [semLoading, setSemLoading] = useState(true);
  const [curLoading, setCurLoading] = useState(true);
  const [horLoading, setHorLoading] = useState(true);

  const getCursoList = () => {
    axiosGetCoursesBySpecialty(JWTtoken)
      .then((response) => {
        const list = response.data || [];
        setCursoList(list);
        
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
        console.log(listOne)
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
        console.log(response.data);
        const list = response.data || [];
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
  }
  , [cursoSeleccionado, semestreSeleccionado]
  );

  // console.log(semestreList);

  const handleSemesterChange = (e) => {
    var a = document.getElementById("seleccionPrincipalSemestre").value;
    setSemestreSeleccionado(a);
  };

  const handleCourseChange = (e) => {
    var a = document.getElementById("seleccionPrincipalCurso").value;
    setCursoSeleccionado(a);
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  return (
    <div>
      <Navbar />
      <div className="courseManagementContainer">
        <div className="MPheader">
          <div className="CoordMainHorario">
            <div className="contenedorSemestreSelected">
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
          <p className="MCMtitle">HORARIOS</p>
          <div className="contenedorLineaDetalle">
            <hr color="#CED4DA" className="linea" /> 
          </div>
        </div>
        <div className="coursesCards">
          {horLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={horLoading}
              size={10}
            />
          ) : horarioList && count ? (
            horarioList.map((horario, index) => (
              <div className="holaqueal" key={index}>
                <CourseCard
                  cxs={horario.id}
                  horario={horario}
                  courseId={cursoSeleccionado}
                  // title={course.COURSE.name}
                  semesterId={semestreSeleccionado}
                />
              </div>
            ))
          ) : (
            <p>Aún no hay horarios asignados</p>
          )}
        </div>
        <div className="cManFooter" style={{marginTop:"20px"}}>
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getSchedulesList}
            setIsLoading={setHorLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default MainCourseManagement;
