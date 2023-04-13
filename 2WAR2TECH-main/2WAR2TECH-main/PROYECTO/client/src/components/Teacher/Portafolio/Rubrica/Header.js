import React from "react";
import '#Styles/Adviser/Rubrica/Header.css'
import { useNavigate } from "react-router-dom";

export default function Header(props) {

  const navigate = useNavigate();

  const hizoClic4 = () =>{
    if(props.cambio>3){
      if(props.num==2){
        navigate(`/teacher/alumno/avances/detail/${props.idEntregable}/${props.cambio}`, {
          state: {
            index: props.index,
            student: props.student,
            course: props.course,
            num: props.num
          }
        });
      }else{
        if(props.num==1){
          navigate(`/jury/alumno/avances/detail/${props.idEntregable}/${props.cambio}`, {
            state: {
              index: props.index,
              student: props.student,
              course: props.course,
              num: props.num
            }
          });
        }
      }
    }else{
      if(props.cambio == 1){
        if(props.num==2){
          navigate(`/teacher/alumno/deliverable/detail/${props.idEntregable}/${props.cambio}`, {
            state: {
              index: props.index,
              student: props.student,
              course: props.course,
              num: props.num
            }
          });
        }else{
          if(props.num==1){
            navigate(`/jury/alumno/deliverable/detail/${props.idEntregable}/${props.cambio}`, {
              state: {
                index: props.index,
                student: props.student,
                course: props.course,
                num: props.num
              }
            });
          }
        }
      }else{
        if(props.cambio==2){
          if(props.num==2){
            navigate(`/teacher/alumno/partial/detail/${props.idEntregable}/${props.cambio}`, {
              state: {
                index: props.index,
                student: props.student,
                course: props.course,
                num: props.num
              }
            });
          }else{
            if(props.num==1){
              navigate(`/teacher/alumno/partial/detail/${props.idEntregable}/${props.cambio}`, {
                state: {
                  index: props.index,
                  student: props.student,
                  course: props.course,
                  num: props.num
                }
              });
            }
          }
        }
      }
    }
  }

  return (
    <div className="contenedorHeader">
      <div className="contenedorHeaderDetalle">
        <div className="TituloDetalle">
          <h1 className="titulo">Rúbrica</h1>
        </div>
        <div className="buttons-edit">
            <button className="Guardar-cambios"
              onClick={props.funcionGuardar}
            >
                Guardar
            </button>
            <button className="Cancelar-cambios"
              onClick={props.funcionCancelar}
            >
                Cancelar
            </button>
        </div>	
        <button className="RetrocesoDetalle"
        onClick={hizoClic4}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
            className="imagenRetroceso"
          />
        </button>
      </div>    
      <hr color="black" className="lineaHeader"/>
    </div>
  );
}
