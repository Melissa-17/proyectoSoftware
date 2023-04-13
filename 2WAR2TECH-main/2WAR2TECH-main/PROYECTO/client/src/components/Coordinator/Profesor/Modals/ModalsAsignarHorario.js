import React, { useEffect, useState } from "react";
import { axiosGetCoursesBySpecialty } from "#API/Cursos";
import { axiosListAllSemesters } from "#API/Semestres";
import { axiosGetSchedule } from "#API/horario";
import { axiosAddTeacherSchedule } from "../../../../api/User";
import ModalValidacion from "../../../Admin/Semester/ModalValidacion";

function ModalsAsignarHorario(props) {
  const { closeMessage, modalMessage, coordinadorItem, modalMessage2} = props;
  const [semestreList, setSemestreList] = useState(null);
  const [cursoList, setCursoList] = useState(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(99999);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(99999);
  const JWTtoken = sessionStorage.getItem("token");
  const [horarioList, setHorarioList] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(-1);

  const [validacionHorario, setValidacionHorario] = useState(false);

  const getSemestreList = () => {
    axiosListAllSemesters(JWTtoken)
      .then((response) => {
        const listOne = response.data || [];
        // console.log(response.data);
        setSemestreList(listOne);
        setSemestreSeleccionado(listOne.length ? listOne[0].id : -1);
        // else setSemestreSeleccionado(9999999);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  

  const getCursoList = () => {
    axiosGetCoursesBySpecialty(JWTtoken)
      .then((response) => {
        const list = response.data || [];
        setCursoList(list);
        setCursoSeleccionado(list.length ? list[0].id : 9999);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  

  const handleChangeTwo = (e) => {
    var a = document.getElementById("seleccionModalAsignarFacultad").value;
    setSemestreSeleccionado(a);
    // console.log(a);
  };

  const handleChangeOne = (e) => {
    var a = document.getElementById("seleccionModalAsignarCurso").value;
    setCursoSeleccionado(a);
    // console.log(cursoSeleccionado);
  };
  const handleChangeThree = (e) => {
    var a = document.getElementById("seleccionModalAsignarHorario").value;
    setHorarioSeleccionado(a);
    // console.log(a);
  };

  const getHorariosList = () => {
    axiosGetSchedule(JWTtoken, cursoSeleccionado, semestreSeleccionado)
      .then((response) => {
        const list = response.data.rows || [];
        setHorarioList(list);
        if(list.length>0) setHorarioSeleccionado(list[0].id);
        else setHorarioSeleccionado(99999);
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
  
  useEffect(() => {
    getHorariosList();
  }, [cursoSeleccionado, semestreSeleccionado]);

  return (
    <div className="modalAlertBackground">
      <div className="modalAsignarContainer"
      style={{height:"330px"}}
      >
        <div className="headerAsignarContainer">
          <div className="primeraFilaHeaderAsignarContainer">
            <p>Asignar Horario</p>
            <button
              className="salirModalNuevaFacultad"
              //   type="button"
              onClick={() => {
                closeMessage(false);
              }}
            >
              <i class="bi bi-x-lg" />
            </button>
          </div>
          <hr color="black" className="lineaHorizontalNuevaFacultad" />
        </div>
       
        <div className="contenedorFacultadEspecialidad">
          <p>Semestre:</p>
          <select
            className="seleccionModalAsignarFacultad"
            id="seleccionModalAsignarFacultad"
            onChange={handleChangeTwo}
          >
            {semestreList
              ? semestreList.map((semestreItem, index) => {
                  return (
                    <option value={semestreItem.id}>{semestreItem.abbreviation}</option>
                  );
                })
              : null}
          </select>
        </div>

        <div className="contenedorEspecialidadEspecialidad">
          <p>Curso:</p>
          <select
            className="seleccionModalAsignarCurso"
            id="seleccionModalAsignarCurso"
            onChange={handleChangeOne}
          >
            {cursoList && cursoList.length>0
              ? cursoList.map((cursoItem, index) => {
                  return (
                    <option value={cursoItem.id}>{cursoItem.name}</option>
                  );
                })
              : <option>No tiene cursos asignados</option>}
          </select>
        </div>

        <div className="contenedorFacultadEspecialidad"
        style={{marginTop:"10px"}}
        >
          <p>Horario:</p>
          <select
            className="seleccionModalAsignarHorario"
            id="seleccionModalAsignarHorario"
            onChange={handleChangeThree}
          >
            {horarioList && horarioList.length>0
              ? horarioList.map((horarioItem, index) => {
                  return (
                    <option value={horarioItem.id}>
                      {horarioItem.abbreviation ? horarioItem.abbreviation:"No tiene nombre"}
                      {/* {console.log(horarioItem)} */}
                    </option>
                  );
                })
              : <option>No tiene horario asignado</option>}
          </select>
        </div>

        <div className="botoneriaAsignarEspecialidad">
          <button
            className="cancelar"
            onClick={() => {
              closeMessage(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="guardar"
            onClick={() => {
              const commentFormData = {
                profesorId:coordinadorItem.id,
                courseXsemesterId:horarioSeleccionado
              };
              // console.log(coordinadorItem.id);
              if(horarioSeleccionado==-1) setValidacionHorario(true);
              else{
                axiosAddTeacherSchedule(JWTtoken, commentFormData)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.error(err);
                });
                closeMessage(false);
                modalMessage2(true);
                modalMessage ? modalMessage(true) : (() => {})();
              }

              // console.log(especialidadSeleccionado);
            }}
          >
            Guardar
          </button>
        </div>
        
        <div>
          {validacionHorario && <ModalValidacion 
          closeMessage={setValidacionHorario}
          message="Debe seleccionar un horario existente"
          />}
        </div>
      </div>
    </div>
  );
}

export default ModalsAsignarHorario