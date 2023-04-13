import React from 'react';
import '../../../assets/styles/Student/InfoPresentation/FeedbackRow.css';
import { createCompleteName, capitalizeTitle } from "#Helpers/stringHelpers.js";
import { Buffer } from "buffer";
import { getScore } from '#Helpers/assignmentHelpers.js';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function FeedbackRow(props){
  let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    let revisor = JSON.parse(localStorage.getItem('asesor'));
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };
  const studAssignment = props.assign ? props.assign.studentAssignment : null;
  return(
    revisor ? 
    <div className='main-row'>
      <div className='info-asesor'>
        <div className='photo'>
          {revisor.photo ? (
            <img
              className="img-asesor"
              src={`data:image/png;base64,${Buffer.from(
                revisor.photo.data
              ).toString("base64")}`}
              alt="foto asesor"
            />
          ) : (
            <img
              className="img-asesor"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="foto asesor"
            />
          )}
        </div>
        <div className='separadorFeedBack'/>
        <div className='asesor'>
          <p className='cargo'>Asesor:</p>
          <p className='name'>
            {createCompleteName(
              revisor.name,
              revisor.fLastName,
              revisor.mLastName
            )}
          </p>
        </div>
      </div>
      <div className='feedback'>
        <p className='feeback-state'>Aún no hay Retroalimentación</p>
      </div>
      <div className='grade'>
        <p className='grade-text'>{getScore(studAssignment.score)}/{studAssignment.ASSIGNMENT.maxScore}</p>
      </div>
    </div>
    : 
    null
  ); 
};