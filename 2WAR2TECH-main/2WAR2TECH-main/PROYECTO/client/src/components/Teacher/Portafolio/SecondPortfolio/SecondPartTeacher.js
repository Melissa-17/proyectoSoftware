import React from 'react'
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student'
import { useLocation } from "react-router";
import { createCompleteName, capitalizeTitle, capitalize } from '#Helpers/stringHelpers';
import HeaderSecondTeacher from './HeaderSecondTeacher';
import '../../../../assets/styles/Teacher/Portafolio/SecondPart.css'
import Avance from './Avance';
import Assignment from './Assignment';
import { useParams } from 'react-router';

export default function SecondPartTeacher() {
    const location = useLocation();
    const { student, course } = location.state;
    const params = useParams();
  return (
    <div className='mainContainerTeacher'>
      <CreateNewUserPageStudent />
      <div className="contenedorSecondPortafolioTeacher">
        <HeaderSecondTeacher num ={params.num}/>
        <div className="contenedorSubContenedorTeacher">
          <div className="subContainerTeacher">
            <div className="studentContainerTeacher">
              <img
                src="https://lamenteesmaravillosa.com/wp-content/uploads/2022/03/mujer-ojos-cerrados-mano-corazon-768x512.jpg"
                alt="profile"
              />
              <div className="dataTeacher">
                <p className="nombreDataTeacher">
                  <strong>{createCompleteName(student.USER.name, student.USER.fLastName, student.USER.mLastName)}</strong>
                </p>
                <p className="facultadDataTeacher">{capitalizeTitle(student.USER.USER_X_SPECIALTies[0].SPECIALTY.name)}</p>
              </div>
            </div>
            <div className="spaceDataTeacher"></div>
            <div className="courseGroupTeacher">
              <p className="TesisCourseTeacher">
                {course.COURSE.name}
              </p>
            </div>
          </div>
        </div>

        <div className="contentContainerTeacher">
          <div className="contenedorAdvanceTeacher">
            <Avance 
            student={student}
            course={course}
            num={params.num}/>
          </div>

          <div className="contenedorAssigmentTeacher">
            <Assignment 
            student={student}
            course={course}
            num={params.num}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
