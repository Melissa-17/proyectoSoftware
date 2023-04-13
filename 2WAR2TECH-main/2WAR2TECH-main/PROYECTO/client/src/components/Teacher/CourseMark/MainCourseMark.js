import React, { useEffect, useState } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Teacher/CourseMark/MainCourseMark.css";
import { useLocation, useNavigate } from "react-router-dom";
import CriteriaRow from "./CriteriaRow";
import NewCriteriaModal from "./CriteriaModal/NewCriteriaModal";
import { axiosGetCalificationsCriteria } from "#API/Calification";
import ModalsAlert from "../Timeline/RubricaPart/ModalsAlert";
import ModalsMessage from "../../Modals/ModalsMessage";
import { Paginacion } from '#Components/Pagination/Pagination.js'
import ModalValidacion from "../../Admin/Semester/ModalValidacion";

function MainCourseMark() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cxsid, semid } = location.state;
  const [openModal, setOpenModal] = useState(false);
  const [criteriaList, setCriteriaList] = useState([]);
  const [deleteCurso, setDeleteCurso] = useState([]);
  const [modalBorrar, setModalBorrar] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  const [estadoChecked, setEstadoChecked] = useState(false);
  const [validacionDelete, setValidacionDelete] = useState(false);

  const JWTtoken = sessionStorage.getItem("token");

  const getCriteriaList = (idcurso, idsemestre) => {
    axiosGetCalificationsCriteria(JWTtoken, idcurso, idsemestre)
      .then((response) => {
        //console.log(response.data);
        const data = response.data.rows || [];
        setCriteriaList(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCriteriaList(cxsid, semid);
  });

  const retrocesoClic = () => {
    navigate("/courses");
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = Math.ceil(criteriaList.length / porPagina);

  const handleCopyDelete = (e) => {
    if (e.target.checked) { // Selecciona todos
      setDeleteCurso(criteriaList.map((e) => e.id));
      setEstadoChecked(true);
    } else {
      setDeleteCurso([]);
      setEstadoChecked(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="mainCourseMarkContainer">
        <div className="CMheader">
          <div className="RDheader">
            <h1 className="RDtitle">CALIFICACIÓN DEL CURSO</h1>
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
          <p className="CMCourseTitle">Curso de Tesis 1</p>
          <hr color="#CED4DA" className="linea" /> 
        </div>
        <div className="CMcontent">
          <div className="CMAddCriteria">
            <p className="CMACTitle">Lista de Criterios</p>
            <div className="CMACSelect">
              <div className="checkboxSeleccionarTodos">
                <input type="checkbox" onChange={(e) => {handleCopyDelete(e);}}
                checked={estadoChecked}
                />
              </div>
              <p>Seleccionar todo</p>
            </div>
            <div className="CMACBtns">
              <button
                className="CMAErase"
                onClick={() => {
                  if(deleteCurso.length>0) setModalBorrar(true);
                  else setValidacionDelete(true);
                }}
              >
                Borrar
              </button>
              <button
                className="CMANew"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Nuevo Criterio
              </button>
            </div>
          </div>
          <div className="CMCrieriaContainer">
            {criteriaList && criteriaList.length > 0 ? (
              criteriaList.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).
              map((criteria, index) => {
                return (
                  <div key={index} className="CMCrows">
                    <CriteriaRow
                      criterio={criteria}
                      getCriteria={getCriteriaList}
                      idcurso={cxsid}
                      idsemestre={semid}
                      deleteCurso={deleteCurso}
                      setDeleteCurso={setDeleteCurso}
                    />
                  </div>
                );
              })
            ) : (
              <p className="ifTheresNot">
                Aún no hay criterios. Agregue uno nuevo presionando el botón
              </p>
            )}
          </div>
          <div className="contenedorBotoneriaEntregable">
            <Paginacion
              pagina={pagina}
              setPagina={setPagina}
              maximo={maximo}
            />
          </div>
        </div>
        <div className="CMfooter"></div>
        {openModal && (
          <NewCriteriaModal
            closeMessage={setOpenModal}
            criteriaList={criteriaList}
            setCriteriaList={setCriteriaList}
            cxsid={cxsid}
            semid={semid}
          />
        )}
      </div>
      <div>
        {modalBorrar && (
          <ModalsAlert
            alertText="¿Está seguro de eliminar el (los) nivel (es)?"
            closeAlert={setModalBorrar}
            closeMensaje={setModalConfirmacion}
            deleteAssignList={deleteCurso}
            setDeleteAssignList={setDeleteCurso}
            source={"CURSO"}
            setEstadoChecked={setEstadoChecked}
          />
        )}

        {modalConfirmacion && (
          <ModalsMessage
            closeMessage={setModalConfirmacion}
            message="Se borró correctamente"
            otroModal={setModalBorrar}
          />
        )}
        {validacionDelete && <ModalValidacion 
        closeMessage={setValidacionDelete}
        message="Debe seleccionar al menos un criterio"
        />}
      </div>
    </div>
  );
}

export default MainCourseMark;
