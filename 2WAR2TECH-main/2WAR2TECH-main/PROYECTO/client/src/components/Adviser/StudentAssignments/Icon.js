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
                // return "https://cdn-icons-png.flaticon.com/512/334/334710.png"
                return "https://cdn-icons-png.flaticon.com/512/81/81088.png";
                // return "https://cdn-icons-png.flaticon.com/512/2910/2910824.png";
            }else{
                if(props.valor == 3){
                    // return "https://cdn-icons-png.flaticon.com/512/2910/2910824.png";
                    // return "https://cdn-icons-png.flaticon.com/512/81/81088.png";
                    return "https://static.thenounproject.com/png/507002-200.png";
                    // return "https://cdn4.iconfinder.com/data/icons/work-document-setting/32/checklist_add_new-512.png";
                }else{
                    if(props.valor == 4){
                        // return "https://cdn-icons-png.flaticon.com/512/72/72647.png";
                        // return "https://cdn1.iconfinder.com/data/icons/files-documents-set-4/512/29-512.png";
                        return "https://static.thenounproject.com/png/3416921-200.png";
                    }else{
                        return "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3196297/file-earmark-x-icon-sm.png";
                    }
                }
            }
        }
    }

    const navigate = useNavigate();
    // console.log(props.student);

    const hizoclic = () =>{
        if(props.entregable == 1){
            navigate(`/revisor/alumno/deliverable/detail/${props.idEntregable}/${1}`, {
            state: {
                index: props.numero,
                student: props.student,
                course: props.course
            }});
        }
        else if(props.entregable == 0){
         navigate(`/revisor/alumno/partial/detail/${props.idEntregable}/${2}`, {
            state: {
                index: props.numero,
                student: props.student,
                course: props.course
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
                return "imagenEntregableRojo";
            }else{
                if(props.valor == 3){
                    return "imagenEntregableAmarillo";
                }else{
                    if(props.valor == 4) return "imagenVistoBueno";
                    else return "sinTipoEntregable"
                }
            }
        }
    }

    const funcionDetalle = () =>{
        if(props.valor == 1){
            return "Calificado";
        }else{
            if(props.valor == 2){
                return "Sin revisar";
            }else{
                if(props.valor == 3){
                    return "No recibido";
                }else{
                    if(props.valor == 4) return "Visto bueno";
                    else return "Sin detalle";
                }
            }
        }
    }

    const funcionNombreDetalle = () =>{
        if(props.valor == 1){
            return "Calificado";
        }else{
            if(props.valor == 2){
                return "FaltaRevisarDetalle";
            }else{
                if(props.valor == 3){
                    return "NoEntregadoDetalle";
                }else{
                    if(props.valor==4){
                        return "VistoBueno"
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

        <p className={funcionNombreDetalle()}>
            {funcionDetalle()}
        </p>
    </button>
  )
}
