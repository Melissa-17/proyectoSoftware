import React from 'react';
import Sidebar from '../../SidebarMenu';
import Contents from './Content'; 
import DelivDetail from '../DetailPart/DelivDetail';
import {Route, Routes} from 'react-router-dom';
import '../../../assets/styles/Student/InitialPart/Screen.css';

export default function Screen() {
    return (
    <div className='contenedorPantalla'>
      
      <div className='separadorIndez'>
        <Sidebar />
      </div>
      
      <Routes>
          <Route path='/*' element={<Contents />} />
          <Route path='/deliverable/detail' element={<DelivDetail />} />
      </Routes>
    </div>
  )
}