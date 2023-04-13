import React from "react";
import '../../../assets/styles/Adviser/SecondScreenPortfolio/Assignment.css'
import { useLocation, useNavigate } from "react-router";

export default function Assignment(props) {
    const navigate = useNavigate();
    const {student, course} = useLocation().state;

    const AssigmentClic = () => {
        navigate(`/revisor/alumno/partial`,{
          state: {
            index: 1,
            student: student,
            course: course
          }
        });
    }
  return (
    <button className="assingment" onClick={AssigmentClic}>
      <div className="color"></div>
      <div className="contentAssignment">
        <div className="painted-box"></div>
        <div className="text-entregable">
          <p className="title">Entregables</p>
          <p className="summary">
            Documentos correspondientes a los entregables del curso revisados por
            el profesor.
          </p>
        </div>
      </div>
    </button>
  );
}
