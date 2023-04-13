import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../assets/styles/Alumno/AvancesPrincipal/IconAvances.css'

export default function IconAvances(props) {
    const { student, course, index } = props;
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
                    if(props.valor == 4) return "https://static.thenounproject.com/png/3416921-200.png";
                    else return "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3196297/file-earmark-x-icon-sm.png";
                }
            }
        }
    }

    const navigate = useNavigate();

    const hizoclic = () =>{
        if(props.entregable == 1){
            navigate(`/revisor/alumno/avances/detail/${props.idAvance}/${props.numero}`,{
                state:{
                    student: student,
                    course: course,
                    index: index
                }
            });
        }
    }

    const funcionNombreDetalle = () =>{
        if(props.valor == 1){
            return "VistoBuenoDetalle";
        }else{
            if(props.valor == 2){
                return "FaltaRevisarDetalle";
            }else{
                if(props.valor == 3){
                    return "NoEntregadoDetalle";
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
                    if(props.valor == 4){
                        return "Visto Bueno";
                    }else{
                        return "Sin detalle";
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

        <p className={funcionNombreDetalle()}>
            {funcionDetalle()}
        </p>
    </button>
  )
}
