import React, { useCallback, useEffect } from 'react';
import '../../../../assets/styles/Coordinador/Semestres/Principal.css';
import '../../../../assets/styles/Coordinador/Semestres/Pantalla.css';
import moment from 'moment';
import { useState } from 'react';
import { axiosGetSemestres } from '#API/Semestres.js';
import { getValorEstado } from '#Helpers/getValorEstado';
import Card from './CardCurso'
import Row from './RowCurso'
export default function ContenedorCursosfilas(props){
    
    const JWTtoken = localStorage.getItem('token');
    
    const {courseList, setCourseList, handleCourseDelete} = props;
    
    return(
        <div className='contenedordeSemestre'>
            <div className='contenedorfilas'>
                {
                    console.log("estamos dentro del contenedor de filas") 
                }
                {
                    console.log(courseList)
                }
                {
                    courseList ? 
                    courseList.map((course, index) => {
                        return(
                            <div key ={index} className='espaciado'>
                                <Row
                                    course={course} 
                                    courseList={courseList}
                                    setCourseList={setCourseList}
                                    handleCourseDelete={handleCourseDelete}
                                />
                            </div>
                        )

                    })
                    :
                    <p>Aún no hay cursos</p>
                }
                
            </div>
        </div>
    )
}