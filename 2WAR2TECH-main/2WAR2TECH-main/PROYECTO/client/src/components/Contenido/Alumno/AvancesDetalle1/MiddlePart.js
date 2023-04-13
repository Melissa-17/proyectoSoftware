import React from 'react';
import UploadDoc from '../../../UploadDoc/UploadDoc';
import '../../../../assets/styles/Alumno/AvancesPrincipal/MiddlePart.css';
import { useNavigate } from 'react-router-dom';
import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import UploadDocAdviser from '../../../Adviser/UploadDoc/UploadDocAdviser.js';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function MiddlePart(props) {
    const navigate = useNavigate();
    const { docs, setDocs, isLoadingDocs, setIsLoadingDocs, isLoadingDocsRetro, setIsLoadingDocsRetro, cxsid, courseName,
    openConfirm, setOpenConfirm, assign } = props;

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
        let revisorId = assign && assign.userRIdlist && assign.userRIdlist[0] ?  assign.userRIdlist[0] : revisor.USER.id;
        navigate(`/rubrica/${props.id}/${props.opcion}/${revisorId}`,{
            state: {
                assignment: studAssignment,
                revisor: revisor,
                index: props.opcion,
                cxsid:cxsid,
                courseName:courseName
            }
        });
    }
    return (
        (props.assign && studAssignment && studAssignment.ASSIGNMENT) ? 
    <div className='parteIntermediaAvance'>
        <div className='trabajoIntermedioAvance'>
            <div className='contenidoTituloAvance'>
                <p className='tituloIntermedio'>Trabajo</p>
                <p className='estadoIntermedio'>{studAssignment.status}</p>
            </div>
            
            <div className='botoneriaAvance'>
                <UploadDoc 
                assign={studAssignment}
                docs={docs}
                setDocs={setDocs}
                isLoadingDocs={isLoadingDocs}
                setIsLoadingDocs={setIsLoadingDocs}
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                />
                {/* <button className='anhadir'>
                    + Añadir o crear
                </button> */}
                {/* <button className='entregar'>
                    Entregar
                </button> */}
            </div>
        </div>
        <div className='areaLaborAvance'>
            <div className='encabezado'>
                <div className='tituloEncabezado'>
                    <i class="bi bi-person-square" />
                    <p className='retroIntermedio'>Retroalimentación</p>
                </div>
                <UploadDocAdviser assign={studAssignment} 
                isLoadingDocsRetro={isLoadingDocsRetro}
                setIsLoadingDocsRetro={setIsLoadingDocsRetro}
                revisaUsuario={()=>{return false;}}
                />
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
