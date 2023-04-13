import React, { useState, useEffect } from 'react'
import '../../../../assets/styles/Admin/Coordinator/Register/CardEspecialidad.css'
import { axiosGetDetailSpecialty } from '../../../../api/Specialty';
import ModalsAlertSpecialty from '../../Faculty/Edit/ModalsAlertSpecialty';
import ModalsMessageFacultyAdmin from '../../Faculty/ModalsMessageLevel';

export default function CardEspecialidad(props) {
    const {especialidadItem, coordinadorItem} = props;
    const JWTtoken = sessionStorage.getItem("token");
    const [especialidadDetail,setEspecialidadDetail] = useState();
    const [modalAlerta, setModalAlerta] = useState(false);
    const [modalMensaje, setModalMensaje] = useState(false);

    // console.log(especialidadItem);

    const getCoordinadorList = () => {
        axiosGetDetailSpecialty(JWTtoken, especialidadItem.id)
          .then((response) => {
            // console.log(response.data)
            const data = response.data || "";
            setEspecialidadDetail(data);
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });
      };
    
      useEffect(() => {
        getCoordinadorList();
      });
    return (
    <div className='contenedorCardEspecialidad2'>
      <div className='contenedorInfoCardEspecialidad2'>
        <p className='especialidad'>{especialidadItem.name? especialidadItem.name: "No tiene nombre"}</p>
        <p className='nombre'>{especialidadDetail && especialidadDetail.USERs && especialidadDetail.USERs[0]? 
        especialidadDetail.USERs[0].name + " " + especialidadDetail.USERs[0].mLastName + " " + 
        especialidadDetail.USERs[0].fLastName + " - " + especialidadDetail.USERs[0].idPUCP
        :"No tiene coordinador"}</p>
      </div>
      <button className='botonEliminarCardEspecialidad'
      onClick={()=>{setModalAlerta(true);}}
      type="button"
      >
        <i class="bi bi-trash"></i>
      </button>
      <div>
      {modalAlerta && <ModalsAlertSpecialty 
          closeAlert={setModalAlerta}
          alertText="¿Seguro que desea desvincular la especialidad?"
          modalMessage={setModalMensaje}
          especialidad={especialidadItem}
          coordinadorItem={coordinadorItem}
          option={2}
      />}
          {/* {modalMensaje && <ModalsMessageFacultyAdmin 
          closeMessage={setModalMensaje}
          closeOtroModal={setModalAlerta}
          message="Se desvinculó correctamente la especialidad"
          />} */}
      </div>
    </div>
  )
}
