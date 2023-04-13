import React from 'react'
import '../../../../../assets/styles/Teacher/Timeline/RubricaPart/BotoneriaRubricaProfesor.css'
import { useNavigate } from 'react-router'
import { useState } from 'react';
import ModalsAlert from './ModalsAlert';
import ModalMensaje from './ModalMensaje';

export default function BotoneriaRubricaProfesor(props) {
    const navigate = useNavigate();
    const [modalAlerta, setModalAlerta] = useState(false);
    const [modalConfirmacion, setModalConfirmacion] = useState(false);
    const cambioAlerta = () =>{
        setModalAlerta(true);
    }
    const cambioConfirmacion = () =>{
        setModalConfirmacion(true);
    }
  return (
    <div className='contenedorBotoneriaRubricaProfesor'>
        <button className='cancelar' onClick={cambioAlerta}>Cancelar</button>
        <button className='guardar' onClick={cambioConfirmacion} form="editCriteriaIdForm">Guardar</button>
        <div>
        {modalAlerta && <ModalsAlert closeAlert={setModalAlerta} 
            alertText="¿Desea cancelar los cambios?" num={props.num} cxsid={props.cxsid} 
            id={props.id} rubricId={props.rubricId}/>}
        {modalConfirmacion && <ModalMensaje num={props.num} 
        message="Se guardó correctamente el cambio" cxsid={props.cxsid} id={props.id}
        rubricId={props.rubricId}/>}
        </div>
    </div>
  )
}
