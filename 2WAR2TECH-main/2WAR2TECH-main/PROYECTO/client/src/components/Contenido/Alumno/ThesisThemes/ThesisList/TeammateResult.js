import React,{useContext, useState} from 'react';
import '#Styles/Coordinador/Semestres/ResultadoProfesor.css';
import { useNavigate } from 'react-router-dom';

// import { AppContext, useMyContext } from './Provider';

export default function TeammateResult(props) {
    const { teammate, closeModal, selectedTeammate, setSelectedTeammate,
      selectedTeammateList, setSelectedTeammateList } = props; 
    const navigate = useNavigate();
    const handleSelectTeammate = () => {
      closeModal();
      if (!(selectedTeammateList.map((e) => e.id)).includes(teammate.id)) {
        setSelectedTeammate(selectedTeammate);
        // console.log(selectedTeammate )
        setSelectedTeammateList([...selectedTeammateList, teammate]);
      }
      
    }
  return (
    <button 
    className='filaProfesor'
    onClick={handleSelectTeammate}
    >
        {/* onClick={hizoclic}> */}
        <div>
            {/* <p >Profesor &nbsp; </p> 
            <p className='numero'>
                {props.numero}
            </p> */}
            
            <div className='resultado'>
              <h1>{teammate.name}  {teammate.fLastName} {teammate.mLastName}</h1>
              <p>{teammate.idPUCP?teammate.idPUCP: " "}</p>
            </div>
        </div> 
    </button>
  )
}