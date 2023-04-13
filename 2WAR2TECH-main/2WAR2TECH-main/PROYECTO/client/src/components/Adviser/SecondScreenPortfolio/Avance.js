import React from "react";
import { useNavigate,useLocation } from "react-router";
import '#Styles/Adviser/SecondScreenPortfolio/Avance.css'

export default function Avance() {
    const navigate = useNavigate();
    const {student, course} = useLocation().state;

    const AvanceClic = () => {
        navigate(`/revisor/alumno/avances`,{
          state: {
            index: 1,
            student: student,
            course: course
          }
        });
    }
  return (
    <button className="Avance" onClick={AvanceClic}>
      <div className="color"></div>
      <div className="contentAvance">
        <div className="painted-box">
        </div>
        <div className="text-avance">
          <p className="title">Avances semanales</p>
          <p className="summary">
            Avances semanales de los alumnos que le permitirán a su asesor hacer
            una corrección más flexible.
          </p>
        </div>
      </div>
    </button>
  );
}
