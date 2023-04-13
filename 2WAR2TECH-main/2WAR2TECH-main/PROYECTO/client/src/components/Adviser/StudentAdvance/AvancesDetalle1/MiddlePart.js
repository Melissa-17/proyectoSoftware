import React from 'react';
import UploadDoc from '../../../UploadDoc/UploadDoc.js';
import UploadDocAdviser from '../../UploadDoc/UploadDocAdviser.js';
// import '../../../../assets/styles/Alumno/AvancesPrincipal/MiddlePart.css';
import '../../../../assets/styles/Adviser/StudentAdvance/MiddlePart.css';
import { useNavigate } from 'react-router-dom';
import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function MiddlePart(props) {
    const navigate = useNavigate();

    const studAssignment = props.assign ? props.assign.studentAssignment : null;
    let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    const { revisaUsuario, isLoadingDocs, setIsLoadingDocs, isLoadingDocsRetro, setIsLoadingDocsRetro,
        openConfirm, setOpenConfirm } = props;
    
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };
    let revisor = JSON.parse(localStorage.getItem('asesor'));
    const getRevisorId = () => {
        if (user.ROLEs[0] && user.ROLEs[0].description == "Alumno")  {
          return revisor.USER.id;
        } else {
          return user.id;
        }
      }
      
    const rubricaClicAvance = () =>{
        var numer = props.opcion;
        navigate(`/rubricaAdviser/${props.valor}/${numer+3}/${getRevisorId()}`, {
            state: {
              assignment: studAssignment,
              revisor: revisor,
              index: props.index,
              student: props.student,
              course: props.course,
            },
          });
    }
    return (
        (props.assign && studAssignment && studAssignment.ASSIGNMENT) ? 
    <div className='parteIntermediaAvanceA'>
        <div className='trabajoIntermedioAvanceA'>
            <div className='contenidoTituloAvanceA'>
                <p className='tituloIntermedioA'>Trabajo</p>
                <p className='estadoIntermedioA'>{studAssignment.status}</p>
            </div>
            
            <div className='botoneriaAvanceA'>
                <UploadDoc assign={studAssignment}
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
        <div className='areaLaborAvanceA'>
            <div className='encabezadoA'>
                <div className='tituloEncabezadoA'>
                    <div className='nombreEncabezadoA'>
                        <i class="bi bi-person-square" />
                        <p className='retroIntermedioA'>Retroalimentación</p>
                    </div>
                    {/* <div className='espacio'></div> */}
                    <div className="botoneriaIntermedioA">
                        <UploadDocAdviser revisaUsuario={revisaUsuario} assign={studAssignment} 
                        isLoadingDocsRetro={isLoadingDocsRetro}
                        setIsLoadingDocsRetro={setIsLoadingDocsRetro}
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                        />
                    </div>
                </div>
            </div>

            <div className='puntajeIntermedioAvanceA'>
                <div className='tituloNotaA'>
                    <p>Nota</p>
                </div>
                <div className='notaIntermedioA'>
                <p>{getScore(studAssignment.score)}/{studAssignment.ASSIGNMENT.maxScore}</p>
                </div>
                <div className='botonRubricaA'>
                    <button className='rubricaIntermedioA' onClick={rubricaClicAvance}>
                        Rúbrica
                    </button>
                </div>
            </div>

        </div>
    </div>
    : null
  )
}
