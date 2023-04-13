import React,{useContext, useEffect, useState} from 'react';
import '#Styles/Coordinador/Semestres/BuscadorProfesores.css';
import { useNavigate } from 'react-router-dom';  
import ResultadoProfesor from './resultadoProfesor';

import { axiosSeekerBySpecialtyAndName } from '#API/Seeker';


function BuscadorProfesor(props) {
  const {closeModal, selectedProfesor, setSelectedProfesor, 
    selectedProfesorList, setSelectedProfesorList} = props;
  const [ListaProfesores, setListaProfesores]  = useState([]);
  const [count, setcount] = useState(0);

  const getAllProfessorsList = (texto) => {
    const JWTtoken = localStorage.getItem('token');
    axiosSeekerBySpecialtyAndName(JWTtoken, "Profesor", 13, texto)
      .then(
          (response) => {
              const list = response.data || [];
              console.log(list);
              setListaProfesores(list.rows); 
              setcount(list.count);
          }
      ).catch(error => {
          console.error(`Error: ${error}`);
      });
  };

   const  handleinputChange = (e) => { 
    var x = document.getElementById("busqueda").value;
    if(x==""){
      x="$"
    }
    console.log(x);
     getAllProfessorsList(x);
  } 
  const nuevoprofesor =(e)=>{
    console.log("----");
    console.log(e);
    closeModal(false);
  }
  useEffect(() => {
    getAllProfessorsList("$");    
  }, []);


  // const [profResultList, setProfResultList] = useState([]);
  // const [inputProfText, setInputProfText] = useState("");
  
  // const getProfesorList = () => {
  //   const JWTtoken = sessionStorage.getItem('token');
  //   axiosGetProfesorList(JWTtoken, inputProfText)
  //     .then((response) => {
  //       const data = response.data || "";
  //       setProfResultList(data);
        
  //       // setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(`Error getProfesorList: ${error}`);
  //     });
  // };

  // useEffect(() => {
  //   getProfesorList();
  // });

  // const handleInputChange = (e) => {
  //   setInputProfText(e.target.value);
  // }

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

                  {ListaProfesores && count>0? ListaProfesores.map((profesor,index)=>{
                      return(
                        <div key ={index} className='espaciado'>
                          <hr color='black' className='lineaContenido' />
                          <ResultadoProfesor 
                            handleselection={nuevoprofesor} 
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

export default BuscadorProfesor;