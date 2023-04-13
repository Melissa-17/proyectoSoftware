import React from "react";
import '#Styles/Teacher/AssignmentJury/InfoTheme.css';
import { Buffer } from "buffer";


export default function InfoTheme(props){
    const theme = props.theme;
    const asesor = theme.USERs[0]? theme.USERs[0]:'';
    const students = props.students;
    const firstStudent = students[0].USER? students[0].USER:'';
    const asesorFullName = asesor.name + ' '+asesor.fLastName +' '+asesor.mLastName;
    const studentFullName = firstStudent.name + ' '+firstStudent.fLastName +' '+firstStudent.mLastName;
    const id = props.idThesis;
    //console.log(props);
    return(
        <button className="main-info" onClick={() => props.seleccionarTema(id)}>
            <div className="info-tema">
                <p className="nombre-tema">
                    {theme.title}
                </p>
                <p className="fecha-theme">
                    fecha de publicación: 04/03/2022
                </p>
            </div>
            <div className="info-asesor-theme">
                <img className="foto-asesor-theme"
                src={asesor.photo?
                    `data:image/png;base64,${Buffer.from(asesor.photo.data).toString('base64')}`
                    :
                    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                }/>
                <p className="nombre-asesor">{asesorFullName}</p>
                <p className="carrera-asesor">Ingenieria Informatica</p>
            </div>
            <div className="info-alumnos-theme">
                <img className="foto-alumno-theme"
                src={firstStudent.photo?
                    `data:image/png;base64,${Buffer.from(firstStudent.photo.data).toString('base64')}`
                    :
                    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                }/>
                <p className="nombre-alumno">{students.length<2?studentFullName:'Cuenta con más de un alumno asociado'}</p>
                <p className="carrera-alumno">Ingenieria Informatica</p>
            </div>
        </button>
    );
}