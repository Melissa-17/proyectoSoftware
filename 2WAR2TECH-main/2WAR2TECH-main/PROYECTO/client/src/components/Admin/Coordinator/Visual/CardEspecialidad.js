import React, { useState, useEffect } from 'react'
import '../../../../assets/styles/Admin/Coordinator/Register/CardEspecialidad.css'
import { axiosGetDetailSpecialty } from '../../../../api/Specialty';

export default function CardEspecialidad(props) {
    const {especialidadItem} = props;
    const JWTtoken = sessionStorage.getItem("token");
    const [especialidadDetail,setEspecialidadDetail] = useState();
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
        <p className='nombre'>{especialidadDetail && especialidadDetail.USERs? 
        especialidadDetail.USERs[0].name + " " + especialidadDetail.USERs[0].mLastName + " " + 
        especialidadDetail.USERs[0].fLastName + " - " + especialidadDetail.USERs[0].idPUCP
        :"No tiene coordinador"}</p>
      </div>
    </div>
  )
}
