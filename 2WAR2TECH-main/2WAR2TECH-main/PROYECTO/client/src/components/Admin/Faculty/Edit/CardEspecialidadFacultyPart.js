import React, {useState} from 'react'
import '../../../../assets/styles/Admin/Faculty/Visual/CardEspecialidadFacultyPart.css'
import ModalsAlertSpecialty from './ModalsAlertSpecialty';
import ModalsMessageFacultyAdmin from '../ModalsMessageLevel';

export default function CardEspecialidadFacultyPart(props) {
  const {especialidad} = props;
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  return (
    <div className='contenedorCardEspecialidad'>
        <div className='infoCard'>
            <p className='carrera'>{especialidad && especialidad.name?
              especialidad.name: "No tiene nombre"}</p>
            <p className='info'>
              {especialidad && especialidad.USERs && especialidad.USERs.length>0?
              especialidad.USERs[0].name + " " + especialidad.USERs[0].mLastName + " " + especialidad.USERs[0].fLastName:
              "No tiene coordinador asignado"
              } - {especialidad && especialidad.USERs && especialidad.USERs.length>0?
                especialidad.USERs[0].idPUCP:
                "--------"}</p>
        </div>
        <button
        className='botonEliminarEspecialidad'
        onClick={()=>{
          setModalAlerta(true);
        }}
        >
          <i class="bi bi-trash"></i>
        </button>
        <div>
          {modalAlerta && <ModalsAlertSpecialty 
          closeAlert={setModalAlerta}
          alertText="¿Seguro que desea eliminar la especialidad?"
          modalMessage={setModalMensaje}
          especialidad={especialidad}
          />}
          {modalMensaje && <ModalsMessageFacultyAdmin 
          closeMessage={setModalMensaje}
          closeOtroModal={setModalAlerta}
          message="Se eliminó correctamente la especialidad"
          />}
        </div>
    </div>
  )
}
