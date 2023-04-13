import React, { useEffect, useState } from "react";
import "#Styles/Teacher/AssignmentJury/MainContent.css";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import { GridLoader } from "react-spinners";
import InfoTheme from "./InfoTheme";
import { useNavigate } from "react-router";
import { axiosGetThesisGroupByAsesor } from "../../../api/User";
import Card from "./Card";

export default function MainContent(props) {
  const { courseId, semesterId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const [thesisAndStudents, setThesisAndStudents] = useState();
  const [studentsList, setStudentsList] = useState([]);
  const [thesisList, setThesisList] = useState([]);
  const navigate = useNavigate();

  let inputNameHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputName(lowerCase);
    getThemesList();
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);
  const [count, setcount] = useState(0);
  const maximo = Math.ceil(count / porPagina);

  const JWTtoken = localStorage.getItem("token");

  const getThemesList = (page) => {
    const body = {
      ciclo: semesterId,
      curso: courseId,
    };
    axiosGetThesisGroupByAsesor(JWTtoken, body, page, porPagina, inputName)
      .then((response) => {
        console.log(response);
        const listThemes = response.data.rows || [];
        setThesisList(listThemes);
        // const listStud = response.data.thesisStudent || [];
        // setStudentsList(listStud);
        setIsLoading(false);
        setcount(response.data.count);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const getStudentsPerTesis = (theme) => {
    return studentsList.rows.filter((e) => e.THESISId == theme.id);
  };

  useEffect(() => {
    getThemesList();
  }, []);

  return (
    <div className="main-box-assignment">
      <div className="navBar-asign">
        <CreateNewUserPageStudent />
      </div>

      <div className="seccion-contenido-assignment">
        <div className="seccion-buscador-temas">
          <input
            className="input-buscador-tema"
            type="text"
            placeholder=" Ingrese un nombre"
            onChange={inputNameHandler}
          />
          <i class="bi bi-search" />
        </div>
        <div className="content-temas-tesis">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
            />
          ) : thesisList.length > 0 ? (
            thesisList.map((thesis, index) => {
              //const listStudents = getStudentsPerTesis(theme);
              // {console.log(listStudents)}
              //const id=theme?theme.id:1;
              return (
                <div key={index} className="espaciado-zona-themes">
                  <Card
                    thesis={thesis}
                    semesterId={semesterId}
                    courseId={courseId}
                  />
                </div>
              );
            })
          ) : (
            <div className="no-themes">
              <p className="no-theme-info">No existen temas de tesis</p>
            </div>
          )}
        </div>
      </div>
      <div className="nav-paginas">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getThemesList}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
