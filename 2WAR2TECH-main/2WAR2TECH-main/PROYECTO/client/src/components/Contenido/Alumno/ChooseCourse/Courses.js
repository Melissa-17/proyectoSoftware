import React, { useEffect, useState } from "react";
import "#Styles/Alumno/ChooseCourse/Courses.css";
import Navbar from "../../../SidebarMenu/Navbar";
import { axiosGetSemestresbyUserId } from "#API/Semestres.js";
import { axiosGetCursosBySemesterId } from "#API/Cursos";
import { axiosGetSchedulesUser } from "#API/User";
import Combobox from "react-widgets/Combobox";
import CourseCard from "./CourseCard";

function Courses() {
  const JWTtoken = localStorage.getItem("token");
  const [semestreLista, setSemestreLista] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState();
  

  const getAllCourseList = (id) => {
    axiosGetSchedulesUser(JWTtoken, id)
      .then((response) => {
        // console.log(id);
        const list = response.data || [];

        setCourseList(list);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const getAllSemestresLista = () => {
    axiosGetSemestresbyUserId(JWTtoken)
      .then((response) => {
        // console.log(response);
        const list = response.data || [];
        //console.log(list);
        setSemestreLista(list);
        setSelectedSemester(list[list.length - 1]);
        getAllCourseList(list[list.length - 1].id);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllSemestresLista();
  }, []);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e);
    getAllCourseList(e.id);
  };

  console.log(courseList);

  return (
    <div>
      <Navbar />
      <div className="coursesMainContainer">
        <div className="coursesHeader">
          <p className="title">MIS CURSOS</p>
          <div className="contenedorLineaDetalle">
            <hr color="black" className="lineaContenidoAvance" style={{width:"1100px", marginBottom:"20px",marginTop:"10px"}}/>
          </div>
        </div>
        <div className="coursesContent">
          <div className="filtroCiclo">
            <p>Semestre:</p>
            <Combobox
              onChange={handleSemesterChange}
              value={selectedSemester}
              dataKey="id"
              textField="abbreviation"
              data={semestreLista}
            />
          </div>
          <div className="listaCursos">
            {courseList ? (
              courseList.map((course, index) => {
                // const valorEstado = getValorEstado(curso.status);
                return (
                  <div key={index} className="espaciado">
                    <CourseCard course={course}/>
                  </div>
                );
              })
            ) : (
              <p>Seleccione un semestre</p>
            )}
          </div>
        </div>
        <div className="coursesFooter"></div>
      </div>
    </div>
  );
}

export default Courses;
