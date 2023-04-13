import React, {useEffect, useState} from "react";
import "./ModalsComplete.css";
import { MuiPickersUtilsProvider, DatePicker, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/esm/locale/es';
import { axiosGetRole } from "#API/Role.js";
import { capitalize } from "#Helpers/stringHelpers.js";
import { axiosPostAssignment } from "#API/AssignmentStudent";
import { useLocation } from "react-router";

export default function ModalsComplete({ content, exit, modalConfirmacionMensaje, setLoadCreate }) {
    const JWTtoken = sessionStorage.getItem("token");
    // const [habilitado, setHabilitado] = useState(true);
    const [roleList, setRoleList] = useState([]);
    const [fechaSeleccionadaInicio, setFechaSeleccionadaInicio] = useState(new Date());
    const [fechaSeleccionadaFin, setFechaSeleccionadaFin] = useState(new Date());
    const [fechaLimiteEnvio, setFechaLimiteEnvio] = useState(new Date());
    const [fechaLimiteCalificacion, setFechaLimiteCalificacion] = useState(new Date());
    const [fechaPublicacionRepositorio, setFechaPublicacionRepositorio] = useState(new Date());
    const [taskList, setTaskList] = useState([{}]);
    const { cxsid } = useLocation().state;

    const getRoleList = () => {
        axiosGetRole(JWTtoken)
          .then((response) => {
            const data = response.data || "";
            
            const newList = data.filter(role => !["Administrador", "Usuario", "Alumno", "Coordinador"].includes(role.description))
            setRoleList(newList);
            
          })
          .catch((error) => {
            console.error(`Error getRoleList: ${error}`);
          });
      };
    
    useEffect(() => {
        getRoleList();
    }, []);

  const guardarCambios = () => {
    exit(false);
  };

  const handleAddTask = () => {
    setTaskList([...taskList, 
        {}
    ])
  }

  const handleDeleteTask = (taskId) => {
    const taskListCopy = [...taskList];
    taskListCopy.splice(taskId,1);
    setTaskList(taskListCopy);
  }

  const checkboxRoleList = (roleList, type) => {
    return roleList.map((role, index) => { 
        return (
            <div>
                <label>
                    <input 
                        className={`${type}-checkbox`}
                        type="checkbox" 
                        value={role.id}
                    /> 
                    {`  ${capitalize(role.description)}`}
                </label>
            </div>
        )
    })
  }

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    setLoadCreate(true);

    

    const revisorList = Array.from(document.querySelectorAll(`.revisor-checkbox[type=checkbox]:checked`))
        .map((item, index) => {
            return item.value
        });
    
    const evaluadorList = Array.from(document.querySelectorAll(`.evaluador-checkbox[type=checkbox]:checked`))
        .map((item, index) => {
            return item.value
        });
    
    const responsableList = Array.from(document.querySelectorAll(`.responsable-checkbox[type=checkbox]:checked`))
        .map((item, index) => {
            return item.value
        });

    const chapterName = document.querySelector('#chapterName').value;
    const assignmentName = document.querySelector('#assignmentName').value;
    const taskListValue = taskList.map((task, index) => {
        const taskValue = document.querySelector(`.task-${index}`).value;
        return taskValue;
    })

    const assignmentType = document.querySelector('.assignment-type').value;


    const assignmentData = {
        "aName": assignmentName, 
        "cName": chapterName,
        "sDate": fechaSeleccionadaInicio,
        "eDate": fechaSeleccionadaFin,
        "cmDate": fechaLimiteEnvio,
        "clDate": fechaLimiteCalificacion,
        "rDate": fechaPublicacionRepositorio,
        "type": assignmentType,
        "aComments": "",
        "idCXS": cxsid,
        "tasks": taskListValue,
        "revisor": [5],
        "evaluador": evaluadorList,
        "responsable": [3]
      }

    //   console.log(assignmentData);

      axiosPostAssignment(JWTtoken, assignmentData)
      .then((res) => {
        console.log(res);
        setLoadCreate(false);
        modalConfirmacionMensaje(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <form
        id="assignment-form"
        className="assignment-form"
        method="post"
        onSubmit={handleAssignmentSubmit}
    > 
        <div className="contenedorNuevoEntregableModalsComplete">
        <div className="contendorModalsComplete">
            <div className="contenedorHeaderModalsComplete">
                <p>Nuevo Entregable</p>
                <button onClick={() => {exit(false);}}>
                    <i class="bi bi-x-lg" />
                </button>
            </div>

            <div>
                <hr color="black" className="lineaModalsComplete" />
            </div>

            <div className="contenedorCompleteDatosModalsComplete">
                <p>Complete los datos del nuevo entregable</p>
            </div>

            <div>
                <hr color="black" className="lineaModalsComplete" />
            </div>
            
            <div className="primerCompleteModalsComplete">
                <label htmlFor="chapterName">
                    Nombre del capitulo
                </label>
                <input 
                    type="text" placeholder="Unidad 01: Conceptos generales" 
                    id="chapterName" name="chapterName"
                />
            </div>

            <div className="segundoCompleteModalsComplete">
                <label htmlFor="assignmentName">
                    Nombre del N° Entregable
                </label>
                <input type="text" placeholder="Entregable Parcial 1.1"
                    id="assignmentName" name="assignmentName"
                />
            </div>

            <div className="terceraCompleteModalsComplete">
                <div className="agregarModalsComplete">
                    <p>Nombre Entregable (s)</p>
                    <button type="button" onClick={handleAddTask}>
                        <i className="bi bi-plus" />
                    </button>
                </div>
                <div className="task-list">
                    {taskList.map((task, index) => {
                        return (
                        <div className="task" key={index}>
                            <input 
                            type="text" placeholder="Entregable Parcial 1.1" 
                            className={`task-${index}`}/>
                            <button type="button" onClick={() => handleDeleteTask(index)}>
                                <i className="bi bi-trash" />
                            </button>
                        </div>
                        )
                    })}
                </div>
            </div>

            <div className="contenedorColumnasModalsComplete">
                <div className="primeraColumnaModalsComplete">
                    <div className="fechaInicio">
                        <p>Fecha inicio</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                            <DatePicker value={fechaSeleccionadaInicio} onChange={(e) => setFechaSeleccionadaInicio(e)} 
                            format="dd/MM/yyyy" />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="fechafin">
                        <p>Fecha fin</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                            <DatePicker value={fechaSeleccionadaFin} onChange={(e) => setFechaSeleccionadaFin(e)} 
                            format="dd/MM/yyyy" />
                        </MuiPickersUtilsProvider>
                    </div>
                    {/* <div className="revisorModalsComplete">
                        <p>Revisor (es)</p>
                        {checkboxRoleList(roleList, "revisor")}
                    </div> */}
                    <div className="revisorModalsComplete">
                        <p>Evaluador (es)</p>
                        {checkboxRoleList(roleList, "evaluador")}
                    </div>
                </div>
                <div className="segundaColumnaModalsComplete">
                    <p className="tipoModalsComplete">Tipo de Entregable</p>
                    <select className="selectModalsComplete assignment-type">
                        <option value="PARTIAL ASSIGN">Entregable Parcial</option>
                        <option value="FINAL ASSIGN">Entregable Final</option>
                        <option value="EXPOSITION">Exposición</option>
                        <option value="ADVANCE">Avance</option>
                    </select>
                    <div className="fechaHoraModalsComplete">
                        <p>Fecha y hora límite de envío</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                            <DateTimePicker value={fechaLimiteEnvio} onChange={(e) => setFechaLimiteEnvio(e)} 
                            format="dd/MM/yyyy hh:mm" className="fechaHora"/>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="fechaHoraModalsComplete">
                        <p>Fecha y hora límite de calificación</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                            <DateTimePicker value={fechaLimiteCalificacion} onChange={(e) => setFechaLimiteCalificacion(e)} 
                            format="dd/MM/yyyy hh:mm" className="fechaHora"/>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="fechaModalsComplete">
                        <p>Fecha Publicación Repositorio</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                            <DatePicker value={fechaPublicacionRepositorio} onChange={(e) => setFechaPublicacionRepositorio(e)} 
                            format="dd/MM/yyyy" className="fecha"/>
                        </MuiPickersUtilsProvider>
                    </div>
                    {/* <div className="revisorModalsComplete">
                        <p>Responsable (es)</p>
                        {checkboxRoleList(roleList, "responsable")}
                    </div> */}
                </div>
            </div>

            <div className="contenedorBotonesModalsComplete">
            <button className="botonCancelarModalsComplete"
                onClick={() => {
                exit(false);
                }}
            >
                Cancelar
            </button>

            <button 
            // onClick={() => {modalConfirmacionMensaje(true);}} 
            className="botonGuardarModalsComplete" 
            form="assignment-form"
            type="submit"
            >
                Aceptar
            </button>

            </div>

        </div>
        </div>
    </form>
  );
}
