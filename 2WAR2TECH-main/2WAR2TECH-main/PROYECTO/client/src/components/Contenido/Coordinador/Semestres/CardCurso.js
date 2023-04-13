import React,{useContext, useState} from 'react';
import '#Styles/Coordinador/Semestres/Principal.css';
import { useNavigate } from 'react-router-dom';
// import { AppContext, useMyContext } from './Provider';

export default function Card(props) {

  

    const navigate = useNavigate();

    const hizoclic = () =>{
        if(props.entregable == 1){
            navigate("/deliverable/detail");
            //Pq ha un entregable? Es tesis, no? Debe ser otra pantalla
            //De igual manera, se necesita el :id/:option y como location
            //se llama index
        }
    }
    const { course } = props;
    console.log(course);
  return (
    <button 
    className='cardCurso'
    onClick={hizoclic}
    >
        <p>{course.COURSE.name}</p>
 
    </button>
  )
}
