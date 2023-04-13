import React from "react";
import '#Styles/Teacher/Presentation/ThemeSelected.css';
import { Buffer } from "buffer";

export default function themeSelected (props){

    const theme = props.tema;
    const asesor = theme.USERs[0]? theme.USERs[0]:'';
    const students = props.estudiantes;
    const firstStudent = students[0].USER? students[0].USER:'';

    const asesorFullName = asesor.name + ' '+asesor.fLastName +' '+asesor.mLastName;
    const studentFullName = firstStudent.name + ' '+firstStudent.fLastName +' '+firstStudent.mLastName;
    return(
        <div className="main-info-s" >
            <div className="info-tema-s">
                <p className="nombre-tema-s">
                    {theme.title}
                </p>
                <p className="fecha-theme-s">
                    fecha de publicación: 04/03/2022
                </p>
            </div>
            <div className="info-asesor-theme-s">
                <img className="foto-asesor-theme-s"
                src={asesor.photo?
                    `data:image/png;base64,${Buffer.from(asesor.photo.data).toString('base64')}`
                    :
                    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                }/>
                <p className="nombre-asesor-s">{asesorFullName}</p>
                <p className="carrera-asesor-s">Ingenieria Informatica</p>
            </div>
            <div className="info-alumnos-theme-s">
                <img className="foto-alumno-theme-s"
                src={firstStudent.photo?
                    `data:image/png;base64,${Buffer.from(firstStudent.photo.data).toString('base64')}`
                    :
                    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                }/>
                <p className="nombre-alumno-s">{students.length<2?studentFullName:'Cuenta con más de un alumno asociado'}</p>
                <p className="carrera-alumno-s">Ingenieria Informatica</p>
            </div>
        </div>
    );
}