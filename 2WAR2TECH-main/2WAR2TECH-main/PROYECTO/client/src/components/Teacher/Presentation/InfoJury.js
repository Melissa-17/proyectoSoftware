import React, {useState} from "react";
import '#Styles/Teacher/Presentation/InfoJury.css';
import { Buffer } from "buffer";

export default function InfoJury(props){
    const [cambio, setCambio] = useState(props.esSeleccionado);
    const jury = props.jury
    const fullName = jury.name +' '+jury.fLastName + ' '+jury.mLastName;
    const cambioEstado = () =>{
        if(cambio==true) setCambio(false);
        else if(cambio==false) setCambio(true);
    }

    return(
        <button className={cambio?"main-box-jurySeleccionado":"main-box-jury"} onClick={()=>{cambioEstado(); props.handleSelectJury(jury);}}>
            <img className="foto-jurado-info" 
            src={jury.photo?
                `data:image/png;base64,${Buffer.from(jury.photo.data).toString('base64')}`
                :
                'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                }/>
            <p className="nombre-jurado">{fullName}</p>
            <p className="carrera-jurado">{jury.SPECIALTies? jury.SPECIALTies[0].name:''}</p>
            <p className="correo-jurado">{jury.email?jury.email:'sincorreo@pucp.edu.pe'}</p>
        </button>
    );
}