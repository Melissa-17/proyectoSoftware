import React, { useEffect } from 'react';
import '../../../../assets/styles/Coordinador/Semestres/Principal.css';
import moment from 'moment';
import { useState } from 'react';
import { axiosGetSemestres } from '#API/Semestres.js';
import {axiosGetCursos} from '#API/Cursos.js'; 
import { getValorEstado } from '#Helpers/getValorEstado';
import Card from './CardCurso'
import { axiosGetCoursebySemesterId } from '#API/Semestres.js';

export default function ContenedorCursos(props){

    const {courseList} = props;
    // console.log(courseList);
    
    return(
        
        <div className='contenedordeSemestre'>
            <div className='contenedorCursos'>
                {courseList ?
                    courseList.map((course, index) => {
                        // const valorEstado = getValorEstado(curso.status);
                        return(
                            <div key ={index} className='espaciado'>

                                <Card
                                    course={course}
                                />
                            </div>
                        )

                    })
                    :
                    <p>Seleccione un semestre</p>
                }
                
            </div>
        </div>

    )
}