import React from 'react'
import '../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/HeaderEditCriteria.css'
import { useNavigate } from 'react-router'

export default function HeaderEditCriteria(props) {
    const navigate = useNavigate();
    const retrocesoClic = () =>{
      if(props.option==1){
        navigate(`/timeline/rubrica/${props.num}`,{
          state:{
            cxsid:props.cxsid,
            id:props.id,
            rubricId:props.rubricId,
            criterioId:props.criterioId
          }
        });
      }else{
        if(props.option==2){
          navigate(`/timeline/rubrica/edit/${props.num}`,{
            state:{
              cxsid:props.cxsid,
              id:props.id,
              rubricId:props.rubricId,
              criterioId:props.criterioId
            }
          });
        }
        else{
          if(props.option>2){
            navigate(`/timeline/criteria/visual/${props.num}/${props.option-2}`,{
              state:{
                cxsid:props.cxsid,
                id:props.id,
                rubricId:props.rubricId,
                criterioId:props.criterioId
              }
            });
          }
        }
      }
    }
  return (
    <div className='contenedorHeaderCriteriaProfesor'>
      <div className='lineaHeaderRubricaProfesor'>
        <div className='contenedorFilasCriteriaProfesor'>
            <p className='edicion'>EDICIÓN CRITERIA N°1</p>
            <input type="text" placeholder='Coloque un nombre' defaultValue={props.criteriaDetail && props.criteriaDetail.criteria && props.criteriaDetail.criteria.name? 
            props.criteriaDetail.criteria.name
            : ""}/>
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
            <hr color="black" className="lineaContenidoCriteriaProfesor"/>
        </div>
    </div>
  )
}
