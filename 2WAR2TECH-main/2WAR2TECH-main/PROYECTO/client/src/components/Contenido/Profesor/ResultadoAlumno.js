import React,{useContext, useState} from 'react';
import '#Styles/Coordinador/Semestres/ResultadoProfesor.css';
import { useNavigate } from 'react-router-dom';

// import { AppContext, useMyContext } from './Provider';

export  function ResultadoAlumno(props) {
    const { alumno, closeModal, selectedProfesor, setSelectedAlumno,
      selectedAlumnoList, setSelectedAlumnoList } = props; 
    const navigate = useNavigate();
    const handleSelectAlumno = () => {
      closeModal();
      setSelectedAlumno(alumno);
      setSelectedAlumnoList([...selectedAlumnoList, alumno]);
    }
  return (
    <button 
    className='filaProfesor'
    onClick={handleSelectAlumno}
    >
            <div className='resultado'>
              <h1>{alumno.name}  {alumno.fLastName} {alumno.mLastName}</h1>
              <p>{alumno.idPUCP?alumno.idPUCP: " "}</p>
            </div>
         
    </button>
  )
}