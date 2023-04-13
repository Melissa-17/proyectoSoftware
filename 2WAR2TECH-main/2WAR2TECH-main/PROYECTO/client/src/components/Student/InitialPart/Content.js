import React from 'react';
import { useState } from 'react';
import '../../../assets/styles/Student/InitialPart/Content.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Deliverable from './Deliverable';
import Partial from './Partial';
import CreateNewUserPageStudent from '../../../pages/CreateNewUserPage/Student';
import { Navbar } from 'react-bootstrap';


export default function Contents() {

    const [isActive, setIsActive] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const navigate = useNavigate();

    const hizoClic1 = () =>{
        navigate("partial");
        setIsActive(true);
        setIsActive2(false);
    }
    const hizoClic2 = () =>{
        navigate("deliverable");
        setIsActive(false);
        setIsActive2(true);
    }

  return (
    <div className='todoContent'>
        <Navbar/>
        <CreateNewUserPageStudent />
        <div className='contenedorContenidoHola'>
        <div className='contenedorTitulo'>
            <h1 className='titulo'>ENTREGABLES</h1>
        </div>
        <div className='contenedorOpcionesEntregable'>
            <ul>
                <button
                 className={`botones${isActive ? 'OpcionSeleccionado' : 'Opcion'}`}
                 onClick={hizoClic1}>
                    Entregas Parciales
                </button>
            </ul>
            <ul>
                <button
                className={`botones${isActive2 ? 'OpcionSeleccionado' : 'Opcion'}`}
                 onClick={hizoClic2}>
                    Entregables
                </button>
            </ul>
        </div>
        
        <hr color='black' className='lineaContenido' />
        
        <div className='contenedorCambios'>
            <Routes>
                <Route path='partial/*' element={<Partial />} />
                <Route path='deliverable/*' element={<Deliverable />} />
            </Routes>
        </div>
    </div>
    </div>
  )
}
