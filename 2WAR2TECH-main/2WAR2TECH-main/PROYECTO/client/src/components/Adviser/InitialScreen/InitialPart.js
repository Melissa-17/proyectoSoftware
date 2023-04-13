import React from "react";
import { useState, useEffect } from "react";
import "#Styles/Adviser/InitialScreen/InitialPart.css";
import AdviserBt from "./AdviserBt";
import { axiosGetSemestresbyUserId } from "#API/Semestres.js";
import { axiosGetCursosBySemesterId } from "#API/Cursos";
import Combobox from "react-widgets/Combobox";
import { axiosGetListOfStudents } from "#API/User";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function InitialPartAdviser(props) {
  const [semestreLista, setSemestreLista] = useState([]);
  const [count, setCount] = useState(1);
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //Esta lista cambiar
  const [studentList, setStudentList] = useState([]);

  const [selectedSemester, setSelectedSemester] = useState([{ id: 999999, abbreviation: "No hay semestres" }]);
  const [selectedCourse, setSelectedCourse] = useState([{ COURSEId: 999999, name: "No hay cursos",  }]);
  const [inputName, setInputName] = useState("");

  const JWTtoken = localStorage.getItem("token");
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));

  const getAllCourseList = (id) => {
    axiosGetCursosBySemesterId(JWTtoken, id)
      .then((response) => {
        console.log(response);
        const list = response.data.length ?  response.data : [{ COURSEId: 999999, name: "No hay cursos", COURSE: {name: "No hay cursos"}, abbreviation: "" }];
        console.log(list[0] )
        setCourseList(list);
        setSelectedCourse(list[0]);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const getAllSemestresLista = () => {
    axiosGetSemestresbyUserId(JWTtoken)
      .then((response) => {
        console.log(response.data);
        
        const list = response.data.length ? response.data : [{ id: 999999, abbreviation: "No hay semestres", COURSE: {name: "No hay"} }];
        setSemestreLista(list);
        setSelectedSemester(list[list.length - 1]);
        getAllCourseList(list[list.length - 1].id);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const getStudentList = (page, cxsid) => {

    const inputList = {
      ciclo: selectedSemester.id ? selectedSemester.id : -1,
      curso: selectedCourse.COURSEId ? selectedCourse.COURSEId : -1,
      cxsid: cxsid ? cxsid : selectedCourse.id ? selectedCourse.id : -1,
    };
    // console.log(inputList);

    axiosGetListOfStudents(JWTtoken, inputList, page, porPagina, inputName)
      .then((response) => {
        console.log(response.data);
        const list = response.data || [];
        // setStudentList(list.alumnos);
        // console.log(list.rows);
        setStudentList(list.rows);
        setCount(list.count);
        // console.log(user);
        // console.log("Asesor: " + list.length + "   -   " + JSON.stringify(list, null, 2) );
        // if (user.ROLEs && user.ROLEs[0].description == "Asesor") {
          // console.log(list);
          // setStudentList(list);
        // } else {
          // console.log(list);
          // setStudentList(list);
        // }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllSemestresLista();
  }, []);

  useEffect(() => {
    getStudentList();
  }, [inputName, selectedCourse]);

  const handleSemesterChange = (e) => {
    setIsLoading(true);
    getAllCourseList(e.id);
    setSelectedSemester(e);
  };

  const handleCourseChange = (e) => {
    console.log(e)
    setIsLoading(true);
    setSelectedCourse(e);
    getStudentList(1, e.id);
  };

  let inputNameHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputName(lowerCase);
    getStudentList();
  };

  // const getAllStudentList = () => {

  //     axiosGetSemestresbyUserId(JWTtoken).then(
  //         (response) => {
  //             // console.log(response);
  //             const list = response.data || [];
  //             setSemestreLista(list);
  //         }
  //     ).catch(error => {
  //         console.error(`Error: ${error}`);
  //     });
  // };

  const comboCourseList = courseList.map((e) => {
    return {
      id: e.id,
      name: e.COURSE.name + " - " + e.abbreviation,
      COURSE: {
        name: e.COURSE.name
      }
    };
  });

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  return (
    <div className="contenedorInicialAsesor">
      <div className="primeraFila">
        <div className="cicloCb">
          <p>Ciclo:</p>
          <div className="SelectCiclo">
            <Combobox
              onChange={handleSemesterChange}
              value={selectedSemester}
              dataKey="id"
              textField="abbreviation"
              data={semestreLista}
            />
          </div>
        </div>
        <div className="tesisCb">
          <p>Curso:</p>
          <div className="SelectTesis">
            <Combobox
              onChange={handleCourseChange}
              value={selectedCourse}
              dataKey="id"
              textField="name"
              data={comboCourseList}
            />
          </div>
        </div>
      </div>

      <div className="segundaFila">
        <div className="subtituloSegundaFila">
          <p>Ingrese nombre de alumno:</p>
        </div>
        <div className="botonNombre">
          <input
            type="text"
            placeholder="Ingrese un nombre..."
            onChange={inputNameHandler}
          ></input>
          <button className="busquedaNombre">
            <i class="bi bi-search" />
          </button>
        </div>
      </div>

      <div className="zonaBotones">
        {!isLoading ? (
          studentList && studentList.length > 0 ? (
            studentList
              // .slice(
              //   (pagina - 1) * porPagina,
              //   (pagina - 1) * porPagina + porPagina
              // )
              .map((student, index) => {
                //console.log(student);
                return (
                  <div key={index} className="espaciadoZona">
                    {/* {console.log(student)} */}
                    <AdviserBt
                      student={student}
                      course={selectedCourse}
                      valor={2}
                    />
                  </div>
                );
              })
          ) : (
            <div className="no-alumn">No hay alumnos.</div>
          )
        ) : (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        )}
      </div>
      <div className="contenedorBotoneriaEntregable">
        {studentList.length>0? <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} isLoading={isLoading}
        onClickHandler={getStudentList}
        />: null}
      </div>
    </div>
  );
}
