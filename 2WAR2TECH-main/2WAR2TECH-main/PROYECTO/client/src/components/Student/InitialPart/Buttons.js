import React from 'react';
import '../../../assets/styles/Student/InitialPart/Buttons.css';

export default function Buttons() {
  return (
    <div className='contenedorBotoneria'>
        <div className='botonPrimera'>
            <button className='Primera'>
                <img 
                    className='imagenRetroceso'
                    src='https://cdn-icons-png.flaticon.com/512/2223/2223615.png'/>
                    <p>Primera</p>
            </button>
        </div>
        <div className='botonPrimera'>
            <button className='Primera2'>
                <img 
                    className='imagenRetroceso'
                    src='https://cdn-icons-png.flaticon.com/512/2223/2223615.png'/>
            </button>
        </div>
        <button className='estado1'>
            <p>1</p>
        </button>
        <button className='estado2'>
            <p>2</p>
        </button>
        <div className='botonUltima'>
            <button className='Ultima2'>
                <img 
                    className='imagenSiguiente'
                    src='https://i.pinimg.com/originals/1c/18/dd/1c18dd6b1bef20e87e43b1c7b001e0e7.png'/>
            </button>
        </div>
        <div className='botonUltima'>
            <button className='Ultima'>
                <p>Última</p>
                <img 
                    className='imagenSiguiente'
                    src='https://i.pinimg.com/originals/1c/18/dd/1c18dd6b1bef20e87e43b1c7b001e0e7.png'/>
            </button>
        </div>
    </div>
  )
}
