import React, { useState } from "react";
import "#Styles/Adviser/ThesisThemes/RequestStudentCard.css";
import { getUserPhoto } from '#Helpers/assignmentHelpers.js';

function RequestStudentCard(props) {
  const studentList = props.studentList;
  const { user } = props;

  // const [unAlumno, setUnAlumo] = useState(true);
  // if (studentList && studentList.length > 1) setUnAlumo(false);
  // const user = studentList && studentList[0] ? studentList[0] : null;
  // console.log(studentList)
  // console.log(user);

  return (
    studentList && user? 
    <div>
      {(studentList.length === 1) ? (
        <div className="studentCardRequest">
          <div className="studentCardPfp">
            {getUserPhoto(user ? user.photo : null)}
            {/* <img className="studentPfp" src={props.photo} alt="pfp" /> */}
          </div>
          <div className="studentCardData">
            <p className="studentName">
              <strong>{ user ? user.name + " " + user.fLastName + " " + user.mLastName : "No tiene nombre"}</strong>
            </p>
            <p className="studentSpecialty">{props.specialty}</p>
          </div>
        </div>
      ) : (
        <div className="studentCardRequest">
          <div className="studentCardPfp">
          {getUserPhoto(studentList[0] ? studentList[0].photo : null)}
          {getUserPhoto(studentList[1] ? studentList[1].photo : null)}
          </div>
          <div className="studentCardData">
            <p className="studentName">
              <strong>Grupo de Alumnos</strong>
            </p>
          </div>
        </div>
      )}
    </div>
    :
    null
  );
}

export default RequestStudentCard;
