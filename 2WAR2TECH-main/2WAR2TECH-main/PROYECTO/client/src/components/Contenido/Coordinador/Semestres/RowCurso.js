import React,{useCallback, useContext, useEffect, useState} from 'react';
import '#Styles/Coordinador/Semestres/Pantalla.css';
import { useNavigate } from 'react-router-dom';

// import { AppContext, useMyContext } from './Provider';

export default function Row(props) {

  

  const navigate = useNavigate();

  const { course, courseList, setCourseList, handleCourseDelete } = props;
  return (
    <button 
    className='rowCurso'
    key={course.COURSE.id}>
    {/* onClick={hizoclic}> */}
        <div>
            <p>{course.COURSE.name}</p> 
        </div>
        {/* aqui colocare los demás iconos*/}
        <button className='buttontrash' onClick={() => handleCourseDelete(course.COURSEId)}><i className="bi bi-trash3"></i></button>
    </button>
  )
}