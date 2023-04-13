import React,{useContext, useState} from 'react';
import '#Styles/Teacher/Administration/listadoAlumno.css';
import { useNavigate } from 'react-router-dom';
// import { AppContext, useMyContext } from './Provider';
import { Buffer } from "buffer";

import { getScore, formatDate } from '#Helpers/assignmentHelpers.js';
import { getUserPhoto } from '../../../helpers/assignmentHelpers';

export default function RowAlumno(props) {

    const navigate = useNavigate();

    {/*const hizoclic = () =>{
        if(props.entregable == 1){
            navigate("/deliverable/detail");
        }
    } */}
    const {alumno, deleteStudentAdviser, setStudentAdviser}=props; 
    // console.log(alumno);
    const userId = alumno ? alumno.id:0;
    const nombre= alumno ? alumno.name:"nombre"
    const apellido1=alumno? alumno.fLastName:"apellido"
    const apellido2= alumno? alumno.mLastName:"apellido" 
    // const titulotesis= alumno.USER.USER_X_THEses && alumno.USER.USER_X_THEses[0] && alumno.USER.USER_X_THEses[0].THESIS &&
    // alumno.USER.USER_X_THEses[0].THESIS.title? alumno.USER.USER_X_THEses[0].THESIS.title:"No cuenta con tesis"
    const tesis = alumno && alumno.THEses?alumno.THEses[0]:null;
    const titulotesis = tesis?tesis.title:'No cuenta con tesis';

    const foto= alumno && alumno.USER && alumno.USER.photo? alumno.USER.photo : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    
    // --variables antiguas--
    // const titulotesis=   alumno.USER.USER_X_THEses&&alumno.USER.USER_X_THEses[0]&& alumno.USER.USER_X_THEses[0].THESIS.title? alumno.USER.USER_X_THEses[0].THESIS.title:"No cuenta con tesis";
    //const fechatesis=    alumno.USER.USER_X_THEses&&alumno.USER.USER_X_THEses[0]&&alumno.USER.USER_X_THEses[0].createdAt? formatDate(alumno.USER.USER_X_THEses[0].createdAt, "DD/MM/yy"):" ";
    //const fotodeasesor=alumno.asesor&&alumno.asesor[0]&&alumno.asesor[0].USER.photo?alumno.asesor[0].USER.photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    //const nomasesor= alumno.asesor&&alumno.asesor[0]&&alumno.asesor[0].USER.name?alumno.asesor[0].USER.name:"No cuenta con asesor";
    //const faasesor= alumno.asesor&&alumno.asesor[0]&&alumno.asesor[0].USER.fLastName?alumno.asesor[0].USER.fLastName:" ";
    //const saasesor= alumno.asesor&&alumno.asesor[0]&&alumno.asesor[0].USER.mLastName?alumno.asesor[0].USER.mLastName:" ";

    //nuevas variables
    const fechaAux= tesis && tesis.createdAt ? tesis.createdAt : null;
    const fechatesis = fechaAux? formatDate(fechaAux, "DD/MM/yy"):'';
    const arrAsesor = tesis && tesis.USER_X_THEses ?tesis.USER_X_THEses:null;
    const asesor = arrAsesor && arrAsesor[0] && arrAsesor[0].USER ?arrAsesor[0].USER:null;
    const fotodeasesor=asesor?asesor.photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const nomasesor= asesor?asesor.name:"No cuenta con asesor";
    const faasesor= asesor?asesor.fLastName:"No cuenta con asesor";
    const saasesor= asesor?asesor.mLastName:"No cuenta con asesor";

    const handleCheckDelete = (e, newId) => {
        if (e.currentTarget.checked) {
            setStudentAdviser([...deleteStudentAdviser, newId]);
        } else {
          const newList = deleteStudentAdviser.filter((assignId) => assignId !== newId);
          setStudentAdviser(newList);
        }
    };

  return (
    <button className='rowAlumno'>
        <div className='checkboxcontainer checkbox-lg'>
            <input 
            class= 'form-check-input' type="checkbox" value="" id="eliminarCheck"
            onChange={(e) => handleCheckDelete(e, userId)}
            defaultChecked={false}
            checked={deleteStudentAdviser.includes(userId)}
            />
        </div>
        <div className='usuariodata'>
            {
                getUserPhoto(alumno && alumno.USER && alumno.USER.photo ? alumno.USER.photo : null)
                // foto ?
                // <img className="fotoAlumno" 
                // src={`data:image/png;base64,${Buffer.from(alumno.USER.photo.data).toString('base64')}`} 
                //     alt='foto asesor' />
                //     :
                // <img className="fotoAlumno" 
                // src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                // alt='foto asesor' />
            }  
            {/* {"nombre detectado: "+console.log(nombre)}   */}
            <p>{nombre+' '+apellido1+' '+apellido2}</p>
        </div>
        <div className='usuariodata'>
            {/* <img src={ foto} class="rounded" /> */}
            {/* <img src={ fotodeasesor} class="rounded" /> */}
            {
                alumno && alumno.asesor&&alumno.asesor[0]&&alumno.asesor[0].USER.photo &&alumno.asesor[0].USER.photo.data ?
                <img className="fotoAlumno" 
                src={`data:image/png;base64,${Buffer.from(alumno.asesor[0].USER.photo.data).toString('base64')}`} 
                    alt='foto asesor' />
                    :
                <img className="fotoAlumno" 
                src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                alt='foto asesor' />
            }
            <p>{asesor ? nomasesor+' '+faasesor+' '+saasesor : "No cuenta con un asesor asignado."}</p>
        </div>
        <div className='textboxtitulo'>
            <h4>{titulotesis}</h4>
            <p>{fechatesis}</p>

        </div>
    </button>
  )
}

