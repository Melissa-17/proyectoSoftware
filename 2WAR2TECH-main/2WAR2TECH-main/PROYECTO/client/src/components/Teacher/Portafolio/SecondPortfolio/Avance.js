import React from 'react'
import { useNavigate,useLocation } from "react-router";
import '../../../../assets/styles/Teacher/Portafolio/Avance.css';

export default function Avance(props) {
    const navigate = useNavigate();
    const {student, course} = useLocation().state;

    const AvanceClic = () => {
      if(props.num==2){
        navigate(`/teacher/alumno/avances/${props.num}`,{
          state: {
            index: 1,
            student: student,
            course: course
          }
        });
      }else{
        if(props.num==1){
          navigate(`/jury/alumno/avances/${props.num}`,{
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
    <button className="AvanceTeacher" onClick={AvanceClic}>
      <div className="color"></div>
      <div className="contentTeacher">
        <div className="painted-boxTeacher">
        </div>
        <div className="text-avanceTeacher">
          <p className="titleTeacher">Avances semanales</p>
          <p className="summaryTeacher">
            Avances semanales de los alumnos que le permitirán a su asesor hacer
            una corrección más flexible.
          </p>
        </div>
      </div>
    </button>
  )
}
