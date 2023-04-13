import React, { useState } from "react";
import "../../../assets/styles/Admin/Faculty/Botoneria.css";
import ModalsAlertFacultyAdmin from "./ModalsAlert";
import ModalsMessageFacultyAdmin from "./ModalsMessageLevel";
import ModalNuevaFacultad from "./ModalNuevaFacultad";
import ModalsMessage from "../../Modals/ModalsMessage";
import ModalsError from "../../Modals/ModalsError";
import ModalValidacion from "../Semester/ModalValidacion";

export default function Botoneria(props) {
  const {
    deleteList,
    setDeleteList,
    modalNuevaFacultad,
    setModalNuevaFacultad,
    modalMensaje,
    setModalMensaje,
  } = props;
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalAlertaVacio, setModalAlertaVacio] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  console.log(deleteList);
  return (
    <div className="contenedorBotoneriaFacultyPart">
      <button
        className="botonEliminarFacultyPart"
        onClick={() => {
          if (deleteList.length > 0) setModalAlerta(true);
          else setModalAlertaVacio(true);
        }}
      >
        Desactivar
      </button>

      <button
        className="botonAgregarFacultadFacultyPart"
        onClick={() => {
          setModalNuevaFacultad(true);
        }}
      >
        Agregar Facultad
      </button>
      {modalAlerta && (
        <ModalsAlertFacultyAdmin
          closeAlert={setModalAlerta}
          modalMessage={setModalMensaje}
          deleteList={deleteList}
          setDeleteList={setDeleteList}
          alertText="¿Seguro que quiere eliminar la (las) facultad (es)?"
        />
      )}
      {modalMensaje && (
        <ModalsMessageFacultyAdmin
          closeMessage={setModalMensaje}
          closeOtroModal={setModalAlerta}
          message="Se eliminó correctamente la(s) facultad(es) seleccionada(s)"
        />
      )}
      {modalNuevaFacultad && (
        <ModalNuevaFacultad
          closeMessage={setModalNuevaFacultad}
          modalMessage={setModalConfirmacion}
        />
      )}
      {modalConfirmacion && (
        <ModalsMessageFacultyAdmin
          closeMessage={setModalConfirmacion}
          closeOtroModal={setModalNuevaFacultad}
          message="Se registró correctamente"
        />
      )}
      {modalAlertaVacio && <ModalValidacion closeMessage={setModalAlertaVacio} message="Debe seleccionar elementos de la lista" />}
    </div>
  );
}
