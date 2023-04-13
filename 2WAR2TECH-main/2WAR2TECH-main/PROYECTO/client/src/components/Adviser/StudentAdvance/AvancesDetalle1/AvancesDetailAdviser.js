import React, {useState,useEffect, useContext} from 'react';
import '../../../../assets/styles/Adviser/StudentDetailPart/DelivDetail.css';
import { useNavigate, useLocation } from 'react-router-dom';
import InitialPart from './InitialPart';
import FinalPart from './FinalPart';
import MiddlePart from './MiddlePart';
import { useParams } from 'react-router-dom';
import { axiosGetFinalAssignmentDetail } from '#API/FinalAssignment.js';
import Navbar from '../../../SidebarMenu/Navbar';
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student';
import { UserContext } from "#Context/userContext";

export default function AvancesDetailAdviser() {

    const navigate = useNavigate();
    const { student, course, index } = useLocation().state;
    const [evaluadores, setEvaluadores] = useState(null);
    const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [isLoadingDocsRetro, setIsLoadingDocsRetro] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
    let revisaUsuario = false;
    let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem('user'));

    const retrocesoClic = () =>{
        navigate("/revisor/alumno/avances", {
            state: {
              student: student,
              course: course,
              index: index
            }
        });
    }

    const params = useParams();
    var numero = parseInt(params.num);

    const [advance, setAdvance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openAlert, setOpenAlert] = useState(false);
    const JWTtoken = sessionStorage.getItem('token');

    const getDetailAdvance = () => {
        axiosGetFinalAssignmentDetail(JWTtoken, params.id).then(
            (response) => {
                const data = response.data || '';
                setAdvance(data);
                setEvaluadores(data.studentAssignment.ASSIGNMENT.ASSIGNMENT_X_ROLEs.filter((e) => {
                    // console.log(e.name == 'Evaluador');
                    return e.name =='Evaluador';
                  }).map((e) => {return e.ROLE;}));
                setIsLoading(false);
            }
        ).catch(error => {
            console.error(`Error Advance Detail: ${error}`);
        });
    };
    const showVistoBueno = () => {
        evaluadores.map(e => {
          revisaUsuario = revisaUsuario || e.id == user.ROLEs[0].id;
        })
        // Rol es asesor y no lo revisa
        // console.log(user.ROLEs[0].description == 'Asesor' && !revisaAsesor);
        // console.log(revisaUsuario);
        return revisaUsuario;  // rol q revisa es el usuario conectado
      }

    useEffect(() => {
        getDetailAdvance();
    }, [openConfirm, openAlert]);

  return (
    !isLoading &&
    <div className='contenedorDetalle'>
        <CreateNewUserPageStudent />
        <div className='contenedorEncabezadoDetalle'>
            <div className='contenedorTitutoDetalle'style={{marginRight:"530px"}}>
                <h1 className='titulo'>AVANCES</h1>
            </div>
            <button
            onClick={retrocesoClic}
            className='botonRetrocesoDetalle'>
                <img 
                src='https://cdn-icons-png.flaticon.com/512/2223/2223615.png'
                className='imagenRetrocesoDetalle'/>
            </button>
        </div>
        
        <div className='contenedorLineaDetalle'>
            <hr color='#CED4DA' className='linea'/>
        </div>
        
        {/* {console.log(student)} */}

        <InitialPart 
        numero={params.num}
        assign={advance}/>
        <MiddlePart
        valor={params.id}
        id = {params.id}
        opcion={numero}
        assign={advance}
        course={course}
        student={student}
        index={index}
        revisaUsuario={showVistoBueno}
        isLoadingDocs={isLoadingDocs}
        setIsLoadingDocs={setIsLoadingDocs}
        isLoadingDocsRetro={isLoadingDocsRetro}
        setIsLoadingDocsRetro={setIsLoadingDocsRetro}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        />
        <FinalPart 
        id = {params.id}
        opcion={numero}
        assign={advance}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        />

    </div>
  )
}

