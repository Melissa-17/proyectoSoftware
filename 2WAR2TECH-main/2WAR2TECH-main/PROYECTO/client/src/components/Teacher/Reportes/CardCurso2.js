import React from "react";
import { useNavigate } from "react-router-dom";
import '#Styles/Teacher/Reporte/Card.css';


function CardCurso2(props) {
  const { course , semester, realCourse } = props;
  const navigate = useNavigate();

  const hizoclic = () => {
    navigate("/teacher/semestre/reporte/detail", { state: 
      {"course": course,
      "semester": semester,
      realCourse: realCourse
    }});
  
  };

  return (
    <button onClick={hizoclic} className="card-curso-rep">
      {/* <p>{course.name}</p> */}
      <p className="course-abrev">{course.abbreviation}</p>
    </button>
  );
}

export default CardCurso2;
