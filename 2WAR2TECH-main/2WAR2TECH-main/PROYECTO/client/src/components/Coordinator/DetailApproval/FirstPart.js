import React, { useEffect, useState } from "react";
import "../../../assets/styles/Coordinador/DetailApproval/FirstPart.css";
import { capitalize } from "#Helpers/stringHelpers";
import { Buffer } from "buffer";
import { axiosPatchThesis } from "#API/Thesis";
import ModalComment from "../ModalsApproval/ModalComment";
import ModalAsesor from "./ModalAsesor";
import ModalMensaje from "./ModalMensaje";
import ModalsAlert from "./ModalsAlert";
import ModalStudentList from "../../Adviser/ThesisThemes/RequestFiles/ModalStudentList";

export default function FirstPart(props) {
  const JWTtoken = sessionStorage.getItem("token");
  const { setnuevoEstado,openCommentModal, setOpenCommentModal, cambio, setCambio, thesisData,
 setModalMensaje, setModalMensajeAlumno,
 modalAsesor, setModalAsesor, modalAlumno, setModalAlumno,
 modalMensaje2, setModalMensaje2, modalMensajeAlumno2, setModalMensajeAlumno2,
 modalAlerta, setModalAlerta, modalConfirmacion, setModalConfirmacion,
 modalAlertaAlumno, setModalAlertaAlumno, modalConfirmacionAlumno, setModalConfirmacionAlumno

 } = props;

 const [modalLista, setModalLista] = useState(false);


  const patchThesis = (accion) => {
    const body = {
      thesisId: props.thesis.id,
      status: accion,
      originalStatus: props.thesis.status,
    };

    axiosPatchThesis(JWTtoken, body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // console.log(props)
  const icono = () => {
    if (props.thesis.status == "APROBADO")
      return (
        <div className="iconoCheckFirstPart">
          {" "}
          <i className="bi bi-check-circle-fill"></i>{" "}
        </div>
      );
    else if (props.thesis.status == "EN OBSERVACIÓN")
      return (
        <div className="iconoEyeFirstPart">
          {" "}
          <i className="bi bi-eye-fill"></i>{" "}
        </div>
      );
    else if (props.thesis.status == "PENDIENTE")
      return (
        <div className="iconoClockFirstPart">
          {" "}
          <i className="bi bi-clock-fill"></i>{" "}
        </div>
      );
  };
  // console.log(JWTtoken);
  const tituloIcono = () => {
    if (props.thesis.status == "APROBADO") return "Aprobado";
    else if (props.thesis.status == "EN OBSERVACIÓN") return "En Observación";
    else if (props.thesis.status == "PENDIENTE") return "Pendiente";
  };
  const espaciadoIcono = () => {
    if (props.thesis.status == "APROBADO")
      return "contenedorAprobadoEstadoFirstPart";
    else if (props.thesis.status == "EN OBSERVACIÓN")
      return "contenedorObservacionEstadoFirstPart";
    else if (props.thesis.status == "PENDIENTE")
      return "contenedorPendienteEstadoFirstPart";
  };

  const usuarios = props.thesis.USERs.filter((usuario) => {
    return (usuario.USER_X_THESIS.type == "ASESOR" || usuario.USER_X_THESIS.type == "ASESOR_POSTULANT")
  });
  const alumnos = props.thesis.USERs.filter((usuario) => {
    if (props.thesis.status == "APROBADO" || props.thesis.status == "SUSTENTADA")
      return usuario.USER_X_THESIS.type == "OWNER";
    if (props.thesis.status == "EN OBSERVACIÓN" || props.thesis.status == "PENDIENTE")
    return usuario.USER_X_THESIS.type == "STUDENT_POSTULANT";
  });

  // console.log(usuarios);

  const usuario = usuarios[0] ? usuarios[0] : null;
  const alumno = alumnos[0] ? alumnos[0] : null;


  const funcionAlumno = () => {
    if (alumno) {
      return alumnos.length > 1 ?
      (
        <div className="d-flex">
        <div className="detail-team d-flex align-items-center justify-space-around"
        onClick={() => {setModalLista(true)}}
        >
          <i className="bi bi-people-fill mx-4"></i>
          <div className="d-flex flex-column align-items-start">
            <div>Equipo de alumnos</div>
            <div className="fs-6">Presione para ver más</div>
          </div>
        </div>
        <button className="contenedorEliminarAlumnoTemaTesis"
          onClick={()=>{setModalAlertaAlumno(true);}}
          >
            <i class="bi bi-dash-circle"></i>
          </button>
        </div>
      )
      :
      (
        <div className="alumnoFirstPart">
          <div className="alumnoFotoFirstPart">
            {alumno.photo ? (
              <img
                className="imagenPersona"
                src={`data:image/png;base64,${Buffer.from(
                  alumno.photo.data
                ).toString("base64")}`}
                alt="profile-pic"
              />
            ) : (
              <img
                className="imagenPersona"
                src="https://wallpapercave.com/uwp/uwp2417748.png"
                alt="foto asesor"
              />
            )}
          </div>
          <p>{alumno.name + " " + alumno.fLastName + " " + alumno.mLastName}</p>
          <button className="contenedorEliminarAlumnoTemaTesis"
          onClick={()=>{setModalAlertaAlumno(true);}}
          >
            <i class="bi bi-dash-circle"></i>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="botonAddAlumno"
          onClick={()=>{setModalAlumno(true);}}
          >
            <i class="bi bi-person-plus-fill"></i>
          </button>
          <p>No cuenta con alumno registrado</p>
          <p className="fs-6">Presione el ícono para agregar un alumno</p>
        </div>
      );
    }
  };

  const funcionBtn = () => {
    if (props.thesis.status == "PENDIENTE") {
      return (
        <div className="btnContainer">
          <button
            className="btns"
            onClick={() => {
              setnuevoEstado("APROBADO");
              setCambio(!cambio);
            }}
          >
            Aceptar
          </button>
          <button
            className="btns"
            onClick={() => {
              setnuevoEstado("EN OBSERVACIÓN");
              setCambio(!cambio);
              setOpenCommentModal(true);
            }}
          >
            Observar{" "}
          </button>
        </div>
      );
    } else if (props.thesis.status == "EN OBSERVACIÓN") {
      return (
        <div className="btnContainer">
          <button
            className="btns"
            onClick={() => {
              setnuevoEstado("APROBADO");
              setCambio(!cambio);
            }}
          >
            Aceptar
          </button>
          <button
            className="btns"
            onClick={() => {
              setnuevoEstado("PENDIENTE");
              setCambio(!cambio);
            }}
          >
            Pendiente{" "}
          </button>
        </div>
      );
    } else if (props.thesis.status == "APROBADO") {
      return (
        <div className="btnContainer">
          <button
            className="btns"
            onClick={() => {
              setnuevoEstado("EN OBSERVACIÓN");
              setCambio(!cambio);
              setOpenCommentModal(true);
            }}
          >
            Observar{" "}
          </button>
          <button
            className="btns"
            onClick={() => {

              setnuevoEstado("PENDIENTE");
              setCambio(!cambio);
            }}
          >
            Pendiente
          </button>
        </div>
      );
    }
  };

  // console.log(props.thesis);

  return (
    <div className="contenedorFirstPart">
      {/* {console.log(props.thesis)} */}
      <div className="primeraColumna">
        <div className="ContenedorTemaTesis">
          <h5>Tema de tesis:</h5>
          <div className="contenedorTemaTesisFirstPart">
            <p>
              {props.thesis.title
                ? capitalize(props.thesis.title)
                : "No hay titulo"}
            </p>
          </div>
        </div>
        <div className="Objetivo">
          <h5>Area:</h5>
          <div className="contenedorAreaTesisFirstPart">
            <p>
              {props.thesis.areaName
                ? capitalize(props.thesis.areaName)
                : "No hay area"}
            </p>
          </div>
        </div>
        <div className="Objetivo">
          <h5>Objetivo:</h5>
          <div className="contenedorObjetivoTesisFirstPart">
            <p>
              {props.thesis.objective
                ? capitalize(props.thesis.objective)
                : "No hay objetivo"}
            </p>
          </div>
        </div>
      </div>
      <div className="segundaColumna">
        <div className="contenedorAsesorFirstPart">
          <h5>Asesor:</h5>
          <div className="contenedorInfoAsesorFirstPart">
            {usuario?
              usuario.photo ?
              (
                <img
                  className="imagenPersona"
                  src={`data:image/png;base64,${Buffer.from(
                    usuario.photo.data
                  ).toString("base64")}`}
                  alt="profile-pic"
                />
              ):
              (
                <img
                  className="img-asesor"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="foto asesor"
                />
              ):
              (
                <button className="botonAddAsesor"
                onClick={()=>{setModalAsesor(true);}}
                >
                  <i class="bi bi-person-plus-fill"></i>
                </button>
              )
          }
            <div className="contenedorTituloAsesorFirstPart">
              <div className="contenedorNombreAsesorFirstPart">
                <p className="nombreTituloAsesorFirstPart">
                  {usuario
                    ? usuario.name +
                      " " +
                      usuario.fLastName +
                      " " +
                      usuario.mLastName
                    : "NO HAY ASESOR"}
                </p>
                {
                  !usuario ? 
                  null 
                  :
                  <button className="eliminarAsesor"
                onClick={()=>{
                  setModalAlerta(true);
                }}
                >
                  <i class="bi bi-dash-circle"></i>
                </button>
                
                }
              </div>
              <p className="areaTituloAsesorFirstPart"></p>
            </div>
          </div>
        </div>
        <div className="contenedorAlumnoFirstPart">
          <h5>Alumno/Equipo:</h5>
          <div className="contenedorInfoAlumnoFirstPart">{funcionAlumno()}</div>
        </div>
        <div className="contenedorEstadoFirstPart">
          <h5>Estado:</h5>
          <div className="contenedorInfoEstadoFirstPart">
            <p className={espaciadoIcono()}>{tituloIcono()}</p>
            <div>{icono()}</div>
          </div>
        </div>
        <div className="btnContainer">{funcionBtn()}</div>
      </div>
        {/* {openCommentModal && (
          <ModalComment
            closeMessage={setOpenCommentModal}
            patchThesis={patchThesis}
            thesisId={props.thesis.id}
            update={setCambio(!cambio)}
          />
        )} */}
      {modalAsesor && <ModalAsesor 
      closeMessage={setModalAsesor}
      option={1} thesisData={thesisData}
      modalMensaje={setModalMensaje}
      modalMensaje2={setModalMensaje2}
      modalMensajeAlumno={setModalMensajeAlumno}
      modalMensajeAlumno2={setModalMensajeAlumno2}
      />}
      {modalAlumno && <ModalAsesor 
      closeMessage={setModalAlumno}
      option={2} thesisData={thesisData} 
      modalMensajeAlumno={setModalMensajeAlumno2}
      modalMensajeAlumno2={setModalMensajeAlumno}
      />}
      {modalMensaje2 && <ModalMensaje 
      message="Se ha añadido correctamente el asesor"
      closeMessage={setModalMensaje2}
      closeMessage2={setModalMensaje}
      otroModal={setModalAsesor}
      />}
      {modalMensajeAlumno2 && <ModalMensaje 
      message="Se ha añadido correctamente el alumno"
      closeMessage={setModalMensajeAlumno2}
      closeMessage2={setModalAlumno}
      otroModal={setModalAsesor}
      />}
      {modalAlerta && <ModalsAlert 
      closeAlert={setModalAlerta} modalMessage={setModalConfirmacion}
      alertText="¿Seguro que quiere desvincular al asesor?"
      thesisData={thesisData} usuario={usuario} option={1}
      />}
      {modalConfirmacion && <ModalMensaje 
      closeMessage={setModalConfirmacion}
      message="Se ha desvinculado correctamente al asesor"
      />}
      {modalAlertaAlumno && <ModalsAlert 
      closeAlert={setModalAlertaAlumno} modalMessage={setModalConfirmacionAlumno}
      alertText="¿Seguro que quiere eliminar al alumno?"
      thesisData={thesisData} usuarios={alumnos} option={2}
      />}
      {modalConfirmacionAlumno && <ModalMensaje 
      closeMessage={setModalConfirmacionAlumno}
      message="Se ha eliminado correctamente al alumno"
      />}
    </div>
  );
}
