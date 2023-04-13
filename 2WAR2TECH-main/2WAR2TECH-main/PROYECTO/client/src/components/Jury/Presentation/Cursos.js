import React from "react";
import '#Styles/Jury/Presentation/Cursos.css';
import { useNavigate } from "react-router";

export default function Cursos(props){

    const navigate = useNavigate();
    // const curso = props.curso.COURSE?props.curso.COURSE:'';
    // console.log(props.curso);

    const goStudentList = () =>{
        if(props.num==1){
            navigate('/jury/presentation/students', {
                state:{
                    curso : props.curso,
                    num:props.num
                }
            });
        }else{
            if(props.num==2){
                navigate('/asesor/presentation/students', {
                    state:{
                        curso : props.curso,
                        num:props.num
                    }
                });
            }else if(props.num==3){
                navigate('/teacher/presentation/students', {
                    state:{
                        curso : props.curso,
                        num:props.num
                    }
                });
            }
        }
    }
    // console.log(curso);
    return(
        <button className="main-box-cursos" onClick={goStudentList}>
            <p className="nombre-curso">{props.curso.name}</p>
            <p className="especialidad-curso">Ingeniería informática</p>
        </button>
    );
}