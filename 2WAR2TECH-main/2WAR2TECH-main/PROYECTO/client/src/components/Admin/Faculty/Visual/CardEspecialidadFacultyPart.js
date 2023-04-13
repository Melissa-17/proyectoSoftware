import React, { useEffect, useState } from "react";
import "../../../../assets/styles/Admin/Faculty/Visual/CardEspecialidadFacultyPart.css";
import ModalsAlertSpecialty from "../Edit/ModalsAlertSpecialty";
import ModalsMessageFacultyAdmin from "../Edit/ModalsMessageLevel";
import ModalEditEspecialidad from "./ModalEditEspecialidad";
import ModalsMessage from "./ModalsMessage";

export default function CardEspecialidadFacultyPart(props) {
  const { especialidad, option, setModalMensaje, modalMensaje, modalConfirmacion, setConfirmacion } = props;
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalEditEspecialidad, setModalEditEspecialidad] = useState(false);
  
  // const [modalConfirmacion, setConfirmacion] = useState(false);
  // useEffect(() => {
    
  // }, [modalConfirmacion]);
  
  return (
    <div className="contenedorCardEspecialidadFacultyPart">
      <div className="infoCardFacultyPart">
        <p className="carrera">
          {(especialidad && especialidad.name
            ? especialidad.name
            : "No tiene nombre").toUpperCase()}
        </p>
        <p className="info">
          {especialidad && especialidad.USERs && especialidad.USERs.length > 0
            ? especialidad.USERs[0].name +
              " " +
              especialidad.USERs[0].mLastName +
              " " +
              especialidad.USERs[0].fLastName
            : "No tiene usuario"}{" "}
          -{" "}
          {especialidad && especialidad.USERs && especialidad.USERs.length > 0
            ? especialidad.USERs[0].idPUCP
            : "No tiene usuario"}
        </p>
      </div>
      <button
        className="botonEditEspecialidadFacultyPart"
        onClick={() => {
          setModalEditEspecialidad(true);
        }}
      >
        <i class="bi bi-pencil-square"></i>
      </button>

      <button
        className="botonEliminarEspecialidadFacultyPart"
        onClick={() => {
          setModalAlerta(true);
        }}
      >
        <i class="bi bi-trash"></i>
      </button>
      <div>
        {modalEditEspecialidad && (
          <ModalEditEspecialidad
            closeMessage={setModalEditEspecialidad}
            especialidad={especialidad}
            openModal={setConfirmacion}
          />
        )}
        {modalConfirmacion && (
            <ModalsMessage
              closeMessage={setConfirmacion}
              closeOtroModal={setModalEditEspecialidad}
              message="Se realizó el cambio correctamente"
            />
          )}
        {modalAlerta && (
          <ModalsAlertSpecialty
            closeAlert={setModalAlerta}
            alertText="¿Seguro que desea eliminar la especialidad?"
            modalMessage={setModalMensaje}
            especialidad={especialidad}
            option={1}
          />
        )}
        {modalMensaje && (
          <ModalsMessageFacultyAdmin
            closeMessage={setModalMensaje}
            closeOtroModal={setModalAlerta}
            option={option}
            message="Se eliminó correctamente la especialidad"
          />
        )}
      </div>
    </div>
  );
}
