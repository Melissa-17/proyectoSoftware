import React from 'react';
import { useNavigate } from "react-router-dom";
import '#Styles/Teacher/CourseManagement/CourseCard.css'

function CourseCard(props) {
    const navigate = useNavigate();
    const {cxs,horario, semesterId, courseId} = props;
    // const courseId = course?course.COURSEId:'';

    const seeTimeline = () => {
        navigate("/timeline", {
            state: {
                cxsid: cxs,
            }
            
        });
    }
    const seeQualification = () => {

    navigate("/course/mark", {
            state: {
                cxsid: courseId,
                semid: props.semesterId,
            }
            
        });
    }

    const seeExpo = () => {
        navigate("/teacher/presentation", {
            state: {
                courseId: courseId,
                semesterId: semesterId
            }
            
        });
    }
    const seeConfigUser = () => {
        navigate("/teacher/Administration", {
            state: {
                cxsid: cxs,
            }
            
        });
    }

    const seeAssignment = () =>{
        navigate('/teacher/assignment',{
            state: {
                courseId: courseId,
                semesterId: semesterId
            }
        });
    }
    // console.log(course);
  return (
    <div className='courseCardContainer'>
        <div className='CCTitle text-center'>
            <p>{(horario.abbreviation)}</p>
            <p className='fs-6'>{(horario ? horario.name : "No tiene nombre").toUpperCase()}</p>
        </div>
        <div className='CCButtons'>
            <button className='CCBTimeline' onClick={seeTimeline}>
                CRONOGRAMA
            </button>
            <button className='CCBTimeline' onClick={seeQualification}>
                CALIFICACIÓN
            </button>
            <button className='CCBTimeline' onClick={seeExpo}>
                EXPOSICIONES
            </button>
            <button className='CCBTimeline' onClick={seeAssignment}>
                ASIGNACIÓN DE JURADOS
            </button>
            <button className='CCBTimeline' onClick={seeConfigUser}>
                GESTION PERSONAS
            </button>
        </div>
    </div>
  )
}

export default CourseCard