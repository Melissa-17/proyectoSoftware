import React from 'react';
import '../../../assets/styles/Student/InitialPart/InforPartial.css';

export default function InforPartial() {
  return (
    <div className='todo'>
        <div className='contenedorInfoPartial'>
            <div className='cajaInfoPartial'>
                <div className='imagenInfor'>
                    <img
                    src='https://www.dzoom.org.es/wp-content/uploads/2010/09/retrato-fondo-profundidad-campo-734x489.jpg'
                    className='fotoPersonaPartial'
                    />
                </div>
                <div className='letrasPartial'>
                    <p className='nombreLetraPartial'>Angie Centeno Cáceres</p>
                    <p className='areaPartial'>Ingeniería Informática</p>
                </div>
            </div>
            <div className='cajaCicloPartial'>
                <p>Tesis</p>
                <div className='contenedorComboPartial'>
                        {/* <div className='anhoPartial'>
                            <select name="cbAnhoPartial">
                                <option value="2022-2" selected>2022-2</option>
                                <option value="2022-3">2022-3</option>
                            </select>
                        </div> */}
                        <div className='cicloPartial'>
                            <select name="cbCiclo">
                                <option value="I" selected>I</option>
                                <option value="II">II</option>
                            </select>
                        </div>
                </div>
            </div>
        </div>
        {/* <div className='contenedorEntregablePartial'>
            <div className='tituloEntregable'>
                <p>Entregable</p>
            </div>
            <div className='cbEntregable'>
                <select name="selectCiclo">
                    <option value="I" selected>I</option>
                    <option value="II">II</option>
                </select>
            </div>
        </div> */}
    </div>
  )
}
