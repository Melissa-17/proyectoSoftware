import React from 'react';
import UploadDoc from '../../../../UploadDoc/UploadDoc';
import '../../../../../assets/styles/Alumno/AvancesPrincipal/MiddlePart.css';
import { useNavigate } from 'react-router-dom';
import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function MiddlePart(props) {
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

    const rubricaClicAvance = () =>{
        navigate(`/rubricaTeacher/${props.id}/${props.opcion+3}/${revisor.USER.id}`,{
            state: {
                assignment: studAssignment,
                revisor: revisor,
                index: props.index,
                student: props.student,
                num:props.num,
                course: props.course
            }
        });
    }
    return (
    (props.assign && studAssignment  && studAssignment.ASSIGNMENT) ? 
    <div className='parteIntermediaAvance'>
        <div className='trabajoIntermedioAvance'>
            <div className='contenidoTituloAvance'>
                <p className='tituloIntermedio'>Trabajo</p>
                <p className='estadoIntermedio'>Asignado</p>
            </div>
            
            <div className='botoneriaAvance'>
                <UploadDoc assign={studAssignment}/>
            </div>
        </div>
        <div className='areaLaborAvance'>
            <div className='encabezado'>
                <div className='tituloEncabezado'>
                    <i class="bi bi-person-square" />
                    <p className='retroIntermedio'>Retroalimentación</p>
                </div>
            </div>

            <div className='puntajeIntermedioAvance'>
                <div className='tituloNota'>
                    <p>Nota</p>
                </div>
                <div className='notaIntermedio'>
                <p>{getScore(studAssignment.score)}/{studAssignment.ASSIGNMENT.maxScore}</p>
                </div>
                <div className='botonRubrica'>
                    <button className='rubricaIntermedio' onClick={rubricaClicAvance}>
                        Rúbrica
                    </button>
                </div>
            </div>

        </div>
    </div>
    : null
  )
}
