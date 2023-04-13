import React, { useState } from "react";
import "../../../assets/styles/Admin/Coordinator/Botoneria.css";
import ModalsAlertFacultyAdmin from "./ModalsAlert";
import ModalsMessageFacultyAdmin from "./ModalsMessageLevel";
import { useNavigate } from "react-router";
import ModalValidacion from "../Semester/ModalValidacion";

export default function Botoneria(props) {
  const {deleteList, setDeleteList, modalMensaje, setModalMensaje} = props;
  const [modalAlerta, setModalAlerta] = useState(false);
  const [validacionDelete, setValidacionDelete] = useState(false);
  
  // const [modalConfirmacion, setModalConfirmacion] = useState(false);
  // const [modalNuevaFacultad, setModalNuevaFacultad] = useState(false);

  const navigate = useNavigate();

  const cambioRegistro = ()=>{
    navigate("/coordinator/registro");
  }

  return (
    <div className="contenedorBotoneriaFacultyPart">
      <button
        className="botonEliminarFacultyPart"
        onClick={() => {
          if(deleteList.length>0) setModalAlerta(true);
          else setValidacionDelete(true);
        }}
      >
        Desactivar
      </button>

      <button
        className="botonAgregarFacultadFacultyPart"
        onClick={cambioRegistro}
      >
        Registrar Usuarios
      </button>
      {modalAlerta && (
        <ModalsAlertFacultyAdmin
          closeAlert={setModalAlerta}
          modalMessage={setModalMensaje}
          alertText="¿Seguro que quiere eliminar el (los) usuario (s)?"
          deleteList={deleteList}
          setDeleteList={setDeleteList}
        />
      )}
      {modalMensaje && (
        <ModalsMessageFacultyAdmin
          closeMessage={setModalMensaje}
          closeOtroModal={setModalAlerta}
          message="Se eliminó correctamente el (los) usuario (s)"
        />
      )}
      {validacionDelete && <ModalValidacion 
      closeMessage={setValidacionDelete}
      message="Debe seleccionar al menos un coordinador para eliminarlo"
      />}
    </div>
  );
}
