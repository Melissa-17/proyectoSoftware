import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../assets/styles/Alumno/AvancesPrincipal/IconAvances.css'

export default function IconAvances(props) {
    const { student, course, index } = props;
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
        if(props.num == 2){
            navigate(`/teacher/alumno/avances/detail/${props.idAvance}/${props.numero}`,{
                state:{
                    student: student,
                    course: course,
                    index: index,
                    num: props.num
                }
            });
        }else{
            if(props.num==1){
                navigate(`/jury/alumno/avances/detail/${props.idAvance}/${props.numero}`,{
                    state:{
                        student: student,
                        course: course,
                        index: index,
                        num: props.num
                    }
                });
            }
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

        <p className='adicionalAvance'>
            {(props.valor == 1) ? props.fechaCorregido : ''}
        </p>
    </button>
  )
}
