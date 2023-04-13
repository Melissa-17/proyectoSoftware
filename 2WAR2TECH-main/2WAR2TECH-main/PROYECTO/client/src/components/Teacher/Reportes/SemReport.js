import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Combobox from "react-widgets/Combobox";
import { axiosGetSemestresbyUserId } from "#API/Semestres.js";
import Navbar from "../../SidebarMenu/Navbar";
import { element, object } from "prop-types";
import { axiosGetCursosBySemesterId } from "#API/Cursos";
import { Route, Routes, useNavigate } from "react-router-dom";
import "#Styles/Teacher/Reporte/SemReport.css";
import ContenedorCursos from "./ContenedorCursos2";
import { UserContext } from "#Context/userContext";
import { axiosGetCoursesBySpecialty } from "../../../api/Cursos";
import { axiosListAllSemesters } from "../../../api/Semestres";
import { axiosGetScheduleProfessor } from "#API/horario";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";

function SemReport() {
  //const [semestreLista, setSemestreLista] = useState([]);
  //const [courseList, setCourseList] = useState([]);

  const [selectedSemester, setSelectedSemester] = useState();
  const JWTtoken = localStorage.getItem("token");

  const [semestreList, setSemestreList] = useState([]);
  const [cursoList, setCursoList] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(9999);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(9999);
  const [horarioList, setHorarioList] = useState([]);

  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  const [count, setcount] = useState(0);

  const [semLoading, setSemLoading] = useState(true);
  const [curLoading, setCurLoading] = useState(true);
  const [horLoading, setHorLoading] = useState(true);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(6);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  // const getAllCourseList = (id) => {
  //   axiosGetCursosBySemesterId(JWTtoken, id)
  //     .then((response) => {
  //       // console.log(id);
  //       const list = response.data || [];

  //       setCourseList(list);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  // const getAllSemestresLista = () => {
  //   axiosGetSemestresbyUserId(JWTtoken)
  //     .then((response) => {
  //       // console.log(response);
  //       const list = response.data || [];
  //       console.log(list);
  //       setSemestreLista(list);
  //       setSelectedSemester(list[list.length - 1]);
  //       getAllCourseList(list[list.length - 1].id);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  // useEffect(() => {
  //   getAllSemestresLista();
  // }, []);

  const getCursoList = () => {
    axiosGetCoursesBySpecialty(JWTtoken)
      .then((response) => {
        //console.log(response);
        const list = response.data || [];
        setCursoList(list);
        
        setCursoSeleccionado(list.length ? list[0].id : 999999);
        setCurLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  

  const getSemestreList = () => {
    axiosListAllSemesters(JWTtoken)
      .then((response) => {
        //console.log(response);
        const listOne = response.data || [];
        setSemestreList(listOne);
        //console.log(listOne)
        setSemestreSeleccionado(listOne.length ? listOne[0].id : 999999);
        setSemLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  

  // const handleSemesterChange = (e) => {
  //   setSelectedSemester(e);
  //   getAllCourseList(e.id);
  // };

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
        console.log(response);
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
    getSemestreList();
  }, []);
  useEffect(() => {
    getCursoList();
  }, []);
  useEffect(()=>{
    getSchedulesList();
  },
  [semestreSeleccionado, cursoSeleccionado]
  )

  const handleSemesterChange = (e) => {
    
    setSemestreSeleccionado(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCursoSeleccionado(e.target.value);
  };

  return (
    <div className="estructura1">
      <Navbar />
      <div className="contenederContenido2">
        <div className="contenedorHeader">
          <div className="tituloHeaderSemReporte">
            <h1
            style={{fontWeight:"700", fontSize:"48px", lineHeight:"58px"}}
            >Reportes de calificaciones por semestre</h1>
          </div>
          <div className="contenedorLineaHeader">
            <hr color="#CED4DA" className="linea" />
          </div>
        </div>

        <div className="contenedorOpciones">
          <div className="filtro-opciones">
            <div className="un-filtro">
              <h3 className="text-filtro">Ciclo</h3>
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
            <div className="un-filtro">
              <h3 className="text-filtro">Curso</h3>
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
        </div>

        <div className="contenedorlista-reportes">
          {/* aqui debo pasar la info extraida del combobox, la opcion seleccionada */}
          {/* {console.log(courseList)} */}
          <ContenedorCursos
            courseList={horarioList} 
            semester={semestreSeleccionado}
            course={cursoSeleccionado}
            curLoading={curLoading}
            horLoading={horLoading}
            semLoading={semLoading}/>  
            {/* hola */}
        </div>
        <div className="footer-sem-report">
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

export default SemReport;
