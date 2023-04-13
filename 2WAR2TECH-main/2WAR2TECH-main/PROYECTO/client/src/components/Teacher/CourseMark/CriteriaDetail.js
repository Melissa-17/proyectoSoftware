import React, { useState, useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Teacher/CourseMark/CriteriaDetail.css";
import { useNavigate } from "react-router";
import { useParams, useLocation } from "react-router-dom";
import EvaluationRow from "./EvaluationRow";
import { axiosGetCalificationDetail } from "#API/Calification.js";
import NewEvaluation from "./CriteriaModal/NewEvaluationModal";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalsAlert from "./ModalsAlert";
import ModalsMessage from "./ModalsMessage";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";
import EditCriteriaModal from "./CriteriaModal/EditCriteriaModal";

function CriteriaDetail() {
  const [openModalNew, setOpenModalNew] = useState(false);
  const [evaluationList, setEvaluationList] = useState([]);
  const [deleteCriterio, setDeleteCriterio] = useState([]);
  const location = useLocation();
  const { criteriaId, cxsid, semid } = location.state;
  const [modalBorrar, setModalBorrar] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [IdEvaluation,setIdEvaluation]=useState();
  const [validacionEvaluacion, setValidacionEvaluacion] = useState(false);
  const [validacionDelete, setValidacionDelete] = useState(false);
  const [count, setCount] = useState(0);
  // console.log("CritId: " + criteriaId);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/course/mark", {
      state: {
        cxsid: cxsid,
        semid: semid,
      },
    });
  };
  const cambioEdit = () => {
    navigate("/course/mark/edit", {
      state: {
        criteriaId: criteriaId,
        cxsid: cxsid,
        semid: semid,
        option: 2,
      },
    });
  };

  const JWTtoken = sessionStorage.getItem("token");
  const [criteria, setCriteria] = useState(null);

  const getDetailCriteria = () => {
    axiosGetCalificationDetail(JWTtoken, criteriaId)
      .then((response) => {
        //console.log(response.data.evaluaciones.rows);
        const data = response.data || [];
        setCriteria(data.criteria);
        setEvaluationList(data.evaluaciones.rows);
        // console.log(data);
        setCount(data.evaluaciones.count);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getDetailCriteria();
  });

  const criteriaName = criteria && criteria.name ? criteria.name : "no name";
  const criteriaDescription =
    criteria && criteria.description ? criteria.description : "no description";

  // console.log(evaluationList);

  const handleCopyDelete = (e) => {
    if (e.target.checked) {
      // Selecciona todos
      setDeleteCriterio(evaluationList.map((e) => e.id));
      setValidacionEvaluacion(true);
    } else {
      setDeleteCriterio([]);
      setValidacionEvaluacion(false);
    }
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = Math.ceil(evaluationList.length / porPagina);

  return (
    <div>
      <Navbar />
      <div className="criteriaDetailContainer">
        <div className="CMheader">
          <div className="RDheaderCriteriaDetail">
            <h1 className="RDtitleCriteriaDetailContainer">
              CRITERIO DE CALIFICACIÓN
            </h1>
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
          <p className="CMCourseTitle">{criteriaName}</p>
          <hr
            color="black"
            className="linea"
            style={{ width: "1040px", border: "0.1px solid black" }}
          />
           
        </div>
        <div className="CDDescription">
          <div className="descriptionTxt">
            <p className="DTTitle">Descripción</p>
            <p className="DTContent">{criteriaDescription}</p>
          </div>
          <div className="descriptionBtn">
            <button className="edit" onClick={cambioEdit}>
              Editar
            </button>
          </div>
        </div>
        <div className="CMEvaluationHeader">
          <div className="CMAddCriteriaCriteriaDetail">
            <p className="CMACTitle">Lista de Evaluaciones</p>
            <div className="CMACSelect">
              <div className="checkboxSeleccionar">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleCopyDelete(e);
                  }}
                  checked={validacionEvaluacion}
                />
              </div>
              <p>Seleccionar todo</p>
            </div>
            <div className="CMACBtns">
              <button className="CMAErase"
              onClick={()=>{
                if(deleteCriterio.length>0) setModalBorrar(true);
                else setValidacionDelete(true);
              }}
              >Borrar</button>
              <button
                className="CMANew"
                onClick={() => {
                  setOpenModalNew(true);
                }}
              >
                Agregar evaluaciones
              </button>
            </div>
          </div>
        </div>
        <div className="evaluationsList">
          {evaluationList && count>0 ? (
            evaluationList.map((evaluation, index) => {
              return (
                <div key={index} className="CMAevaluations">
                  {evaluation && evaluation.ASSIGNMENT?
                  <EvaluationRow
                    name={evaluation.ASSIGNMENT.assignmentName}
                    weight={evaluation.weight}
                    setIdEvaluation={setIdEvaluation}
                    setOpenModalEdit={setOpenModalEdit}
                    evaluation={evaluation}
                    deleteCriterio={deleteCriterio}
                    setDeleteCriterio={setDeleteCriterio}
                    evaluationList={evaluationList}
                    setEvaluationList={setEvaluationList}
                  />:""}
                </div>
              );
            })
          ) : (
            <p className="ifTheresNot" style={{width:"1000px", marginTop:"50px"}}>
              Aún no hay ninguna evaluación. Agregue una nueva presionando el
              botón
            </p>
          )}
        </div>
        {openModalNew && (
          <NewEvaluation
            closeMessage={setOpenModalNew}
            criteriaId={criteriaId}
            evaluationList={evaluationList}
            setEvaluationList={setEvaluationList}
            cxsid={cxsid}
            semid={semid}
          />
        )}

        <div className="contenedorBotoneriaEntregable" style={{marginTop:"20px"}}>
          {count>0?
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />:""}
        </div>

        <div>
          {modalBorrar && (
            <ModalsAlert
              alertText="¿Está seguro de eliminar la (las) evaluación (es)?"
              closeAlert={setModalBorrar}
              modalMensaje={setModalConfirmacion}
              deleteCriterio={deleteCriterio}
              setDeleteAssignList={setDeleteCriterio}
              option={2}
              setValidacionEvaluacion={setValidacionEvaluacion}
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
          message="Debe seleccionar al menos una evaluacion"
          />}
          {openModalEdit && 
            <EditCriteriaModal closeMessage={setOpenModalEdit} 
            evaluationList={ evaluationList}
            setEvaluationList={ setEvaluationList}
            id={ IdEvaluation}/>}
        </div>
      </div>
    </div>
  );
}

export default CriteriaDetail;
