import React from 'react'
import '#Styles/Student/InitialPart/Icon.css';
import { useNavigate } from 'react-router-dom';

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
                }
            }
        }
    }

    const navigate = useNavigate();
    console.log(props.student);

    const hizoclic = () =>{
        if(props.entregable == 1){
            if(props.num==2){
                navigate(`/teacher/alumno/deliverable/detail/${props.idEntregable}/${1}`, {
                    state: {
                    index: props.numero,
                    student: props.student,
                    course: props.course,
                    num:props.num
                }});
            }else{
                if(props.num==1){
                    navigate(`/jury/alumno/deliverable/detail/${props.idEntregable}/${1}`, {
                        state: {
                        index: props.numero,
                        student: props.student,
                        course: props.course,
                        num:props.num
                    }});
                }
            }
        }
        else if(props.entregable == 0){
            if(props.num==2){
                navigate(`/teacher/alumno/partial/detail/${props.idEntregable}/${2}`, {
                    state: {
                        index: props.numero,
                        student: props.student,
                        course: props.course,
                        num:props.num
                    }});
            }else{
                if(props.num==1){
                    navigate(`/jury/alumno/partial/detail/${props.idEntregable}/${2}`, {
                        state: {
                            index: props.numero,
                            student: props.student,
                            course: props.course,
                            num:props.num
                        }});
                }
            }
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

        <p className='adicionalEntregable'>
            {(props.valor == 1) ? props.fechaCorregido : ''}
        </p>
    </button>
  )
}
