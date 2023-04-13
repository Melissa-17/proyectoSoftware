import React, { useState, useEffect } from 'react'
import ModalsAlertSpecialty from '../../../Admin/Faculty/Edit/ModalsAlertSpecialty';
import ModalsMessageFacultyAdmin from '../../../Admin/Faculty/ModalsMessageLevel';

function CardHorarioEdit(props) {
  const {horarioItem, profesorItem, setModalMensaje2} = props;
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  return (
    <div className='contenedorCardEspecialidad2'
    style={{width:"950px"}}
    >
      <div className='contenedorInfoCardEspecialidad2'>
        <p className='especialidad'
        style={{fontSize:"24px", marginLeft:"20px", marginRight:"120px", width:"230px"}}
        >{horarioItem.abbreviation? horarioItem.abbreviation: "No tiene nombre"}</p>
      </div>
      <button className='botonEliminarCardEspecialidad'
      type='button'
      onClick={()=>{setModalAlerta(true);}}
      >
        <i class="bi bi-trash"></i>
      </button>
      <div>
      {modalAlerta && <ModalsAlertSpecialty 
          closeAlert={setModalAlerta}
          alertText="¿Seguro que desea desvincular el horario?"
          modalMessage={setModalMensaje}
          horarioItem={horarioItem}
          profesorItem={profesorItem}
          setModalMensaje2={setModalMensaje2}
          option={4}
      />}
          {modalMensaje && <ModalsMessageFacultyAdmin 
          closeMessage={setModalMensaje}
          closeOtroModal={setModalAlerta}
          message="Se desvinculó correctamente el horario"
          setModalMensaje2={setModalMensaje2}
          />}
      </div>
    </div>
  )
}

export default CardHorarioEdit