import React from "react";
import '#Styles/Jury/Presentation/InfoPresentation.css';
import { useNavigate } from "react-router";
import {formatDate} from '#Helpers/assignmentHelpers.js';

export default function InfoPresentation(props){

    const presentation = props.presentation;
    const assign = presentation.ASSIGNMENT;
    const student = presentation.USER;
    const studentName = student.name + ' ' + student.fLastName + ' '+student.mLastName;
    // console.log(presentation);
    const navigate = useNavigate();
    const goDetail = () => {
        if(props.num==1){
            navigate('/jury/presentation/students/detail',{
                state:{
                    idAXS: props.presentation.id,
                    curso: props.curso,
                    presentation: presentation,
                    num: props.num
                }
            });
        }else{
            if(props.num==2){
                navigate('/asesor/presentation/students/detail',{
                    state:{
                        idAXS: props.presentation.id,
                        curso: props.curso,
                        presentation: presentation,
                        num: props.num
                    }
                });
            }else if(props.num==3){
                navigate('/teacher/presentation/students/detail',{
                    state:{
                        idAXS: props.presentation.id,
                        curso: props.curso,
                        presentation: presentation,
                        num: props.num
                    }
                });
            }
        }
    }

    const goReunion = () => {
        // navigate(presentation.linkVirtualSession);
        window.open(presentation.linkVirtualSession,'_blank');
    }



    // console.log(presentation);

    return(
        <div className="main-box-info">
            <div className="main-content-info">
                <div className="info-alumno-pres">
                    <p className="nombre-alum">{studentName}</p>
                    <p className="codigo-alum">{student.idPUCP}</p>
                    <p className="correo-alum">{student.email}</p>
                    <p className="tesis-alum">{assign.assignmentName}</p>
                </div>
                <hr className="separador-vertical"/>
                <div className="fecha-hora-pres">
                    {
                        presentation && presentation.meetingDate ?
                        <div className="fechaHoraPresContener" style={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center"}}>
                            <p className="fecha-pres" style={{marginTop:"10px",marginLeft:"0px"}}>Fecha: {formatDate(presentation.meetingDate)}</p>
                            <p className="hora-pres" style={{margintop:"0px", marginLeft:"0px"}}>Hora:  {formatDate(presentation.meetingDate, 'hh:mm')}</p>
                        </div>
                    :
                        <div className="fechaHoraPresContener" style={{alignItems:"center", justifyContent:"center"}}>
                            <p className="fecha-pres" style={{marginLeft:"0px", marginTop:"0px"}}>No hay una fecha asignada aún</p>
                        </div>
                    }
                </div>
                <hr className="separador-vertical"/>
                <div className="accion-pres">
                    {
                        presentation && presentation.linkVirtualSession ?
                    <button className="entrar-reunion" onClick={goReunion}>
                        Entrar a reunión
                    </button>
                    :
                    null
                    }
                    <button className="detail-pres" onClick={goDetail}>
                        Ver detalle
                    </button>
                </div>
            </div>
            <hr className='sep' width='1050px' color="#CED4DA" margin-left='20px'/>
        </div>
    );
}