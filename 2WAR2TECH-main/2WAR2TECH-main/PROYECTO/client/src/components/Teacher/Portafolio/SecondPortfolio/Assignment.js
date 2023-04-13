import React from 'react'
import { useLocation, useNavigate } from "react-router";
import '../../../../assets/styles/Teacher/Portafolio/Assignment.css'

export default function Assignment(props) {
    const navigate = useNavigate();
    const {student, course} = useLocation().state;
    var numero_num = props.num;

    const AssigmentClic = () => {
      if(numero_num == 2){
        navigate(`/teacher/alumno/partial/${numero_num}`,{
          state: {
            index: 1,
            student: student,
            course: course
          }
        });
      }else{
        if(numero_num==1){
          navigate(`/jury/alumno/partial/${numero_num}`,{
            state: {
              index: 1,
              student: student,
              course: course
            }
          });
        }
      }  
    }
  return (
    <button className="assingmentTeacher" onClick={AssigmentClic}>
      <div className="color"></div>
      <div className="contentTeacher">
        <div className="painted-boxTeacher"></div>
        <div className="text-entregableTeacher">
          <p className="titleTeacher">Entregables</p>
          <p className="summaryTeacher">
            Documentos correspondientes a los entregables del curso revisados por
            el profesor.
          </p>
        </div>
      </div>
    </button>
  )
}
