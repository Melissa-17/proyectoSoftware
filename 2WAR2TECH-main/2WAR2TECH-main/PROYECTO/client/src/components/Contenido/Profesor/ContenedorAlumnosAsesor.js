import React, { useEffect } from 'react';
import '#Styles/Teacher/Administration/listadoAlumno.css';
// import '../../../../assets/styles/Teacher/Administration/listadoAlumno.css';
import moment from 'moment';
import { useState } from 'react';
import { axiosGetSemestres } from '#API/Semestres.js';
import {axiosGetCursos} from '#API/Cursos.js'; 
import { getValorEstado } from '#Helpers/getValorEstado';
import RowAlumnoAsesor from './filaAlumnoAsesor';
import { axiosGetCoursebySemesterId } from '#API/Semestres.js';

export default function ContenedorAlumnosAsesor(props){

    const {alumnosList} = props;
    // console.log(courseList);
    
    return(
        
        <div className='contenedordeAlumnos'>
            {/* {console.log(alumnosList)} */}
            <div className='contenedorAlumno'>

                {
                
                alumnosList && alumnosList.length ?
                    alumnosList.map((alumno, index) => {
                        if (alumno.USER)
                            return(
                                <div key ={index} className='espaciado'>
                                    <RowAlumnoAsesor
                                        alumno={alumno}
                                    /> 
                                </div>
                        )

                    })
                    :
                    <p>No hay alumnos matriculados</p>
                }
                
            </div>
        </div>

    )
}