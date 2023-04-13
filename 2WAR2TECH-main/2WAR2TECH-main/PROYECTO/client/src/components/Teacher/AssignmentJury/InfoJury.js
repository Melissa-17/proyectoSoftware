import React, { useState } from "react";
import '#Styles/Teacher/AssignmentJury/InfoJury.css';
import { Buffer } from "buffer";

export default function InfoJury(props){

  const jurado = props.jurado;
  const fullName = jurado.name +' '+jurado.fLastName+' '+jurado.mLastName;
  //console.log(jurado);
  //console.log(props.esSeleccionado);
  const [seleccionado, setSeleccionado] = useState(false);

  const cambiarEstado = ()=>{
    if(seleccionado===false)
      setSeleccionado(true);
    else if(seleccionado==true)
      setSeleccionado(false);
  }

  return(
    <button className={seleccionado?'main-box-info-jury-added':'main-box-info-jury-add'} onClick={()=>{props.accion(jurado);cambiarEstado()}}>
      <img className='foto-jurado-list'
      src={jurado.photo?
        `data:image/png;base64,${Buffer.from(jurado.photo.data).toString('base64')}`
        :
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
      }/>
      <p className='nombre-jurado-list'>{fullName}</p>  
      <p className='correo-jurado-list'>{jurado && jurado.email? jurado.email:'sincorreo@gmail.com'}</p>  
    </button>
  )
}