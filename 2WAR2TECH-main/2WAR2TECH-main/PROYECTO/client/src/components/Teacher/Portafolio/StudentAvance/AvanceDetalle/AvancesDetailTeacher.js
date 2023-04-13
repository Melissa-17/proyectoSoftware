import React, {useState,useEffect} from 'react';
import '../../../../../assets/styles/Student/DetailPart/DelivDetail.css';
import { useNavigate, useLocation } from 'react-router-dom';
import InitialPart from './InitialPart';
import FinalPart from './FinalPart';
import MiddlePart from './MiddlePart';
import { useParams } from 'react-router-dom';
import { axiosGetFinalAssignmentDetail } from '#API/FinalAssignment.js';
import CreateNewUserPageStudent from '../../../../../pages/CreateNewUserPage/Student';

export default function AvancesDetailTeacher() {
  const navigate = useNavigate();
    const { student, course, index, num } = useLocation().state;
    var numero_num = num;

    const retrocesoClic = () =>{
        if(numero_num==2){
            navigate(`/teacher/alumno/avances/${numero_num}`, {
                state: {
                student: student,
                course: course,
                index: index
                }
            }); 
        }else{
            if(numero_num==1){
                navigate(`/jury/alumno/avances/${numero_num}`, {
                    state: {
                    student: student,
                    course: course,
                    index: index
                    }
                }); 
            }
        }
        
    }

    const params = useParams();
    var numero = parseInt(params.num);

    const [advance, setAdvance] = useState(null);
    const JWTtoken = sessionStorage.getItem('token');

    const getDetailAdvance = () => {
        axiosGetFinalAssignmentDetail(JWTtoken, params.id).then(
            (response) => {
                const data = response.data || '';
                setAdvance(data);
            }
        ).catch(error => {
            console.error(`Error Advance Detail: ${error}`);
        });
    };

    useEffect(() => {
        getDetailAdvance();
    }, []);
  return (
    <div className='contenedorDetalle'>
        <CreateNewUserPageStudent />
        <div className='contenedorEncabezadoDetalle'>
            <div className='contenedorTitutoDetalle'>
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
        
        <InitialPart 
        numero={params.num}
        assign={advance}/>
        <MiddlePart
        id = {params.id}
        opcion={numero}
        assign={advance}
        student={student}
        course={course}
        num={numero_num}
        />
        <FinalPart 
        id = {params.id}
        opcion={numero}
        assign={advance}
        />

    </div>
  )
}
