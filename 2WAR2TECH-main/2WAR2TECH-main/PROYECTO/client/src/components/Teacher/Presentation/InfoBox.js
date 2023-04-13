import React, { useState } from "react";
import '#Styles/Teacher/Presentation/InfoBox.css';
import { useNavigate } from "react-router";
import ModalsAlert from "../../Modals/ModalsAlert";
import { axiosDeleteAssignment } from "../../../api/AssignmentStudent";

export default function InfoBox(props){

    const [openModalCancelar, setOpenModalCancelar] = useState(false);
    const [ listDelete, setListDelete] = useState([]);

    const navigate = useNavigate();
    const goEditPresentation= () =>{
        navigate('/teacher/presentation/editTeacher', {
            state:{
                cxsid: props.cxsid,
                axsid: props.presentationId
            }
        });
    }

    const goDetailPresentation = () =>{
        navigate('/teacher/presentation/detailPresentationTeacher', {
            state:{
                cxsid: props.cxsid,
                initialTime: props.horaInicio,
                finalTime: props.horaFin,
                fecha:props.fecha,
                axsid: props.presentationId
            }
        });
    }

    // console.log(props);
    const JWTtoken = localStorage.getItem('token');

    const deletePresentation = () =>{
        axiosDeleteAssignment(JWTtoken, props.assignId).then(
            (res) =>{
                console.log(res);
            }
        ).catch(
            (error) =>{
                console.error(error);
            }
        )
    }

    return(
        <div className="main-class">
            <div className="imagen-alumno">
                <img className="foto-alumno" 
                src={props.perfil}/>
            </div>
            <div className="info-alumno">
                <p className="nombre-alumno">{props.nombreCompleto}</p>
                <p className="carrera-alumno">{props.carrera}</p>
            </div>
            <div className="info-entrega">
                <p className="hora">Hora: {props.horaInicio} - {props.horaFin}</p>
                <p className="fecha">Fecha: {props.fecha}</p>
            </div>
            <div className="botoneria" >
                <button className="info" onClick={goDetailPresentation}>
                    <i class="bi bi-info-circle fa-2x"></i>
                </button>
                <button className="edit" onClick={goEditPresentation}>
                    <i class="bi bi-pencil-square fa-2x"></i>
                </button>
                <button className="delete" onClick={() => {setOpenModalCancelar(true); props.renderiza();}}>
                    <i class="bi bi-trash3 fa-2x"></i>
                </button>
            </div>
            {openModalCancelar && <ModalsAlert closeAlert = {setOpenModalCancelar}
            alertText='¿Seguro que desea eliminar la presentación?'
            action={deletePresentation}/>}
        </div>
    );
}