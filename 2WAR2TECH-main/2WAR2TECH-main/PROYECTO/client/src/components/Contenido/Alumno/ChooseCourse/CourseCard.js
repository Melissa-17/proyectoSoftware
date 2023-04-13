import React, { useContext } from "react";
import "#Styles/Alumno/ChooseCourse/CourseCard.css";
import { useNavigate } from "react-router";
import { GridLoader } from "react-spinners";
// import { CourseIdContext } from '#Context/courseIdContext';

function CourseCard(props) {
  const { course } = props;
  const navigate = useNavigate();

  
  // const [idCoursectx, setIdCoursectx] = useContext(CourseIdContext);

  const goToCourse = () => {
    navigate("/mycourses/selection", {
        state: {
            cxsid: course.id,
            courseName: course && course.COURSE && course.COURSE.name ? course.COURSE.name : "No tiene nombre",
            // idCourse: course.id,
            // idSemester: course.SEMESTERId,
        }
    });
    
  };
  
  return (
    course ? 
    <button className="courseBtn" onClick={goToCourse}>
      <div className="cardContainer">
        <p className="cardTitle">{course.COURSE && course.COURSE.name ? course.COURSE.name : "No tiene nombre" } - {course && course.abbreviation ? course.abbreviation : "H-300"}</p>
        <i class="bi bi-hand-index">Ver entregables</i>
      </div>
    </button>
    :
    <GridLoader
        className="mx-auto"
        color="#042354"
        // loading={isLoading}
        size={24}
      />
  );
}

export default CourseCard;
