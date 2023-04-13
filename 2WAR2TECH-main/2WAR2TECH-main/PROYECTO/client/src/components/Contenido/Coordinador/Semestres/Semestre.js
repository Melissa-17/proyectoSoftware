import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../../../assets/styles/Coordinador/Semestres/Pantalla.css';
import '../../../../assets/styles/Coordinador/Semestres/Principal.css';
import {Route, Routes, useNavigate} from 'react-router-dom';   
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";
import ContenedorCursos from './ContenedorCursos'
import ContenedorCursosfilas from './ContenedorCursosfilas' 
import { axiosGetSemestres } from '#API/Semestres.js';
// import Deliverable from './Deliverable';
// import Partial from './Partial';


 let semestrefijos=['2021-1','2021-2','2022-1','2022-2'];
 
export default function Semestre() {
    const [cursoLista, setCursoLista] = useState([]);
    const JWTtoken = localStorage.getItem('token');

     
    const getAllCursosLista = () => {
        axiosGetSemestres(JWTtoken).then(
            (response) => {
                const list = response.data.rows || [];
                setCursoLista(list);
            }
        ).catch(error => {
            console.error(`Error: ${error}`);
        });
    };
    useEffect(() => {
        getAllCursosLista();
    },[]);

    const navigate = useNavigate();

    const retrocesoClic = () =>{
        navigate("/Semestre/pantalla");
    }

  return (
    <div className='estructura'>
        {/* <CreateNewUserPageStudent />esto es el sidebar */}
        <div className='contenedorContenido'>

            <div className='contenedorTitulo'>
                {/* <h1 className='titulo'>SEMESTRES</h1> */}
                <h1>SEMESTRE</h1>
                <div className='espacio'>
                    <button
                        onClick={retrocesoClic}
                        className='botonRetrocesoDetalle'>
                            <img 
                            src='https://cdn-icons-png.flaticon.com/512/2223/2223615.png'
                            className='imagenRetrocesoDetalle'/>
                    </button>
                </div>
            </div>

            <hr color='black' className='lineaContenido' />
            <div className='leyenda'>
                <p>Leyenda: Los campos con * son obligatorios</p>
            </div>
            <div className='contenedortextBox'>
                <div className='textbox'>
                    <p>Nombre *</p>
                    <form>
                        <input type="text" />
                    </form>
                </div>
                <div className='espacio2'></div>
                <div className='textbox'>
                    <p>Abreviación *</p>
                    <form>
                        <input type="text" />
                    </form>
                </div>
            </div>
            <div className='contenedordecursos'>
                <p>Cursos</p>
                <ContenedorCursosfilas/>
            </div>

        </div>
    </div>
  )
}
