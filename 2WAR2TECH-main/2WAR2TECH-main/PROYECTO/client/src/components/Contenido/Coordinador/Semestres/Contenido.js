import React, { useEffect } from "react";
import { useState } from "react";
import "../../../../assets/styles/Coordinador/Semestres/Pantalla.css";
import "../../../../assets/styles/Coordinador/Semestres/Principal.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";
import ContenedorCursos from "./ContenedorCursos";
import { axiosGetSemestresbyUserId } from "#API/Semestres.js";
import Navbar from "../../../SidebarMenu/Navbar";
import { element, object } from "prop-types";
import { axiosGetCursosBySemesterId } from "#API/Cursos";
// import Deliverable from './Deliverable';
// import Partial from './Partial';

export default function Contenido() {
  const [semestreLista, setSemestreLista] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const [selectedSemester, setSelectedSemester] = useState();
  const JWTtoken = localStorage.getItem("token");

  const getAllCourseList = (id) => {
    axiosGetCursosBySemesterId(JWTtoken, id)
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
        console.log(list);
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

  const navigate = useNavigate();

  const EditarSemestre = () => {
    console.log(courseList);
    navigate(`/Semestre/detalle/`, {
      state: {
        semester: selectedSemester,
        courses: courseList,
      },
    });
  };
  const CrearSemestre = () => {
    navigate("/Semestre/nuevo");
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e);
    getAllCourseList(e.id);
  };

  return (
    <div className="estructura">
      <Navbar />
      <div className="contenedorContenido2">
        <div className="contenedorTitulo">
          <h1>SEMESTRES</h1>
        </div>

        <hr color="black" className="lineaContenido" />

        <div className="contenedorOpciones">
          <div className="filtro">
            <h4>Ciclo</h4>

            <Combobox
              onChange={handleSemesterChange}
              value={selectedSemester}
              dataKey="id"
              textField="abbreviation"
              data={semestreLista}
            />
          </div>
          <button onClick={EditarSemestre} className="boton">
            {" "}
            Editar Semestre
          </button>
          <button className="boton" onClick={CrearSemestre}>
            {" "}
            Agregar Semestre
          </button>
        </div>

        <div className="contenedorlista">
          {/* aqui debo pasar la info extraida del combobox, la opcion seleccionada */}

          <ContenedorCursos courseList={courseList} />
        </div>
      </div>
    </div>
  );
}
