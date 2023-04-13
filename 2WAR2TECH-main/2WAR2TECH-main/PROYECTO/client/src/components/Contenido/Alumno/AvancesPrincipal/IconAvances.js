import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../assets/styles/Alumno/AvancesPrincipal/IconAvances.css'

export default function IconAvances(props) {

    const funcion = () => {
        if(props.valor == 1){
            return "https://escuelasmetropolitanas.com/images/iconos/bases.png";
        }else{
            if(props.valor == 2){
                return "https://cdn-icons-png.flaticon.com/512/334/334710.png"
                // return "https://cdn-icons-png.flaticon.com/512/2910/2910824.png";
            }else{
                if(props.valor == 3){
                    return "https://cdn-icons-png.flaticon.com/512/2910/2910824.png";
                    // return "https://cdn4.iconfinder.com/data/icons/work-document-setting/32/checklist_add_new-512.png";
                }else if(props.valor == 4) return "https://static.thenounproject.com/png/3416921-200.png";
            }
        }
    }

    const navigate = useNavigate();

    const hizoclic = () =>{
        if(props.entregable == 1){
            navigate(`/avances/avancesDetail/${props.idAvance}/${props.numeroEnviar}`, {
                state: {
                    cxsid: props.cxsid,
                    courseName: props.courseName,
                }});
        }
    }

    const funcionNombre = () =>{
        if(props.valor == 1){
            return "imagenAvanceVerde";
        }else{
            if(props.valor == 2){
                return "imagenAvanceAmarillo";
            }else{
                if(props.valor == 3){
                    return "imagenAvanceRojo";
                }else if(props.valor == 4) return "imagenVistoBueno";
                else return "sinTipoEntregable"
            }
        }
    }

    const funcionNombreEstado = ()=>{
        if(props.valor == 1){
            return "Calificado";
        }else{
            if(props.valor == 2){
                return "Enviado";
            }else{
                if(props.valor == 3){
                    return "Asignado";
                }else if(props.valor==4){
                    return "Observado";
                }
            }
        }
    }

    const funcionClassNombreEstado = () =>{
        if(props.valor == 1){
            return "nombreCalificado";
        }else{
            if(props.valor == 2){
                return "nombreSinCalificar";
            }else{
                if(props.valor == 3){
                    return "nombreAsignado";
                }else{
                    if(props.valor==4){
                        return "VistoBueno";
                    }else{
                        return "SinDetalle"
                    }
                }
            }
        }
    }

  return (
    <button 
    className='contenedorGeneralAvance' onClick={hizoclic}>
        <p className='entregableAvance'>{"Avance"}</p>
        <p className='numeroAvance'>
            {props.numero}
        </p>

        <p className='entregableAvance'>Fecha de Entrega</p>
        <p className='fechaAvance'>{props.fecha}</p>
        <p className='entregableAvance'>Estado</p>
        <img 
            src={funcion()}
            className={funcionNombre()}
        />

        <p className={funcionClassNombreEstado()}>
            {funcionNombreEstado()}
        </p>
    </button>
  )
}
