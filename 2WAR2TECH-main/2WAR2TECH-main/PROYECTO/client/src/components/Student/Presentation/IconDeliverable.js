import React from 'react';
import '../../../assets/styles/Student/Presentation/IconDeliverable.css';
import { useNavigate } from 'react-router-dom';

export default function IconPresentacion(props) {

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
                }
            }
        }
    }

    const navigate = useNavigate();

    const hizoclic = () =>{
        if(props.entregable == 1){
            navigate(`/presentation/detail/${props.idExposicion}/${props.numeroEnviar}`,{
                state:{
                    cxsid: props.cxsid,
                    courseName: props.courseName
                }
            });
        }
    }

    const funcionNombre = () => {
        if(props.valor == 1){
            return "imagenPresentacionVerde";
        }else{
            if(props.valor == 2){
                return "imagenPresentacionAmarillo";
            }else{
                if(props.valor == 3){
                    return "imagenPresentacionRojo";
                }
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
                    return "nombreSinEntregar";
                }
            }
        }
    }

  return (
    <button 
    className='cajaGeneralPresentacion'
    onClick={hizoclic}>
        <p className='exposicionPresentacion'>Presentación</p>

        <p className='numeroPresentacion'>
            {props.numero}
        </p>

        <p className='exposicionPresentacion'>Fecha programada</p>
        <p className='fechaPresentacion'>{props.fecha && props.fecha!="-"? props.fecha: "Sin Programar"}</p>
        <p className='exposicionPresentacion'>Estado</p>
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
