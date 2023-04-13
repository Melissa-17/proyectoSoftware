import React from 'react'
import '../../../../../assets/styles/Teacher/Timeline/RubricaPart/SegundaParte.css'
import { useState, useEffect } from "react";
import ModalCriterio from '../../../../Modals/ModalCriterio';
import ModalsAlert from '../ModalsAlert';
import ModalsMessage from '../../../../Modals/ModalsMessage';
import RubricaProfesorRow from './RubricaProfesorRow';
import { axiosGetCriteriaList } from '../../../../../api/Rubric';
import { Paginacion } from '#Components/Pagination/Pagination.js'

export default function SegundaParte(props) {
    const [modalCriterio, setModalCriterio] = useState(false);
    const [modalAlerta, setModalAlerta] = useState(false);
    const [modalMensaje, setModalMensaje] = useState(false);
    const [deleteCriteria, setDeleteCriteria] = useState([]);
    const [modalMensajeConfirmacion, setModalMensajeConfirmacion] = useState(false);
    const cambioCriterio = () =>{
        setModalCriterio(true);
    }
    const cambioAlerta = () =>{
      setModalAlerta(true);
    }

    const JWTtoken = sessionStorage.getItem("token");
    const [listCriteria, setListCriteria] = useState([]);

    const getCriteriaList = () => {
        axiosGetCriteriaList(JWTtoken, props.rubricId)
          .then((response) => {
            // Si se necesita ver la estructura de los datos que quieres ver (SIEMPRE DEJARLO COMENTADO)
            // console.log(response.data);
            const data = response.data || [];
            setListCriteria(data);
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });
      };

    useEffect(() => {
      getCriteriaList();
    });

    //Paginación
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);
    const maximo = Math.ceil(listCriteria.length / porPagina);

    const handleCopyDelete = (e) => {
      if (e.target.checked) { // Selecciona todos
        setDeleteCriteria(listCriteria.map((e) => e.id));
      } else {
        setDeleteCriteria([]);
      }
    }

  return (
    <div className='SegundaParteRubricaProfesor'>
      <div className='lineaCriteriosRubricaProfesor'>
        <div className='titulo'>
            <p>Criterios</p>
        </div>
        
        <div className='seleccionar'>
          <div className="checkboxSeleccionar">
            <input 
            type="checkbox" 
            onChange={(e) => {handleCopyDelete(e);}}
            defaultChecked={false}/>
          </div>
            <p>Seleccionar todo</p>
        </div>

        <div className='lineaBotoneriaRubricaProfesor'>
            <button className='borrar' onClick={cambioAlerta}>Borrar</button>
            <button className='nuevoCriterio' onClick={cambioCriterio}>Nuevo Criterio</button>
        </div>
      </div>

      <div>
        <hr color="black" className="lineaContenidoCriteriaProfesor" 
        style={{marginTop:"10px", marginBottom:"0px", border:"0.5px", width:"1160px", height:"1px"}}/>
      </div>

      {listCriteria && listCriteria.length != 0 ? (
        listCriteria.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map((criteria) => {
          return (
            <div className="contenedorCriterio">
            <RubricaProfesorRow
              num={props.num}
              option={2}
              id={props.id}
              criterio={criteria}
              rubricId={props.rubricId}
              deleteCriteria={deleteCriteria}
              setDeleteCriteria={setDeleteCriteria}
            />
          </div>
          );
        })
      ) : (
        <p className="fallo">Aún no hay ningún criterio. Agregue uno nuevo presionando el botón.</p>
      )}

      <div className="contenedorBotoneriaEntregable" style={{marginTop:"15px"}}>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>

      <div>
        {modalCriterio && 
        <ModalCriterio closeMessage={setModalCriterio} rubricId={props.rubricId} 
        modalMessage={setModalMensajeConfirmacion}/>}

        {(modalAlerta && deleteCriteria.length > 0) && (
          <ModalsAlert
            alertText="¿Está seguro de eliminar el (los) criterio (s)?"
            closeAlert={setModalAlerta}
            closeMensaje={setModalMensaje}
            deleteAssignList={deleteCriteria}
            setDeleteAssignList={setDeleteCriteria}
            source={"CRITERIA"}
            rubricId={props.rubricId}
          />
        )}

        {modalMensaje && <ModalsMessage message="Se borró correctamente el (los) criterio (s)" closeMessage={setModalMensaje} />}

        {modalMensajeConfirmacion && 
        <ModalsMessage message="Se creó correctamente un nuevo criterio" 
        otroModal={setModalCriterio}
        closeMessage={setModalMensajeConfirmacion}/>}
      </div>
    </div>
  )
}
