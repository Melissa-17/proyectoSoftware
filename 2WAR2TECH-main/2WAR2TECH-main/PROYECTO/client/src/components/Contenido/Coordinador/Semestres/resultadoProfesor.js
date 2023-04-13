import React,{useContext, useState} from 'react';
import '#Styles/Coordinador/Semestres/ResultadoProfesor.css';
import { useNavigate } from 'react-router-dom';

// import { AppContext, useMyContext } from './Provider';

export default function ResultadoProfesor(props) {
    const { professor, closeModal, selectedProfesor, setSelectedProfesor,
      selectedProfesorList, setSelectedProfesorList } = props; 
    const navigate = useNavigate();
    const handleSelectProfesor = () => {
      closeModal();
      setSelectedProfesor(professor);
      setSelectedProfesorList([...selectedProfesorList, professor]);
    }
  return (
    <button 
    className='filaProfesor'
    onClick={handleSelectProfesor}
    >
            <div className='resultado'>
              <h1>{professor.name}  {professor.fLastName} {professor.mLastName}</h1>
              <p>{professor.idPUCP?professor.idPUCP: " "}</p>
            </div>
         
    </button>
  )
}