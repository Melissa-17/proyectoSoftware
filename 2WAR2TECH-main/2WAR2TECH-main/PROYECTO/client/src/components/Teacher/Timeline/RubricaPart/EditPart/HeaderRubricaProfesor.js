import React from 'react'
import { useNavigate } from 'react-router'
import '../../../../../assets/styles/Teacher/Timeline/RubricaPart/HeaderRubricaProfesor.css'

export default function HeaderRubricaProfesor(props) {
    
    const navigate = useNavigate();
    const retrocesoClic = () =>{
        navigate(`/timeline/rubrica/${props.num}`,{
          state:{
            cxsid:props.cxsid,
            id:props.id,
            rubricId: props.rubricId
          }
        });
    }
  return (
    <div className='contenedorHeaderRubricaProfesor'>
      <div className='lineaHeaderRubricaProfesor'>
        <div className='contenedorFilasRubricaProfesor' style={{marginRight:"800px"}}>
            <p className='edicion'>EDICIÓN RÚBRICA</p>
            <p className='entrega'>{props.entregable && props.entregable.assignment && props.entregable.assignment.assignmentName? 
            props.entregable.assignment.assignmentName : 
            "No tiene titulo"}</p>
        </div>

        <div className="contenedorBotonVisualPart">
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
                <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
                />
            </button>
        </div>
      </div>
        <div>
            <hr color="black" className="lineaContenidoRubricaProfesor" />
        </div>
    </div>
  )
}
