import React from 'react';
import PantallaAdministracion from './Pantalla.js'
import AdministracionAsesores from './Asesores.js'
import DetalleAsesor from './DetalleAsesor.js'
import {Route, Routes} from 'react-router-dom';


export default function Pantalla() {
    return (
    <div className='ContenedorPantalla'>

      <Routes>
        {/* esta es la pantalla que aparece con el titulo y con los cards  */}
        <Route path='/teacher/Administration' element={<PantallaAdministracion />} /> 
        <Route path='/Asesores' element={<AdministracionAsesores/>}/>
        <Route path='/Asesor/Detalle' element={<DetalleAsesor />} />
      </Routes>
    </div>
  )
}
