import React, { useEffect, useState } from "react";
import "#Styles/Coordinador/DetailApproval/EditDetail/FirstPart.css";
import { capitalize } from "#Helpers/stringHelpers";
import { Buffer } from "buffer";
import { axiosPatchThesis } from "#API/Thesis";
import ModalComment from "../../ModalsApproval/ModalComment";
import ModalAsesor from "../ModalAsesor";
import ModalMensaje from "../ModalMensaje";
import ModalsAlert from "../ModalsAlert";

export default function FirstPart(props) {
  const JWTtoken = sessionStorage.getItem("token");
  const { openCommentModal, setOpenCommentModal, cambio, setCambio, thesisData,
 setModalMensaje, setModalMensajeAlumno } = props;

  const [modalAsesor, setModalAsesor] = useState(false);
  const [modalAlumno, setModalAlumno] = useState(false);

  const [modalMensaje2, setModalMensaje2] = useState(false);
  const [modalMensajeAlumno2, setModalMensajeAlumno2] = useState(false);

  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  const [modalAlertaAlumno, setModalAlertaAlumno] = useState(false);
  const [modalConfirmacionAlumno, setModalConfirmacionAlumno] = useState(false);

  const [nuevoTema, setNuevoTema] = useState(props.thesis.title);

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

  let handleThemeChange = (e) =>{
    setNuevoTema(e.target.value);
    //if(nuevoTema!=)
      props.setNewTheme(nuevoTema);
    // else
    //   props.setNewTheme(props.thesis.title);
    //console.log(nuevoTema);
  }

  let handleObjectiveChange = (e) =>{
    const nuevoObjetivo = e.target.value;
    if(nuevoObjetivo!='')
      props.setNewObjective(nuevoObjetivo);
    else
      props.setNewObjective(props.thesis.objective);
    //console.log(nuevoObjetivo);
  }

  let handleAreaChange = (e) =>{
    const nuevaArea = e.target.value;
    if(nuevaArea!='')
      props.setNewArea(nuevaArea);
    else
      props.setNewArea(props.thesis.areaName);
    //console.log(nuevoObjetivo);
  }

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
 

  const usuarios = props.thesis.USERs.filter((usuario) => {
    return (usuario.USER_X_THESIS.type == "ASESOR" || usuario.USER_X_THESIS.type == "ASESOR_POSTULANT")
  });
  const alumnos = props.thesis.USERs.filter((usuario) => {
    return usuario.USER_X_THESIS.type == "OWNER";
  });

  // console.log(usuarios);

  const usuario = usuarios[0] ? usuarios[0] : null;
  const alumno = alumnos[0] ? alumnos[0] : null;

  const funcionAlumno = () => {
    if (alumno) {
      return (
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
              patchThesis("APROBADO");
              setCambio(!cambio);
            }}
          >
            Aceptar
          </button>
          <button
            className="btns"
            onClick={() => {
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
              patchThesis("APROBADO");
              setCambio(!cambio);
            }}
          >
            Aceptar
          </button>
          <button
            className="btns"
            onClick={() => {
              patchThesis("PENDIENTE");
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
              setOpenCommentModal(true);
            }}
          >
            Observar{" "}
          </button>
          <button
            className="btns"
            onClick={() => {
              patchThesis("PENDIENTE");
              setCambio(!cambio);
            }}
          >
            Pendiente
          </button>
        </div>
      );
    }
  };

  console.log(props.thesis);

  return (
    <div className="contenedorFirstPart">
      {/* {console.log(props.thesis)} */}
      <div className="primeraColumna">
        <div className="ContenedorTemaTesis">
          <h5>Tema de tesis:
            <i class="bi bi-pencil-square fa-1x"></i>
          </h5>
          
          {/* <div className="contenedorTemaTesisFirstPart">
            <p>
              {props.thesis.title
                ? capitalize(props.thesis.title)
                : "No hay titulo"}
            </p>
          </div> */}
          {/*props.setNewTheme(props.thesis.title
                ? capitalize(props.thesis.title)
          : "No hay titulo")*/}
          <input className="contenedorTemaTesisFirstPart"
            // placeholder={props.thesis.title
            //   ? capitalize(props.thesis.title)
            //   : "No hay titulo"} 
            //   onChange={handleThemeChange}
              defaultValue={props.thesis.title
                ? capitalize(props.thesis.title)
                : "No hay titulo"} 
                onChange={handleThemeChange}/>
        </div>
        <div className="Objetivo">
          <h5>Area:</h5>
          {/* <div className="contenedorAreaTesisFirstPart">
            <p>
              {props.thesis.areaName
                ? capitalize(props.thesis.areaName)
                : "No hay area"}
            </p>
          </div> */}
          <input className="contenedorAreaTesisFirstPart"
            // placeholder={props.thesis.title
            //   ? capitalize(props.thesis.title)
            //   : "No hay titulo"} 
            //   onChange={handleThemeChange}
            defaultValue={props.thesis.areaName
                ? capitalize(props.thesis.areaName)
                : "No hay area"}
                onChange={handleAreaChange}/>
        </div>
        <div className="Objetivo">
          <h5>Objetivo:
            <i class="bi bi-pencil-square fa-1x"></i>
          </h5>
          {/*<div className="contenedorObjetivoTesisFirstPart">
            <p>
              {props.thesis.objective
                ? capitalize(props.thesis.objective)
                : "No hay objetivo"}
            </p> 
            </div>*/}
            <input className="contenedorObjetivoTesisFirstPart"
            defaultValue={props.thesis.objective
              ? capitalize(props.thesis.objective)
              : "No hay objetivo"}
              onChange={handleObjectiveChange}/>
          
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
                <button className="eliminarAsesor"
                onClick={()=>{
                  setModalAlerta(true);
                }}
                >
                  <i class="bi bi-dash-circle"></i>
                </button>
              </div>
              <p className="areaTituloAsesorFirstPart"></p>
            </div>
          </div>
        </div>
        <div className="contenedorAlumnoFirstPart">
          <h5>Alumno:</h5>
          <div className="contenedorInfoAlumnoFirstPart">{funcionAlumno()}</div>
        </div>
        {/* <div className="contenedorEstadoFirstPart">
          <h5>Estado:</h5>
          <div className="contenedorInfoEstadoFirstPart">
            <p className={espaciadoIcono()}>{tituloIcono()}</p>
            <div>{icono()}</div>
          </div>
        </div>
        <div className="btnContainer">{funcionBtn()}</div> */}
      </div>
      {openCommentModal && (
        <ModalComment
          closeMessage={setOpenCommentModal}
          patchThesis={patchThesis}
          thesisId={props.thesis.id}
          update={setCambio(!cambio)}
        />
      )}
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
      thesisData={thesisData} usuario={alumno} option={2}
      />}
      {modalConfirmacionAlumno && <ModalMensaje 
      closeMessage={setModalConfirmacionAlumno}
      message="Se ha eliminado correctamente al alumno"
      />}
    </div>
  );
}
