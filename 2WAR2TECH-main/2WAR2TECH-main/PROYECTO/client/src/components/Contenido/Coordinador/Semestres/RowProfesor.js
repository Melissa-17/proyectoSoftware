import React,{useContext, useState} from 'react';
import '#Styles/Coordinador/Semestres/RowProfesor.css';
import { useNavigate } from 'react-router-dom';

// import { AppContext, useMyContext } from './Provider';

export default function RowProfesor(props) {


    const navigate = useNavigate();

  return (
    <button 
    className='rowProfesor'>
    {/* onClick={hizoclic}> */}
        <div>
            {/* <p >Profesor &nbsp; </p> 
            <p className='numero'>
                {props.numero}
            </p> */}
           <div class="image-cropper">
            <img src={props.foto ? props.foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png"} class="rounded" />
            </div>
            <div className='info'>
            <h1>{props.nombre} {props.apellido1}  {props.apellido2}</h1> 
            <p>{props.idpucp}</p>
            </div>
        </div>
        {/* aqui colocare los demás iconos*/}
        <button type="button" className='buttontrash' onClick={() => props.handleProfesorDelete(props.id)}><i class="bi bi-trash3"></i></button>
    </button>
  )
}