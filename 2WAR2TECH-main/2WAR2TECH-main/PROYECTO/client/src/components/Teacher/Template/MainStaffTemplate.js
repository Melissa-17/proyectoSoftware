import React, { useState } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import StaffCard from "./StaffCard";
import { Routes, useNavigate, Route } from "react-router";
import OptionComite from "./OptionComite";
import OptionTeacher from "./OptionTeacher";
import OptionJuryMan from "./OptionJuryMan";
import BuscadorProfesores from "../../Contenido/Coordinador/Semestres/BuscadorProfesores";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalsMessage from "../../Modals/ModalsMessage";
import "#Styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";

function MainStaffTemplate() {
  const [modalComplete, setModalComplete] = useState({});
  const [modalSeleccionado, setModalSeleccionado] = useState(false);

  const [modalConfirmacion, setModalConfirmacion] = useState({});
  const [modalConfirmacionSeleccionado, setModalConfirmacionSeleccionado] =
    useState(false);

  const [modalMensaje, setModalMensaje] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const [validacionDelete, setValidacionDelete] = useState(false);

  const cambioModalSeleccionado = () => {
    setModalSeleccionado(true);
  };
  const confirmacionModalSeleccionado = () => {
    if(deleteList.length>0) setModalConfirmacionSeleccionado(true);
    else setValidacionDelete(true);
  };
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/courses");
  };

  return (
    <div>
      <Navbar />
      <div className="PrincipalPartGlobal">
        <div className="PrincipalPart">
          <div className="MSTtitle">  
            <div className="inicio">
              <h1 className="MSTTitle">REGISTRO DE JURADOS</h1>
              <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>
            <div className="contenedorLineaDetalle">
              <hr color="#CED4DA" className="linea" /> 
            </div>
          </div>
          <div className="botoneria1PrincipalPartTeacher">
            <button
              className="botonBorrarPrincipalPartTeacher"
              onClick={confirmacionModalSeleccionado}
            >
              Borrar
            </button>
            <button
              className="botonNuevoPrincipalPartTeacher"
              onClick={cambioModalSeleccionado}
            >
              Nuevo
            </button>
          </div>
          <div className="opcionesPrincipalPartTeacher">
            <Routes>
              <Route path="/optionJuryMan" element={<OptionJuryMan />} />
            </Routes>
          </div>
        </div>
        <div className="MSTfooter">
          {modalSeleccionado && (
            <BuscadorProfesores closeModal={setModalSeleccionado} />
          )}
          {modalConfirmacionSeleccionado && (
            <ModalsAlert
              alertText="¿Seguro que desea borrar el (los) profesor (es)?"
              closeAlert={setModalConfirmacionSeleccionado}
              closeMensaje={setModalMensaje}
            />
          )}
          {modalMensaje && (
            <ModalsMessage
              closeMessage={setModalMensaje}
              message="Se borró correctamente el (los) profesor (es)"
            />
          )}
          {validacionDelete && <ModalValidacion
          closeMessage={setValidacionDelete} message="Debe seleccionar al menos un usuario"
          />}
        </div>
      </div>
    </div>
  );
}

export default MainStaffTemplate;
