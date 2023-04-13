import React from 'react';
import Contenido from './Contenido'; 
import EditarSemestre from './EditarSemestre'; 
import NuevoSemestre from './NuevoSemestre';
import NuevoCurso from './CrearCurso';
import {Route, Routes} from 'react-router-dom';
import '../../../../assets/styles/Coordinador/Semestres/Pantalla.css';


export default function Pantalla() {
    return (
    <div className='contenedorPantalla'>

      <Routes>
        {/* esta es la pantalla que aparece con el titulo y con los cards  */}
          <Route path='/*' element={<Contenido />} /> 
          <Route path='/Semestre/detalle' element={<EditarSemestre />} />
          <Route path='/Semestre/nuevo' element={<NuevoSemestre />} /> 
          <Route path='/Semestre/detalle/cursonuevo' element={<NuevoCurso/>}/>
      </Routes>
    </div>
  )
}
