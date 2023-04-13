import React from "react";
import "../../../../assets/styles/Teacher/Timeline/RubricaPart/SegundaParte.css";
import { useState, useEffect } from "react";
import ModalCriterio from "../../../Modals/ModalCriterio";
import ModalsAlert from "./ModalsAlert";
import ModalsMessage from "../../../Modals/ModalsMessage";
import RubricaProfesorRow from "./EditPart/RubricaProfesorRow";
import { axiosGetCriteriaList } from "../../../../api/Rubric";
import { Paginacion } from '#Components/Pagination/Pagination.js'
import ModalsMessageLevel from "../Criteria/EditPart/ModalsMessageLevel";
import { GridLoader } from "react-spinners";

export default function SegundaParte(props) {
  const [modalCriterio, setModalCriterio] = useState(false);
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMessageLevel, setModalMessageLevel] = useState(false);
  const [deleteCriteria, setDeleteCriteria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cambioCriterio = () => {
    setModalCriterio(true);
  };
  const cambioAlerta = () => {
    setModalAlerta(true);
  };

  const JWTtoken = sessionStorage.getItem("token");
  const [listCriteria, setListCriteria] = useState([]);

  const [estadoChecked, setEstadoChecked] = useState(false);

  const getCriteriaList = () => {
    axiosGetCriteriaList(JWTtoken, props.rubricId)
      .then((response) => {
        // Si se necesita ver la estructura de los datos que quieres ver (SIEMPRE DEJARLO COMENTADO)
        // console.log(response.data);
        const data = response.data || [];
        // console.log(data);
        setListCriteria(data.rows);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCriteriaList();
  }, [modalMensaje, modalMessageLevel]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = Math.ceil(listCriteria.length / porPagina);

  const handleCopyDelete = (e) => {
    if (e.target.checked) { // Selecciona todos
      setDeleteCriteria(listCriteria.map((e) => e.id));
      setEstadoChecked(true);
    } else {
      setDeleteCriteria([]);
      setEstadoChecked(false);
    }
  }

  return (
    <div className="SegundaParteRubricaProfesor">
      <div className="lineaCriteriosRubricaProfesor">
        <div className="titulo">
          <p>Criterios</p>
        </div>

        <div className="seleccionar">
          {/* <input type="checkbox" onChange={(e) => {handleCopyDelete(e);}} className="checkBoxSeleccionarSegundaParte"/> */}
          <div className="checkboxSeleccionar">
            <input type="checkbox" onChange={(e) => {handleCopyDelete(e);}}
            checked={estadoChecked}
            />
          </div>
          <p>Seleccionar todo</p>
        </div>

        <div className="lineaBotoneriaRubricaProfesor">
          <button 
          className="borrar"
          onClick={cambioAlerta}
          type="button"
          >
            Borrar
          </button>
          <button 
          className="nuevoCriterio"
          onClick={cambioCriterio}
          type="button"
          >
            Nuevo Criterio
          </button>
        </div>
      </div>
      
      <div>
        <hr color="black" className="lineaContenidoCriteriaProfesor" 
        style={{marginTop:"10px", marginBottom:"0px", border:"0.5px", width:"1150px", height:"1px"}}/>
      </div>

      {
        isLoading ? 
          <GridLoader
          className="mx-auto"
          color="#042354"
          loading={isLoading}
          size={24}
          /> 
      :
      listCriteria && listCriteria.length != 0 ? (
        listCriteria
          .map((criteria) => {
            return (
              <div className="contenedorCriterio">
                <RubricaProfesorRow
                  num={props.num}
                  option={1}
                  id={props.id}
                  criterio={criteria}
                  rubricId={props.rubricId}
                  deleteCriteria={deleteCriteria}
                  setDeleteCriteria={setDeleteCriteria}
                  cxsid={props.cxsid}
                />
              </div>
            );
          })
      ) : (
        <p className="fallo">
          Aún no hay ningún criterio. Agregue uno nuevo presionando el botón.
        </p>
      )}

      <div className="contenedorBotoneriaEntregable" style={{marginTop:"15px"}}>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>

      <div>
        {modalCriterio && (
          <ModalCriterio
            closeMessage={setModalCriterio}
            rubricId={props.rubricId}
            modalMessage={setModalMessageLevel}
          />
        )}
        {modalAlerta && (
          <ModalsAlert
            alertText="¿Está seguro de eliminar el (los) criterio (s)?"
            closeAlert={setModalAlerta}
            closeMensaje={setModalMensaje}
            deleteAssignList={deleteCriteria}
            setDeleteAssignList={setDeleteCriteria}
            source={"CRITERIA"}
            rubricId={props.rubricId}
            setEstadoChecked={setEstadoChecked}
          />
        )}
        {modalMensaje && (
          <ModalsMessage
            message="Se borró correctamente el (los) criterio (s)"
            closeMessage={setModalMensaje}
            
          />
        )}
        {modalMessageLevel && <ModalsMessageLevel closeMessage={setModalMessageLevel} closeOtroModal={setModalCriterio}
        message="Se guardó el cambio correctamente" />}
      </div>
    </div>
  );
}
