import React, { useState } from "react";
import '#Styles/Teacher/Presentation/Card.css';
import { useNavigate } from "react-router";
import { Buffer } from "buffer";

export default function Card (props){

  const navigate = useNavigate();

  const {thesis, semesterId, courseId} = props;
  // console.log(thesis);
  const [userList, setUsersList] = useState([]);
  const usuarios = thesis?thesis.USERs:[];
  const student = usuarios?usuarios[0]:'';
  const nameStudent = student.name +' '+student.fLastName+' '+student.mLastName; 
  console.log(usuarios);
 
  const goDetail = () =>{
    navigate('/teacher/presentation/detailPresentationTeacher',{
      state:{
        semesterId:semesterId,
        courseId:courseId,
        thesis:thesis,
      }
    });  
  }

  return(
    <button className='main-box-card' onClick={goDetail}>
      <div className='info-alumno-card'>
        <div className='nombre-especialidad-card'>
          <p className='nombre-alumno-card'>{
            usuarios.length>1?
            'Cuenta con más de un alumno'
            :
            nameStudent
          }</p>
          <p className='especialidad-alumno-card'>Ingeniería informatica</p>
        </div>
        <img className='imagen-alumno-card'
          src={
            student.photo && usuarios.length<2
                        ? `data:image/png;base64,${Buffer.from(
                            student.photo.data
                          ).toString("base64")}`
                        : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          }/>
      </div>
      {/* <hr className='separador-alumno-tesis'/> */}
      <div className='info-tesis-card'>
        <p className="tema-tesis-card">
          {thesis.title}
        </p>
      </div>
    </button>
  );
}