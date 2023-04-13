import React, { useState } from 'react';
import '../../../assets/styles/Adviser/Rubrica/IconHeader.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modals/ModalSeeMore';
import ModalValidacion from '../../Admin/Semester/ModalValidacion';

export default function IconHeader(props) {
  
  const [openModal, setOpenModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  // const navigate = useNavigate();

  // const hizoClic3 = () =>{
  //   navigate(`/rubrica/detail/${props.id}/${props.cambio}/${props.idrevisor}`, {
  //     state: {
  //       criteria: props.criteria,
  //       numero: props.numero
  //     }
  //   });
  // }
  const criteriaData = props.criteria.LEVEL_CRITERIum;
  const qualifiedCriteria = props.criteria;
  // console.log(criteriaData)

  return (
    // criteriaData.RUBRIC_CRITERIum
    true
     ? 
    <div className='Opcion'>
        <div className='contenedorEntregable'>
            <p className='entregable'>{criteriaData.RUBRIC_CRITERIum ? criteriaData.RUBRIC_CRITERIum.name : "No tiene nombre"} </p>
        </div>

        <p className='numero'>
            {qualifiedCriteria.obtainedScore ? qualifiedCriteria.obtainedScore : "-"}/{criteriaData.maxScore}
        </p>

        <button
        className='botonOpcion'
        onClick={()=>{setOpenModal(true)}}
        >
            Editar
        </button>
        {openModal && <Modal closeModal={setOpenModal} title={criteriaData.RUBRIC_CRITERIum.description} criteria={props.criteria}
        setModalError={setModalError}
        />}
        {modalError && <ModalValidacion
              closeMessage={setModalError}
              message="El puntaje asignado debe ser menor al máximo."
              
              />}
    </div>
    :
    null
  )
}
