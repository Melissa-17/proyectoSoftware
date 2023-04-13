import React, { useEffect, useState } from "react";
import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";
import ThirdPart from "./ThirdPart";
import { useNavigate } from "react-router";
import "../../../../assets/styles/Teacher/Timeline/EditPart/Cambio.css";
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import esLocale from "date-fns/esm/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { axiosModifyAssignment } from "../../../../api/AssignmentStudent";
import ModalsAlert from "../../../Modals/ModalsAlert";
import { capitalize } from "#Helpers/stringHelpers.js";
import { axiosGetRole } from "#API/Role.js";
import { formatDate } from "#Helpers/assignmentHelpers.js";
import moment from "moment";

export default function Cambio({
  num,
  numero,
  cxsid,
  id,
  mensajeConfirmado,
  entregable,
}) {
  const JWTtoken = sessionStorage.getItem("token");
  const navigate = useNavigate();



  const retrocesoClic = () => {
    if (numero == 1) {
      navigate("/timeline", {
        state: {
          cxsid: cxsid,
        },
      });
    } else {
      if (numero == 2) {
        navigate(`/timeline/detail/${num}`, {
          state: {
            cxsid: cxsid,
            id: id,
          },
        });
      }
    }
  };

  const [taskList, setTaskList] = useState([]);
  // console.log(entregable);

  const handleAddTask = () => {
    setTaskList([...taskList, { name: "Vacio" }]);
  };

  const [asesorValor, setAsesorValor] = useState(false);
  const [juradoValor, setJuradoValor] = useState(false);
  const [profesorValor, setProfesorValor] = useState(false);
  const [coordinadorValor, setCoordinadorValor] = useState(false);

  useEffect(() => {
    entregable && entregable.ASSIGNMENT_TASKs
      ? setTaskList([
          ...taskList,
          ...entregable.ASSIGNMENT_TASKs.map((entrega, index) => {
            return entrega.name;
          }),
        ])
      : (() => {})();
    document.querySelector(".selectAssignType").value = entregable.type;
    // console.log(entregable.ASSIGNMENT_X_ROLEs);

    entregable && entregable.ASSIGNMENT_X_ROLEs
      ? entregable.ASSIGNMENT_X_ROLEs.map((roles, index) => {
          if(roles.name=="Evaluador"){
            if(roles.ROLE.description == "Profesor") setProfesorValor(true);
            else if(roles.ROLE.description=="Asesor") setAsesorValor(true);
            else if(roles.ROLE.description=="Jurado") setJuradoValor(true);
            else if(roles.ROLE.description=="Coordinador") setCoordinadorValor(true);
          }
        })
      : (() => {})();
  }, []);
  // console.log(asesorValor);

  const handleDeleteTask = (taskId) => {
    const taskListCopy = [...taskList];
    taskListCopy.splice(taskId, 1);
    setTaskList(taskListCopy);
  };

  const [fechaSeleccionadaInicio, setFechaSeleccionadaInicio] = useState(
    new Date()
  );
  const [fechaHoraSeleccionadaInicio, setFechaHoraSeleccionadaInicio] =
    useState(new Date());

  //Modales
  const [confirmation, setConfirmation] = useState(false);

  //variables para editar
  const [aName, setAName] = useState("");
  const [cName, setCName] = useState("");
  const [sDate, setSDate] = useState(entregable.startDate);
  const [eDate, setEDate] = useState(entregable.endDate);
  const [cmDate, setCmDate] = useState(entregable.limitCompleteDate);
  const [clDate, setClDate] = useState(entregable.limitCalificationDate);
  const [rDate, setRDate] = useState(entregable.limitRepositoryUploadDate);
  const [responsables, setResponsables] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [assignDetail, setAssignDetail] = useState([]);


  const[asesorSelected, setAsesorSelected] = useState(false);
  const[juradoSelected, setJuradoSelected] = useState(false);
  const[profesorSelected, setProfesorSelected] = useState(false);
  const[coordinadorSelected, setCoordinadorSelected] = useState(false);
  

  //Modificacion en las variables
  let handleANameChange = (e) => {
    const nombre = e.target.value;
    if (nombre != "") setAName(nombre);
    else setAName(entregable.assignmentName);
  };

  // useEffect(()=>{
  //   console.log(rDate);
  // },)

  // console.log(juradoValor);

  const checkboxRoleList = (roleList, type) => {
    return roleList.map((role, index) => {
      return (
        <div className="checkBoxContenedorCambio">
          <input
            className={`${type}-checkbox`}
            type="checkbox"
            value={role.id}
            defaultChecked={role.description=="Profesor"?profesorValor:
            role.description=="Asesor"?asesorValor:
            role.description=="Jurado"?juradoValor:
            role.description=="Coordinador"?coordinadorValor:false}
            onChange={()=>{
              if(role.description=="Profesor"){
                if(profesorValor==true) setProfesorValor(false);
                else if(profesorValor==false) setProfesorValor(true);
              }else{
                if(role.description=="Asesor"){
                  if(asesorValor==true) setAsesorValor(false);
                  else if(asesorValor==false) setAsesorValor(true);
                }else{
                  if(role.description=="Jurado"){
                    if(juradoValor==true) setJuradoValor(false);
                    else if(juradoValor==false) setJuradoValor(true);
                  }else{
                    if(role.description=="Coordinador"){
                      if(coordinadorValor==true) setCoordinadorValor(false);
                      else if(coordinadorValor==false) setCoordinadorValor(true);
                    }
                  }
                }
              }
            }}
          />
          <p className="descripcion">{`${capitalize(role.description)}`}</p>
        </div>
      );
    });
  };

  const getRoleList = () => {
    axiosGetRole(JWTtoken)
      .then((response) => {
        const data = response.data || "";
        // console.log(data);
        const newList = data.filter(
          (role) =>
            !["Administrador", "Usuario", "Alumno"].includes(role.description)
        );
        setRoleList(newList);
      })
      .catch((error) => {
        console.error(`Error getRoleList: ${error}`);
      });
  };

  useEffect(() => {
    getRoleList();
  }, []);

  // const getAssignDetail = () => {
  //   axiosGetDetailAssignment(JWTtoken, id)
  //     .then((response) => {
  //       const data = response.data || "";
  //       console.log(data);
  //       setAssignDetail(data);
  //       // console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(`Error Final Assign Detail: ${error}`);
  //     });
  // };

  // useEffect(() => {
  //   getAssignDetail();
  // }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const assignmentName = document.querySelector('.assignmentNameEditTimeline').value==""?
    entregable && entregable.assignmentName? entregable.assignmentName:""
    :document.querySelector('.assignmentNameEditTimeline').value;

    const chapterName = document.querySelector('.chapterNameEditTimeline').value==""?
    entregable && entregable.chapterName? entregable.chapterName:""
    :document.querySelector('.chapterNameEditTimeline').value;

    const responsableList = Array.from(
      document.querySelectorAll(`.responsable-checkbox[type=checkbox]:checked`)
    ).map((item, index) => {
      return item.value;
    });

    const taskListValue = taskList.map((task, index) => {
      const taskValue = document.querySelector(`.task-${index}`).value;
      return taskValue;
    });

    const assignmentType = document.querySelector(".selectAssignType").value;

    const body = {
      idA: id,
      aName: assignmentName,
      cName: chapterName,
      sDate: sDate,
      eDate: eDate,
      cmDate: cmDate,
      clDate: clDate,
      rDate: rDate,
      type: assignmentType,
      idCXS: cxsid,
      tasks: taskListValue,
      responsables: responsableList,
    };

    // console.log(responsableList);

    axiosModifyAssignment(JWTtoken,body)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(`Error: ${error}`);
    })
    // setConfirmation(false);
    mensajeConfirmado(true);
  };

  return (
    <form
      id="editAssignmentTimeline"
      className="editAssignmentTimeline"
      method="patch"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="infoGeneralEditPart">
        {/* {funcionInicio()} */}
        <div className="contenedorColumnasInfoGeneralEditPart">
          <div className="contenedorPrimeraColumnaInfoGeneralEditPart">
            <div className="contenedorNombre">
              <p>Nombre</p>
              {/* {console.log(entregable)} */}
              <input
                type="text"
                placeholder="Semana 3"
                defaultValue={
                  entregable && entregable.assignmentName
                    ? entregable.assignmentName
                    : ""
                }
                className="assignmentNameEditTimeline"
                onChange={handleANameChange}
              />
            </div>
            <div className="nombreEntregable">
              <p>Nombre del N° Entregable</p>
              <input
                type="text"
                placeholder="Entregable Parcial 1.3"
                defaultValue={
                  entregable && entregable.chapterName
                    ? entregable.chapterName
                    : ""
                }
                className="chapterNameEditTimeline"
              />
            </div>
          </div>
          {/* {console.log(roleList)} */}
          <div className="contenedorSegundaColumnaInfoGeneralEditPart">
            <p className="responsable">Responsable(s)</p>
            {checkboxRoleList(roleList, "responsable")}
          </div>
        </div>
      </div>

      <div className="EntregableEditPart">
        <div className="EntregableEditPart">
          <div className="primeraColumnaEntregableEditPart">
            <div className="entregablelineEntregableEditPart">
              <p>Entregable</p>
              <button className="botonEntregablePlusEditPart"
              type="button"
              >
                <i class="bi bi-plus" onClick={handleAddTask} />
              </button>
            </div>

            <div className="filaEntregableEditPart">
              {taskList.map((task, index) => {
                return (
                  <div className="taskEditPart" key={index}>
                    <input
                      type="text"
                      placeholder="Entregable 1"
                      defaultValue={task && task.name != "Vacio" ? task : ""}
                      className={`task-${index}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(index)}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="segundaColumnaSecondPart">
            <p>Tipo de Entregable</p>
            <select className="selectAssignType">
              <option value="PARTIAL ASSIGN">Entregable Parcial</option>
              <option value="FINAL ASSIGN">Entregable Final</option>
              <option value="EXPOSITION">Exposición</option>
              <option value="ADVANCE">Avance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="ThirdPart">
        <div className="contenedorThirdPart">
          <div className="contenedorPrimeraColumnaThirdPart">
            <p className="fechaInicio">Fecha de inicio</p>
            {/* {console.log(formatDate(entregable.limitCompleteDate,"DD/MM/yyyy"))} */}
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <DatePicker
                value={sDate}
                onChange={setSDate}
                format="dd/MM/yyyy"
                className="fecha"
              />
            </MuiPickersUtilsProvider>
            <p className="fechaSubida">Fecha de subida al repositorio</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <DateTimePicker
                value={rDate}
                onChange={setRDate}
                format="dd/MM/yyyy hh:mm"
                className="fechahora"
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className="contenedorSegundaColumnaThirdPart">
            <div className="contenedorPrimeraColumnaThirdPart">
              <p className="fechaInicio">Fecha de fin</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <DatePicker
                  value={eDate}
                  onChange={setEDate}
                  format="dd/MM/yyyy"
                  className="fecha"
                />
              </MuiPickersUtilsProvider>
              <p className="fechaSubida">Fecha límite de envío</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <DateTimePicker
                  value={cmDate}
                  onChange={setCmDate}
                  format="dd/MM/yyyy hh:mm"
                  className="fechahora"
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="contenedorTerceraColumnaThirdPart">
            <p className="fechaInicio">Fecha límite de calificación</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <DateTimePicker
                value={clDate}
                onChange={setClDate}
                format="dd/MM/yyyy hh:mm"
                className="fechahora"
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>

      <div className="botoneriaEditPart">
        <button className="cancelar" onClick={retrocesoClic} type="button">
          Cancelar
        </button>
        <button
          className="guardar"
          // onClick={()=>setConfirmation(true)}
          // onClick={() => {

          // }}
          form="editAssignmentTimeline"
          type="submit"
        >
          Guardar
        </button>
      </div>
      {/* {
        confirmation && <ModalsAlert closeAlert = {setConfirmation}
        alertText='¿Desea guardar todas las modificaciones?'
        action={editarAssignment}/>
      } */}
    </form>
  );
}
