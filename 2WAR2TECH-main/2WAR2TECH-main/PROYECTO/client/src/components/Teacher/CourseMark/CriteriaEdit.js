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
import ModalsConfirmated from "./ModalsConfirmated";
import { axiosEditDescriptionCalification } from "../../../api/Calification";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";

function CriteriaEdit() {
  const [openModalNew, setOpenModalNew] = useState(false);
  const [evaluationList, setEvaluationList] = useState([]);
  const [deleteCriterio, setDeleteCriterio] = useState([]);
  const location = useLocation();
  const { criteriaId, cxsid, semid, option } = location.state;
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeRegistro, setModalMensajeRegistro] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  const [validacionEvaluacion, setValidacionEvaluacion] = useState(false);
  const [validacionDelete, setValidacionDelete] = useState(false);

  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const retrocesoClic = () => {
    if (option == 1) {
      navigate("/course/mark", {
        state: {
          cxsid: cxsid,
          semid: semid,
        },
      });
    } else {
      if (option == 2) {
        navigate("/course/mark/detail", {
          state: {
            criteriaId: criteriaId,
            cxsid: cxsid,
            semid: semid,
          },
        });
      }
    }
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
        setCount(data.evaluaciones.count);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getDetailCriteria();
  });

  const criteriaName = criteria && criteria.name ? criteria.name : "";
  const criteriaDescription = criteria && criteria.description ? criteria.description : "";

  // console.log(criteria);

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

  const handleProposeSubmit = (e) => {
    e.preventDefault();

    const name = document.querySelector(
      ".inputNombreCriteriaEdit"
    ).value;
    const description = document.querySelector(
      ".inputDescripcionCriteriaEdit"
    ).value;

    const proposeFormData = {
      name: name,
      description: description,
    };
    // console.log(proposeFormData);

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("peso", peso);
    // formData.append("description", description);

    // console.log(criteriaId);

    axiosEditDescriptionCalification(JWTtoken,criteriaId, proposeFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = Math.ceil(evaluationList.length / porPagina);

  return (
    <div>
      <Navbar />
      <div className="criteriaDetailContainer">
        <form
        className="editCriteriaEditForm"
        id="editCriteriaEditForm"
        method="patch"
        onSubmit={(e)=>{handleProposeSubmit(e);}}
        >
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
            <input
              type="text"
              placeholder="Coloque un nombre"
              defaultValue={criteriaName}
              className="inputNombreCriteriaEdit"
            />
            <hr
              color="black"
              className="linea"
              style={{ width: "1040px", border: "0.1px solid black" }}
            />
             
          </div>
          <div className="CDDescription">
            <div className="descriptionTxt">
              <p className="DTTitle">Descripción</p>
              <input
                type="text"
                placeholder="Coloque una descripción"
                defaultValue={criteriaDescription}
                className="inputDescripcionCriteriaEdit"
              />
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
                <button
                  className="CMAErase"
                  onClick={() => {
                    if(deleteCriterio.length>0) setModalAlerta(true);
                    else setValidacionDelete(true);
                  }}
                >
                  Borrar
                </button>
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
                    {evaluation && evaluation.ASSIGNMENT ? (
                      <EvaluationRow
                        name={evaluation.ASSIGNMENT.assignmentName}
                        weight={evaluation.weight}
                        evaluation={evaluation}
                        deleteCriterio={deleteCriterio}
                        setDeleteCriterio={setDeleteCriterio}
                        evaluationList={evaluationList}
                        setEvaluationList={setEvaluationList}
                      />
                    ) : (
                      ""
                    )}
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
              modalMessage={setModalMensajeRegistro}
            />
          )}
          {modalMensajeRegistro && (
            <ModalsMessage
              closeMessage={setModalMensajeRegistro}
              closeOtroModal={setOpenModalNew}
              message="Se registró correctamente"
            />
          )}
          {modalAlerta && (
            <ModalsAlert
              closeAlert={setModalAlerta}
              alertText="¿Seguro que quiere eliminar la (s) evaluación (es)?"
              modalMensaje={setModalMensaje}
              setDeleteAssignList={setDeleteCriterio}
              deleteCriterio={deleteCriterio}
              option={2}
              setValidacionEvaluacion={setValidacionEvaluacion}
            />
          )}
          {modalMensaje && (
            <ModalsMessage
              closeMessage={setModalMensaje}
              closeOtroModal={setModalAlerta}
              message="Se eliminó correctamente"
            />
          )}

          <div className="contenedorBotoneriaEntregable" style={{marginTop:"20px"}}>
            {count>0?
            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />:""}
          </div>
          <div className="botoneriaCriteriaEdit">
            <button
              className="cancelarCriteriaEdit"
              onClick={retrocesoClic}
              type="button"
            >
              Cancelar
            </button>

            <button className="aceptarCriteriaEdit" 
            type="submit" form="editCriteriaEditForm"
            onClick={()=>{setModalConfirmacion(true)}}
            >
              Aceptar
            </button>
            
            {modalConfirmacion && (
              <ModalsConfirmated
                alertText="Se guardaron los cambios"
                cxsid={cxsid}
                semid={semid}
                criteriaId={criteriaId}
                option={option}
                // proposeFormData={proposeFormData}
              />
            )}
            {validacionDelete && <ModalValidacion 
            closeMessage={setValidacionDelete}
            message="Debe seleccionar al menos una evaluacion"
            />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriteriaEdit;
