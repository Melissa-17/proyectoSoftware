import React from 'react';
import '../../../assets/styles/Student/InitialPart/InforDeliv.css';

export default function InforDeliv() {
  return (
    <div className='contenedorInformacion'>
        <div className='cajaInfo'>
            <div className='imagenInfor'>
                <img
                src='https://www.dzoom.org.es/wp-content/uploads/2010/09/retrato-fondo-profundidad-campo-734x489.jpg'
                className='fotoPersona'
                />
            </div>
            <div className='letras'>
                <p className='nombreLetra'>Angie Centeno Cáceres</p>
                <p className='area'>Ingeniería Informática</p>
            </div>
        </div>
        <div className='cajaCiclo'>
            <p>Tesis</p>
            <div className='contenedorCombo'>
                    {/* <div className='anho'>
                        <select name="cbAnho">
                            <option value="2022-2" selected>2022-2</option>
                            <option value="2022-3">2022-3</option>
                        </select>
                    </div> */}
                    <div className='ciclo'>
                        <select name="cbCiclo">
                            <option value="I" selected>I</option>
                            <option value="II">II</option>
                        </select>
                    </div>
            </div>
        </div>
    </div>
  )
}
