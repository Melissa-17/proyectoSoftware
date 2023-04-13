import React from 'react';
import '../../../../../assets/styles/Alumno/AvancesPrincipal/InitialPart.css';
import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import { createCompleteName, capitalizeTitle } from '#Helpers/stringHelpers.js';
import { Buffer } from 'buffer';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function InitialPart(props) {
    console.log(props.assign.assignmentRevisors.length);
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
    const studAssignment = props.assign ? props.assign.studentAssignment : null;

  return ( (props.assign && studAssignment && studAssignment.ASSIGNMENT) &&
    <div className='parteInicialAvance'>
        <div className='contenedorInfoAvance'>
            <div className='titulo'>
                <h2>Avance {props.numero != 0 ? props.numero : ''}</h2>
            </div>
            <div className='contenidoAvance'>
                <div className='infoContenidoAvance'>
                    <div className='puntajeAvance'>
                        <p>{getScore(studAssignment.score)}/{studAssignment.ASSIGNMENT.maxScore}</p>
                        <p>puntos</p>
                    </div>
                    <div className='fechaEntregaAvance'>
                        <p className='fecha'>Fecha de entrega:</p>
                        <p>{formatDate(studAssignment.ASSIGNMENT.limitCompleteDate)}</p>
                    </div>
                </div>
                <div className='lineaContenidoAvance'>
                    <hr color='#CED4DA' className='linea'/>
                </div>
            </div>
        </div>
        <div className='contenedorFotoAvance'>
            <div className='fotoPersona'>
                {
                    revisor.photo ?
                        <img className="foto" 
                        src={`data:image/png;base64,${Buffer.from(revisor.photo.data).toString('base64')}`} 
                        alt='foto asesor' />
                        :
                        <img className="foto" 
                        src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                        alt='foto asesor' />
                }
            </div>
            <div className='informacionAvance'>
                <p className='tesis'>TESIS I</p>
                <p className='nombreUsuario'>{createCompleteName(revisor.USER.name, revisor.USER.fLastName, revisor.USER.mLastName)}</p>
                <p className='area'>{revisor.USER.USER_X_SPECIALTies ? capitalizeTitle(revisor.USER.USER_X_SPECIALTies[0].SPECIALTY.name) : "No hay titulo"}</p>
            </div>
        </div>
    </div>
  )
}
