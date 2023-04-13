import React from 'react'
import '../../../../assets/styles/Jury/Deliverable/DetailPart/IconDeliverableJury.css'
import { useNavigate } from 'react-router'
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function IconDeliverableJury(props) {
  const navigate = useNavigate();
  const studAssignment = props.assign ? props.assign.studentAssignment : null;
    let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    let revisor = JSON.parse(localStorage.getItem('asesor'));
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };
  const IconDeliverableJuryClic = () =>{
      navigate(`/rubricaJury/${19}/${2}/${6}`,{
        state: {
          assignment: studAssignment,
          revisor: revisor,
          index: props.index
      }
      });
  }

  return (
    <div className='contenedorIconDeliverableJuryGlobal'>
      
      <div className='contenedorEntregableDeliverableJury'>
        <p className='tituloEntregableDeliverableJury'>Entregable {props.index}</p>
        <p className='nombreEntregableDeliverableJury'>Nombre 01</p>
        <p className='descripcionEntregableDeliverableJury'>Descripción corta</p>
      </div>

      <div> <hr className='lineaVerticalDeliverableJury' color='black'/> </div>
      
      <div className='contenedorCorrecionesDeliverableJury'>
        <div className='contenedorCorrecionesTituloEntregable'>
            <p className='entregados'>Entregados: </p>
            <p>20</p>
        </div>
        <div className='contenedorCorrecionesCorregidoEntregable'>
            <p className='corregido'>Corregidos: </p>
            <p>20</p>
        </div>
      </div>
      
      <div> <hr className='lineaVerticalDeliverableJury' color='black'/> </div>
      
      <div className='contenedorBotoneriaDeliverableJury'>
        <button className='botonVerRubricaDeliverableJury' onClick={IconDeliverableJuryClic}>Ver rúbrica</button>
        <button className='botonVerEntregasDeliverableJury'>Ver entregas</button>
      </div>
    </div>
  )
}
