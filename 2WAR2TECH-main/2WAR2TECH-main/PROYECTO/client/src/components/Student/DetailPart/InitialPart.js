import React, { useReducer } from 'react';
import '#Styles/Student/DetailPart/InitialPart.css';
import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import { createCompleteName, capitalizeTitle } from '#Helpers/stringHelpers.js';
import { Buffer } from "buffer";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function InitialPart(props) {
    
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

    
//   console.log(props.assign);

    const funcionTipo = () =>{
        if(studAssignment.ASSIGNMENT.type=="PARTIAL ASSIGN") return "ENTREGA PARCIAL";
        else if(studAssignment.ASSIGNMENT.type=="ADVANCE") return "AVANCE";
        else if(studAssignment.ASSIGNMENT.type=="FINAL ASSIGN") return "ENTREGA FINAL";
        else if(studAssignment.ASSIGNMENT.type=="EXPOSITION" || 
        studAssignment.ASSIGNMENT.type=="PROGRAMMED EXPOSITION") return "EXPOSICION";
    }
  
    return ( (props.assign && studAssignment && studAssignment.ASSIGNMENT) && 
    
    <div className='parteInicialPart'>
        {/* { console.log("Info log " + JSON.stringify(studAssignment, null, 2)) } */}
        <div className='contenedorInfo'>
            <div className='titulo'>
                <h2>{studAssignment.ASSIGNMENT.assignmentName}</h2>
            </div>
            <div className='contenidoInitialPartEntregable'>
                <div className='infoContenido'>
                    <div className='puntaje'>
                        <p>{funcionTipo()}</p>
                    </div>
                    <div className='fechaEntrega'>
                        <p className='fecha'>Fecha de entrega:</p>
                        <p>{formatDate(studAssignment.ASSIGNMENT.limitCompleteDate)}</p>
                    </div>
                </div>
                {/* <div className='lineaContenido'>
                    <hr color='#CED4DA' className='linea'/>
                </div> */}
            </div>
        </div>
        <div className='contenedorFoto'>
            <div className='fotoPersona'>
                {
                    revisor && revisor.USER && revisor.USER.photo && revisor.USER.photo.data ?
                        <img className="foto" 
                        src={`data:image/png;base64,${Buffer.from(revisor.USER.photo.data).toString('base64')}`} 
                        alt='foto asesor' />
                        :
                        <img className="foto" 
                        src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                        alt='foto asesor' />
                }
                {/* <img
                    src='https://www.nosinmujeres.com/wp-content/uploads/2019/08/Mariel-R.-Lucero.jpeg'
                    className='foto' 
                    alt='foto asesor'/> */}
            </div>
            <div className='informacion'>
                <p className='fw-bold'>Asesor</p>
                <p className='tesis'>{props.courseName}</p>
                <p className='nombreUsuario'>{createCompleteName(revisor.USER.name, revisor.USER.fLastName, revisor.USER.mLastName)}</p>
                <p className='area'>{capitalizeTitle(revisor.USER.USER_X_SPECIALTies ? capitalizeTitle(revisor.USER.USER_X_SPECIALTies[0].SPECIALTY.name) : "No hay titulo")}</p>
            </div>
        </div>
    </div>
  )
}
