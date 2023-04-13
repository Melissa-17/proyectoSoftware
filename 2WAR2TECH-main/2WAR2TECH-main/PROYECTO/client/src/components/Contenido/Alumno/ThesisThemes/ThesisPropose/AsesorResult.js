import React,{useContext, useState} from 'react';
import '#Styles/Coordinador/Semestres/ResultadoProfesor.css';
import { useNavigate } from 'react-router-dom';

// import { AppContext, useMyContext } from './Provider';

export default function UserResult(props) {
    const { 
      user,
      closeModal,
      selectedUser,
      setSelectedUser,
  } = props; 
    const navigate = useNavigate();
    const handleSelectUser = () => {
      closeModal();
      setSelectedUser(user);
    }
  return (
    <button 
    className='filaProfesor'
    onClick={handleSelectUser}
    >
        {/* onClick={hizoclic}> */}
        <div>
            {/* <p >Profesor &nbsp; </p> 
            <p className='numero'>
                {props.numero}
            </p> */}
            
            <div className='resultado'>
              <h1>{user.name}  {user.fLastName} {user.mLastName}</h1>
              <p>{user.idPUCP?user.idPUCP: " "}</p>
            </div>
        </div> 
    </button>
  )
}