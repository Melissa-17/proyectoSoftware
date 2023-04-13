import React, { useEffect } from 'react';
import '#Styles/Teacher/Administration/listadoAlumno.css';
// import '../../../../assets/styles/Teacher/Administration/listadoAlumno.css';
import moment from 'moment';
import { useState } from 'react';
import { axiosGetSemestres } from '#API/Semestres.js';
import {axiosGetCursos} from '#API/Cursos.js'; 
import { getValorEstado } from '#Helpers/getValorEstado';
import RowAlumno from './filaAlumno';
import { axiosGetCoursebySemesterId } from '#API/Semestres.js';

export default function ContenedorAlumnosAdmin(props){

    // const {studentList, deleteStudentAdviser, setStudentAdviser} = props;
    // console.log(courseList);
    
    // return(
        
        

    // )
}