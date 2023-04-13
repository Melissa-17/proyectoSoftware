import React,{useContext, useEffect, useState} from 'react';
import '#Styles/Coordinador/Semestres/BuscadorProfesores.css';
import { useNavigate } from 'react-router-dom';   

import {axiosGetFreeUsers} from '#API/User.js';
import {ResultadoAlumno} from "./ResultadoAlumno.js"

function BuscadorAlumnos(props) {
  const {closeModal, selectedProfesor, setSelectedProfesor, 
    selectedProfesorList, setSelectedProfesorList} = props;
  const [ListAlumnosFree, setListAlumnosFree]  = useState();
  
  const getAllStudentList = () => {
    const JWTtoken = localStorage.getItem('token');
    axiosGetFreeUsers(JWTtoken)
      .then(
          (response) => {
              const list = response.data || [];
              console.log(list);
              setListAlumnosFree(list); 
          }
      ).catch(error => {
          console.error(`Error: ${error}`);
      });
  };

   const  handleinputChange = (e) => { 
    var x = document.getElementById("busqueda").value;
    console.log(x);
    getAllStudentList();
  } 
  const nuevoAlumno =(e)=>{
    console.log("----");
    console.log(e);
    closeModal(false);
  }
  useEffect(() => {
    getAllStudentList();    
  }, []);

  useEffect(() => {
    
  }, [selectedProfesor, selectedProfesorList]);

  return (
    <div className="bpmodalBackground">
        <div className="BuscadorProfesor">
                <div className='fila'>
                    <h4 className='tituloDescripcion'> Buscador de Profesores</h4>
                    <div className='espacio'></div>
                    <button className="titleCloseBtn" onClick={() => closeModal(false)}>X </button> 
                </div>
                <div className='fila'>
                    <hr color='black' className='lineaContenido' />
                </div>
                <div className='buscador'>
                  <hr color='black' className='lineaContenido' />
                  {/* aqui debo extraer el text de alguna */}
                  <input type="text" 
                    id="busqueda"
                    onChange={handleinputChange}
                    placeholder='Ingrese un nombre...'></input>
                  <button className='busquedaNombre'>
                      <i class="bi bi-search" />
                  </button>
                </div>
                <div className='contenedorlistado'>

                  {ListAlumnosFree ? ListAlumnosFree.map((profesor,index)=>{
                      return(
                        <div key ={index} className='espaciado'>
                          <hr color='black' className='lineaContenido' />
                          <ResultadoAlumno 
                            handleselection={nuevoAlumno} 
                            professor={profesor}
                            closeModal={closeModal}
                            selectedProfesor={selectedProfesor} 
                            setSelectedProfesor={setSelectedProfesor}
                            selectedProfesorList={selectedProfesorList} 
                            setSelectedProfesorList={setSelectedProfesorList}
                          />  
                        </div> 
                      )
                  })
                    : <p> no resultados</p>
                  }
                </div>
        </div>
    </div>
  );
}

