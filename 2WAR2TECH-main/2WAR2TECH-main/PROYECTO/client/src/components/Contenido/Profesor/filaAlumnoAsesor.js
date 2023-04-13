import React,{useContext, useState} from 'react';
import '#Styles/Teacher/Administration/listadoAlumnodeAsesor.css';
import { useNavigate } from 'react-router-dom';
// import { AppContext, useMyContext } from './Provider';
import { Buffer } from "buffer";
import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import '#Styles/Teacher/Administration/listadoAlumno.css';
export default function RowAlumnoAsesor(props) {

    const navigate = useNavigate();

    {/*const hizoclic = () =>{
        if(props.entregable == 1){
            navigate("/deliverable/detail");
        }
    } */}
    const {alumno}=props; 
    // console.log(alumno);
    const nombre=alumno&&alumno.USER && alumno.USER.name? alumno.USER.name:"No tiene nombre"
    const apellido1=alumno&&alumno.USER && alumno.USER.fLastName? alumno.USER.fLastName:""
    const apellido2= alumno&&alumno.USER && alumno.USER.mLastName? alumno.USER.mLastName:"" 
    const titulotesis= alumno&&alumno.THESIS && alumno.THESIS.title ? alumno.THESIS.title.toUpperCase():"No cuenta con tesis"

    const foto= alumno&&alumno.USER &&alumno.USER.photo? alumno.USER.photo : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    // const titulotesis=   alumno.USER.USER_X_THEses&&alumno.USER.USER_X_THEses[0]&& alumno.USER.USER_X_THEses[0].THESIS.title? alumno.USER.USER_X_THEses[0].THESIS.title:"No cuenta con tesis";
    const fechatesis=  alumno&& alumno.THESIS&&alumno.THESIS.updatedAt? formatDate(alumno.THESIS.updatedAt, "DD/MM/yy"):" ";
    

  return (
    <button className='rowAlumnoAsesor'>
        <div className='usuarioalumno'>
            {
                alumno.USER && alumno.USER.photo ?
                <img className="fotoAlumno" 
                src={`data:image/png;base64,${Buffer.from(alumno.USER.photo.data).toString('base64')}`} 
                    alt='foto asesor' />
                    :
                <img className="fotoAlumno" 
                src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                alt='foto asesor' />
            }  
             
            <p>{nombre+' '+apellido1+' '+apellido2}</p>
        </div>
        
        <div className='textboxtituloAsesor'>
            <h4>{titulotesis}</h4>
            <p>{"Fecha de publicacion:  "+fechatesis}</p>

        </div>
    </button>
  )
}

