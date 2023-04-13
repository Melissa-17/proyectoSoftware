import React, { useEffect } from "react";
import { useState } from "react";
import "../../../../assets/styles/Coordinador/Semestres/Pantalla.css";
import "../../../../assets/styles/Coordinador/Semestres/Principal.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";
import ContenedorCursos from "./ContenedorCursos";
import ContenedorProfesoresfilas from "./ContenedorProfesoresfilas";
import { axiosGetSemestresbyUserId } from "#API/Semestres.js";
import Navbar from "../../../SidebarMenu/Navbar";
import BuscadorProfesor from "./BuscadorProfesores";
import ModalsMessage from "../../../Modals/ModalsMessage";
import ModalsAlert from './ModalsAlert';
// import Deliverable from './Deliverable';
// import Partial from './Partial';

let semestrefijos = ["2021-1", "2021-2", "2022-1", "2022-2"];

export default function NuevoCurso() {
  const { state } = useLocation();

  const [courseList, setCourseList] = useState(state ? state.courseList : []);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const JWTtoken = localStorage.getItem("token");
  const [openModal, setOpenModal] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [selectedProfesorList, setSelectedProfesorList] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [alertaSemestre, setAlertaSemestre] = useState(false);
  const { semester } = state.semester;
  // console.log(semester);

  const navigate = useNavigate();

  const retrocesoClic = () => {
    navigate("/Semestre/nuevo", {
      state: {
        semester: semester,
        courseList: courseList,
      },
    });
  };
  useEffect(() => {}, [courseList]);

  const handleCourseCreated = (e) => {
    e.preventDefault();
    const name = document.querySelector(".course-name").value;
    const key = document.querySelector(".course-key").value;
    const credits = document.querySelector(".course-credits").value;
    let listOfIdProfessors = selectedProfesorList.map((prof, index) => {
      return prof.id;
    });
    listOfIdProfessors = [...listOfIdProfessors];
    console.log(listOfIdProfessors);

    const newCourse = {
      COURSE: {
        id: courseList.length,
        name: name,
        key: key,
        credits: credits,
        type: isNew ? "NEW" : "COPY",
        users: listOfIdProfessors,
      },
      COURSEId: courseList.length,
    };
    const newCourseList = [...courseList, newCourse];
    setCourseList((courseList) => [...courseList, newCourse]);
  };


  const handleProfesorDelete = (profId) => {
    const newProfesorList = selectedProfesorList.filter((prof) => {
      return prof.id !== profId;
    });
    setSelectedProfesorList(newProfesorList);
  };
  return (
    <div className="estructura">
      <Navbar />
      <div className="contenedorContenido2">
        <div className="contenedorTitulo">
          <h1>REGISTRO DE CURSO</h1>
          <div className="espacio">
            <button
              onClick={retrocesoClic}
              className="botonRetrocesoDetalleCreateCourse"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
        </div>

        <hr color="black" className="lineaContenido" />

        <div className="leyenda">
          <p>Leyenda: Los campos con * son obligatorios</p>
        </div>
        <form
          id="course-form"
          className="course-form"
          onSubmit={handleCourseCreated}
        >
          <div className="contenedortextBox">
            <div className="textbox">
              <label htmlFor="course-name">Nombre *</label>

              <input
                id="course-name"
                name="course-name"
                type="text"
                className="course-name"
              />
            </div>

            <div className="textbox">
              <label htmlFor="course-key">Clave *</label>
              <input
                id="course-key"
                name="course-key"
                type="text"
                className="course-key"
              />
            </div>

            <div className="textbox">
              <label htmlFor="course-credits">Creditos *</label>
              <input
                id="course-credits"
                name="course-credits"
                type="text"
                className="course-credits"
              />
            </div>
          </div>
          
          <div className="contenedordecursos">
            <div className="cursostitulo">
              <p>Profesores</p>
              <div></div>
              <button
                className="add"
                type="button"
                onClick={() => {
                  // aqui debe estar el listado de profesores por especialidad
                  setOpenModal(true);
                }}
              >
                <i class="bi bi-plus-lg" />
              </button>
            </div>
            <ContenedorProfesoresfilas
              handleProfesorDelete={handleProfesorDelete}
              selectedProfesorList={selectedProfesorList}
              setSelectedProfesorList={setSelectedProfesorList}
            />
          </div>
          <div className="contenedorbotones">
            <div className="espacio"></div>
            <button 
            onClick={()=>{setAlertaSemestre(true);}}
            type="button"
            >
              Limpiar</button>

            {alertaSemestre && (
              <ModalsAlert
                closeAlert={setAlertaSemestre}
                alertText="¿Desea limpiar los datos avanzados?"
                cambioPantalla={retrocesoClic}
              />
            )}

            <button
              type="submit"
              form="course-form"
              onClick={() => {
                setOpenMessage(true);
              }}
            >
              Guardar
            </button>
            {openMessage && (
              <ModalsMessage
                closeMessage={setOpenMessage}
                message="Curso añadido con éxito"
                navigateFunc={retrocesoClic}
              />
            )}
          </div>
        </form>
      </div>

      {openModal && (
        <BuscadorProfesor
          closeModal={setOpenModal}
          selectedProfesor={selectedProfesor}
          setSelectedProfesor={setSelectedProfesor}
          selectedProfesorList={selectedProfesorList}
          setSelectedProfesorList={setSelectedProfesorList}
        />
      )}
    </div>
  );
}
