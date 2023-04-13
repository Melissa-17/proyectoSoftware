import React,{useContext, useState} from 'react';
import '#Styles/Student/InitialPart/Icon.css';
import { useNavigate } from 'react-router-dom';
import { AppContext, useMyContext } from './Provider';

export default function Icon(props) {

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
                }else{
                    if(props.valor == 4) return "https://static.thenounproject.com/png/3416921-200.png";
                }
            }
        }
    }

    const navigate = useNavigate();

    const hizoclic = () =>{
        if(props.entregable == 1){
            navigate(`/deliverable/detail/${props.idEntregable}/${1}`, {
            state: {
                index: props.numero,
                cxsid: props.cxsid,
                courseName: props.courseName,
            }});
        }
        else if(props.entregable == 0){
         navigate(`/partial/detail/${props.idEntregable}/${2}`, {
            state: {
                index: props.numero,
                cxsid: props.cxsid,
                courseName: props.courseName,
            }});
        }
    }

    const funcionTitulo = () => {
        if(props.entregable == 0) return "Entregables Parcial";
        else return "Entregable"
    }

    const funcionNombre = () =>{
        if(props.valor == 1){
            return "imagenEntregableVerde";
        }else{
            if(props.valor == 2){
                return "imagenEntregableAmarillo";
            }else{
                if(props.valor == 3){
                    return "imagenEntregableRojo";
                }else if(props.valor == 4) return "imagenVistoBueno";
                else return "sinTipoEntregable";
            }
        }
    }

    const funcionEstado = () =>{
        if(props.valor == 1){
            return "Calificado";
        }else{
            if(props.valor == 2){
                return "Enviado"
            }else{
                if(props.valor == 3){
                    return "Asignado";
                }else{
                    if(props.valor == 4){
                        return "Observado";
                    }else{
                        return "Sin detalle";
                    }
                }
            }
        }
    }

    const funcionNombreEstado = () =>{
        if(props.valor == 1){
            return "estadoCalificadoEntregableStudent";
        }else{
            if(props.valor == 2){
                return "estadoEntregadoEntregableStudent"
            }else{
                if(props.valor == 3){
                    return "estadoAsignadoEntregableStudent";
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
    className='cajaGeneralEntregable'
    onClick={hizoclic}>
        <p className='entregableEntregable'>{funcionTitulo()}</p>


        <p className='numeroEntregable'>
            {props.numero}
        </p>

        <p className='entregableEntregable'>Fecha de Entrega</p>
        <p className='fechaEntregable'>{props.fecha}</p>
        <p className='entregableEntregable'>Estado</p>
        <img 
            src={funcion()}
            className={funcionNombre()}
            alt="iconoEstado"
        />

        <p className={funcionNombreEstado()}>
            {funcionEstado()}
        </p>
    </button>
  )
}
