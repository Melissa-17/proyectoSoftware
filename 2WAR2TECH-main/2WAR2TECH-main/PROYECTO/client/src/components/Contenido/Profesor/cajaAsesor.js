import React, { useContext, useState } from "react";
import "#Styles/Teacher/Administration/listadoAsesores.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { AppContext, useMyContext } from './Provider';
import { axiosEditAsesorStatus } from "#API/Cursos.js";
import { ModalDeshabilitar } from "./ModalsAlertDeshabilitar";
import ModalCambioEstado from "./ModalCambioEstado";
import { Buffer } from "buffer"; 
export function CajaAsesor(props) {
  const { asesor } = props;
  // const { foto,nombre,apellido1,apellido2,correo } = props;
  // console.log(asesor);
  const JWTtoken = localStorage.getItem("token");
  const nombre = asesor && asesor.name ? asesor.name : "nombre";
  const apellido1 = asesor && asesor.fLastName ? asesor.fLastName : "apellido";
  const apellido2 = asesor && asesor.mLastName ? asesor.mLastName : "apellido";
  const correo = asesor && asesor.email ? asesor.email : "correo";
  const navigate = useNavigate();
  const id = asesor.USER && asesor.USER.id ? asesor.USER.id : "";
  const [estado, setEstado] = useState(
    asesor && asesor.status ? asesor.status : "H"
  );
  const [modalCambiarEstado, setmodalCambiarEstado] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [cambioestado, setcambioestado] = useState(false);
  
  const detalleAsesor = () => {
    navigate("/Asesor/Detalle", {
      state: { idAsesor: id, cxsid: cxsid, info: asesor },
    });
  };
  const location = useLocation();
  const { cxsid } = location.state;
  const cambiarEstado = (nuevoEstado) => {
    const body = {
      idU: asesor.id,
      idCXS: asesor.USER_X_COURSE_X_SEMESTERs[0].id,
      status: nuevoEstado,
    };

    axiosEditAsesorStatus(JWTtoken, body); // Agregar then y catch, modales
  };
  return (
    <button className="asesordata">
      {/* {console.log(asesor)} */}
      {asesor && asesor.photo ? (
        <img
          src={`data:image/png;base64,${Buffer.from(asesor.photo.data).toString(
            "base64"
          )}`}
          alt="foto asesor"
        />
      ) : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          alt="foto asesor"
        />
      )}

      {/* <img src={ foto} class="rounded" /> */}
      <p>{nombre + " " + apellido1 + " " + apellido2}</p>
      <p>{correo}</p>

      <button className="botonVerAlumnos" onClick={detalleAsesor} type="button">
        Ver alumnos
      </button>

      <button
        className="BotonDeshabilitar"
        type="button"
        onClick={() => {
          setmodalCambiarEstado(true);
        }}
        hidden={estado == "D"}
      >
        Deshabilitar
      </button>
      <button
        className="BotonHabilitar"
        type="button"
        onClick={() => {
          setmodalCambiarEstado(true);
        }}
        hidden={estado == "H"}
      >
        Habilitar
      </button>

      {/* <button className='BotonDeshabilitar' type="button" onClick={() => {setEstado('D'); cambiarEstado('D')}} hidden={estado=='D'}>Deshabilitar</button>
              <button className='BotonHabilitar' type="button" onClick={() => {setEstado('H'); cambiarEstado('H')}} hidden={estado=='H'}>Habilitar</button> */}
      {/* {console.log(modalCambiarEstado)} */}
      <div>
        {modalCambiarEstado && (
          <ModalDeshabilitar
            closeAlert={setmodalCambiarEstado}
            alertText="Esta por cambiar el estado de habilitación de un asesor ¿Esta seguro de realizar este cambio?"
            modalMessage={setModalMensaje}
            asesor={asesor}
            cambiar={setEstado}
            viejoEstado={estado}
          />
        )}
        {modalMensaje && (
          <ModalCambioEstado
            closeMessage={setModalMensaje}
            closeOtroModal={setmodalCambiarEstado}
            message="Se edito el estado del asesor correctamente"
          />
        )}
      </div>
    </button>
  );
}
