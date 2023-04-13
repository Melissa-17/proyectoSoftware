import React from 'react'
import '../../../../../assets/styles/Teacher/Timeline/RubricaPart/RubricaProfesorRow.css'
import { Navigate, useNavigate } from 'react-router'

export default function RubricaProfesorRow(props) {
  const navigate = useNavigate();
  const cambioEditCriteria = () =>{
    navigate(`/timeline/criteria/edit/${props.num}/${props.option}`,{
      state:{
        cxsid: props.cxsid,
        id:props.id,
        rubricId:props.rubricId,
        criterioId: props.criterio.id
      }
    });
  }
  const cambioVisualCriteria = () =>{
    navigate(`/timeline/criteria/visual/${props.num}/${props.option}`,{
      state:{
        cxsid:props.cxsid,
        id:props.id,
        rubricId:props.rubricId,
        criterioId: props.criterio.id
      }
    });
  }
  console.log(props.cxsid)

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      props.setDeleteCriteria([...props.deleteCriteria, newId]);
    } else {
      const newList = props.deleteCriteria.filter((assignId) => assignId !== newId);
      props.setDeleteCriteria(newList);
    }
  };

  return (
    <div className='RubricaProfesorRow'>
      <input 
      type="checkbox"
      onChange={(e) => handleCheckDelete(e, props.criterio.id)}
      defaultChecked={false}
      checked={props.deleteCriteria.includes(props.criterio.id)}
      />
      {/* {console.log(props.criterio.id)} */}
      <p className='objetivo'>{props.criterio && props.criterio.name ? props.criterio.name : "No tiene un nombre"}</p>
      <hr color='black'/>
      <button className='editar' onClick={cambioEditCriteria}>Editar</button>
      <button className='verDetalle' onClick={cambioVisualCriteria}>Ver detalle</button>
    </div>
  )
}
