import React, { useState } from "react";
import { useNavigate } from "react-router";
import RequestStudentCard from "./RequestStudentCard";
import "#Styles/Adviser/ThesisThemes/RequestThesisCard.css";

function RequestThesisCard(props) {
  const navigate = useNavigate();
  const thesis = props.thesis;
  const studentList = props.student;
  const { owner, index } = props; 
  const seeClic = () => {
    navigate("/asesor/requestDetail", {
      // state: thesis.id,
      // studentList: studentList,
      state:{
        thesisId: thesis.id,
        studentList: studentList,
      }
    });
  };
  // console.log(studentList.length)
  return thesis ? (
    <button className="RequestCardContainer" onClick={seeClic}>
      <div className="RThesisTitle">
        <p>{thesis.title.toUpperCase()}</p>
      </div>
      <div className="RequestStudent">
        {
          owner ? 
          <div>
              <p className="title">
                <strong>Grupo Elegido</strong>
              </p>
              <div className="studentCardSelect">
                <RequestStudentCard studentList={studentList[index]} user={owner}/>
              </div>
          </div>
          : null
        }
        <p className="title">
          <strong>Alumnos solicitando</strong>
        </p>
        <div className="studenCardMenu">
          {studentList && studentList.length ? (
            studentList.map((team, index) => {
              const user =team 
              && team[0] && team[0].USER_X_THESIS &&
              team[0].USER_X_THESIS.USER ?
              team[0].USER_X_THESIS.USER :
              null; 
              // console.log(`user ${index}: ${JSON.stringify(user, null, 2)}`);
              return team 
              && team[0] && team[0].USER_X_THESIS 
              && team[0].USER_X_THESIS.type == "STUDENT_APPLICANT" ? 
              (<RequestStudentCard studentList={team} user={user}/>) 
              : null;
            })
          ) : (
            <div className="NoHayAlumnoContenedor">
              <div className="content">
                <i class="bi bi-dash-circle fa-2x"></i>
                <p> Aún no hay alumnos solicitando este tema</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  ) : null;
}

export default RequestThesisCard;
