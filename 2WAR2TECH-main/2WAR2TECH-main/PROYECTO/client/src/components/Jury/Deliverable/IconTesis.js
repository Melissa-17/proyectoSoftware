import React from 'react'
import '../../../assets/styles/Jury/Deliverable/IconTesis.css'
import { useNavigate } from 'react-router'

export default function IconTesis(props) {
    const navigate = useNavigate();
    const IconThesisClic = () =>{
        navigate(`/jury/deliverable/detail/${props.thesis.id}/${props.numero}`,{
            state:{
                thesis: props.thesis
            }
        });
    }
  return (
    <button className='contenedorIconTesis' onClick={IconThesisClic}>
      <p className='tituloIconTesis'>Tesis {props.numero}</p>
      <p className='areaIconTesis'>{props.thesis.theme}</p>
    </button>
  )
}
