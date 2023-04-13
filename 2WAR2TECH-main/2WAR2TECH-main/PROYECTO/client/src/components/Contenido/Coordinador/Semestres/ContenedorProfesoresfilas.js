import React, { useEffect } from 'react';
import '../../../../assets/styles/Coordinador/Semestres/Principal.css';
import '../../../../assets/styles/Coordinador/Semestres/Pantalla.css';
import moment from 'moment';
import { useState } from 'react';
import { axiosGetSemestres } from '#API/Semestres.js';
import { getValorEstado } from '#Helpers/getValorEstado';
import Card from './CardCurso'
import RowProfesor from './RowProfesor';
export default function ContenedorProfesoresfilas(props){
    
    const JWTtoken = localStorage.getItem('token');
    // const handleCourseDelete = (courseId) => {
    //     const newCourseList = courseList.filter((course) => {
    //         // console.log(course.COURSEId);
            
    //         return course.COURSEId !== courseId;
    //         // return true;
    //     })
    //     setCourseList(newCourseList);
    //     console.log(courseList);
    // }
    const { selectedProfesorList, setSelectedProfesorList, handleProfesorDelete } = props;
    return(
        <div className='contenedordeSemestre'>
            <div className='contenedorfilas'>
                {selectedProfesorList.map((profesor, index) => 
                    {
                    return (<div key={index} className='espaciado'>
                    <RowProfesor 
                            // TODO: handleCourseDelete={handleCourseDelete}  + Foto
                            id={profesor.id}
                            handleProfesorDelete={handleProfesorDelete}
                            foto={profesor.photo ? profesor.photo : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            nombre={profesor.name + ' ' + profesor.fLastName + ' ' + profesor.mLastName}
                            especialidad={profesor.SPECIALTies[0].name} 
                            />
                    </div>)
                    }
                )}
               
            </div>
        </div>
    )
}