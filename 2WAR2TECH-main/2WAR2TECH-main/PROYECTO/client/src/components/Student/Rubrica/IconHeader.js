import React, { useState } from 'react';
import '../../../assets/styles/Student/Rubrica/IconHeader.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modals/ModalSeeMore';

export default function IconHeader(props) {
  
  const [openModal, setOpenModal] = useState(false);
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

  return (
    <div className='Opcion'>
        <div className='contenedorEntregable'>
            <p className='entregable'>{criteriaData.RUBRIC_CRITERIum.name}</p>
        </div>

        <p className='numero'>
            {qualifiedCriteria.obtainedScore ? qualifiedCriteria.obtainedScore : "-"}/{criteriaData.maxScore}
        </p>

        <button
        className='botonOpcion'
        onClick={()=>{setOpenModal(true)}}
        >
            Ver más
        </button>
        {openModal && <Modal closeModal={setOpenModal} title={criteriaData.RUBRIC_CRITERIum.description} criteria={props.criteria}/>}
    </div>
  )
}
