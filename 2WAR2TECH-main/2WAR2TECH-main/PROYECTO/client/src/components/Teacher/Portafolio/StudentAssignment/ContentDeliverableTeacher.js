import React from 'react'
import { useState } from 'react';
import '../../../../assets/styles/Student/InitialPart/Content.css';
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Deliverable from './Deliverable';

export default function ContentDeliverableTeacher() {
  const [isActive, setIsActive] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const navigate = useNavigate();
    const { student, course } = useLocation().state;
    const params = useParams();

    const hizoClic1 = () =>{
        if(params.num == 2){
          navigate(`/teacher/alumno/partial/${params.num}`, {
            state: {
              student: student,
              course: course
            }
          });
        }else{
          if(params.num == 1){
            navigate(`/jury/alumno/partial/${params.num}`, {
              state: {
                student: student,
                course: course
              }
            });
          }
        }
        setIsActive(true);
        setIsActive2(false);
    }
    const hizoClic2 = () =>{
        if(params.num == 2){
          navigate(`/teacher/alumno/deliverable/${params.num}`, {
            state: {
              student: student,
              course: course
            }
          });
        }else{
          if(params.num == 1){
            navigate(`/jury/alumno/deliverable/${params.num}`, {
              state: {
                student: student,
                course: course
              }
            });
          }
        }
        setIsActive(false);
        setIsActive2(true);
    }
    
    const HeaderPortfolioClic = () =>{
      if(params.num == 2){
        navigate(`/teacher/alumno/${params.num}`,{
          state:{
            student: student,
            course: course
          }
        });
      }else{
        if(params.num == 1){
          navigate(`/jury/alumno/${params.num}`,{
            state:{
              student: student,
              course: course
            }
          });
        }
      }
    }
  return (
    <div className='todoContent'>
        <CreateNewUserPageStudent />
        <div className='contenedorContenidoDeliverable'>
            <div className='contenedorTitulo'>
                <h1 className='titulo'>ENTREGABLES</h1>
                <div className="space"></div>
            <div className="retro">
              <button className="botonRetrocesoDetalle" onClick={HeaderPortfolioClic}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>
            </div>
            <div className='contenedorOpcionesEntregable'>
                <ul>
                    <button
                    className="botonesOpcion"
                    onClick={hizoClic1}>
                        Entregas Parciales
                    </button>
                </ul>
                <ul>
                    <button
                    className="botonesOpcionSeleccionado"
                    onClick={hizoClic2}>
                        Entregables
                    </button>
                </ul>
            </div>
            
            <hr color='black' className='lineaContenidoDeliverable' />
            
            <div className='contenedorCambios'>
                <Deliverable student={student} course={course} num={params.num}/>
            </div>
        </div>
    </div>
  )
}
