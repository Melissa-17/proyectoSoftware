import React from "react";
import HeaderPortfolio from "./HeaderPortfolio";
import "#Styles/Adviser/SecondScreenPortfolio/SecondPortfolio.css";
import CreateNewUserPageStudent from "#Pages/CreateNewUserPage/Student";
import Assignment from "./Assignment";
import Avance from "./Avance";
import { useLocation } from "react-router";
import { createCompleteName, capitalizeTitle, capitalize } from '#Helpers/stringHelpers';
import { Buffer } from "buffer";

function SecondPortfolio() {
  const location = useLocation();
  const { student, course } = location.state;
      // console.log(student.USER_X_SPECIALTies);
      console.log(course);

  
  return (
    (student && course) ?
    <div className="mainContainer">
      {/* {console.log(student)} */}
      <CreateNewUserPageStudent />
      <div className="contenedorSecondPortafolio">
        <HeaderPortfolio />
        <div className="contenedorSubContenedor">
          <div className="subContainer">
            <div className="studentContainer">
              {student.photo ? (
                <img
                  className="profile"
                  src={`data:image/png;base64,${Buffer.from(
                    student.photo.data
                  ).toString("base64")}`}
                  alt="profile-pic"
                />
              ) : (
                <img
                  className="profile-img"
                  // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  src="https://wallpapercave.com/uwp/uwp2417748.png"
                  alt="foto asesor"
                />
              )}
              <div className="data">
                <p className="nombreData">
                  {/* {console.log(student.alumnos[0].USER.photo)} */}
                  <strong>
                  {createCompleteName(student.name, student.fLastName, student.mLastName)}
                  </strong>
                </p>
                <p className="facultadData">
                {capitalizeTitle(
              student.SPECIALTies[0]
                ? student.SPECIALTies[0].name 
                : "No tiene especialidad.") }
                </p>
              </div>
            </div>
            <div className="courseGroup">
              <p className="TesisCourse">
                {course.COURSE ? course.COURSE.name : "TESIS I"}
              </p>
            </div>
          </div>
        </div>

        <div className="contentContainer">
          <div className="contenedorAdvance">
            <Avance 
            student={student}
            course={course}
            />
          </div>

          <div className="contenedorAssigment">
            <Assignment 
            student={student}
            course={course}
            />
          </div>
        </div>
      </div>
    </div>
    :
    null
  );
}

export default SecondPortfolio;
