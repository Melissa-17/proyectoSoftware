import React, {useState} from 'react'
import '../../../assets/styles/Admin/Faculty/Botoneria.css'
import ModalsAlertFacultyAdmin from './ModalsAlert';
import ModalsMessageFacultyAdmin from './ModalsMessageLevel';
import ModalNuevoSemestre from './ModalNuevoSemestre';
import ModalValidacion from './ModalValidacion';

export default function Botoneria(props) {
    const {deleteList, setDeleteList, modalConfirmacion, setModalConfirmacion,
      modalMensaje,setModalMensaje} = props;
    const [modalAlerta, setModalAlerta] = useState(false);
    const [modalNuevoSemestre, setModalNuevoSemestre] = useState(false);
    const [validacion, setValidacion] = useState(false);
  return (
    <div className='contenedorBotoneriaSemester'>
      <button
      className='botonEliminarFacultyPart'
      onClick={() => {
        if(deleteList.length>0) setModalAlerta(true);
        else setValidacion(true);
      }}
      >
        Desactivar
      </button>
        
      <button
      className='botonAgregarFacultadFacultyPart'
      onClick={()=>{setModalNuevoSemestre(true);}}
      >
        Agregar Semestre
      </button>
      {modalAlerta && <ModalsAlertFacultyAdmin 
      closeAlert={setModalAlerta} 
      modalMessage={setModalMensaje}
      deleteList={deleteList}
      setDeleteList={setDeleteList}
      alertText="¿Seguro que quiere eliminar el (los) semestre (s)?"
      />}
      {modalMensaje && <ModalsMessageFacultyAdmin 
      closeMessage={setModalMensaje}
      closeOtroModal={setModalAlerta}
      message="Se eliminó correctamente el (los) semestre (s)"
      />}
      {modalNuevoSemestre && <ModalNuevoSemestre 
      closeMessage={setModalNuevoSemestre}
      modalMessage={setModalConfirmacion}
      />}
      {modalConfirmacion && <ModalsMessageFacultyAdmin 
      closeMessage={setModalConfirmacion}
      closeOtroModal={setModalNuevoSemestre}
      message="Se registró correctamente"
      />}
      {validacion && <ModalValidacion
      closeMessage={setValidacion}
      message="Debe seleccionar un semestre para eliminarlo."
      />}
    </div>
  )
}
