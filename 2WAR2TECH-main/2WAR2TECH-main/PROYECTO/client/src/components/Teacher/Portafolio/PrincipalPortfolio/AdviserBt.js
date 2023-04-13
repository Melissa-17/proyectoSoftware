import React from 'react'
import '../../../../assets/styles/Teacher/Portafolio/AdviserBt.css'
import { useNavigate } from 'react-router-dom'
import { createCompleteName, capitalizeTitle, capitalize } from '#Helpers/stringHelpers';

export default function AdviserBt(props) {
    const { student, course } = props;
    const devuelveFecha = () =>{
        if(props.valor == 1){
            return(<p>Entregado</p>)
        }else{
            return(<p>Próxima entrega: Entregable Parcial 1 para el {props.fecha}</p>)
        }
    }
    
    const navigate = useNavigate();
    console.log(props)
    const AsesorClic = () =>{
      if(props.num == 2){
        navigate(`/teacher/alumno/${props.num}`, {
          state: {
            "student": student,
            "course": course
          }
        });
      }else{
        if(props.num == 1){
          navigate(`/jury/alumno/${props.num}`, {
            state: {
              "student": student,
              "course": course
            }
          });
        }
      }
    }
  return (
    
    <button className='contenidoBotonTeacher' onClick={AsesorClic}>
      <div className='contenidoTituloBotonTeacher'>
      
        <div className='sesionEscritaTeacher'>
            {/* <p>{createCompleteName(student.USER.name, student.USER.fLastName, student.USER.mLastName)}</p>
            <p>{capitalizeTitle(student.USER.USER_X_SPECIALTies[0].SPECIALTY.name)}</p> */}
        </div>
        <div className='imagenTeacher'>
            <img 
            src='https://static3.abc.es/media/summum/2021/10/01/maxi_iglesias-kXKH--620x349@abc.jpeg' 
            className='imgTeacher'/>
        </div>
      </div>
      <div 
      className={`contenido${(props.valor==1) ? 'AbajoTeacher' : 'Abajo2Teacher'}`}>
        <div className='tituloPrincipalTeacher'>
            {/* <h1>{capitalize(student.USER.USER_X_THEses[0].THESIS.title)}</h1> */}
        </div>
        <div className='estadoTeacher'>
          {/* TODO: Proxima entrega */}
            
        </div>
      </div>
    </button>
  )
}
