import React from 'react'
import '../../../../assets/styles/Jury/Deliverable/DetailPart/HeaderDetail.css'
import { useNavigate } from 'react-router'

export default function HeaderDetail(props) {
    const navigate = useNavigate();
    const RetrocesoHeaderDetail = () =>{
        navigate("/jury/deliverable");
    }
  return (
    <div className='contenedorHeaderDetail'>
        <div className="contenedorInfoHeaderDetail">
            <div className="contenedorTituloHeaderDetail">
                <h1>TESIS {props.numero} (INF)</h1>
            </div>
            <button className="RetrocesoDetalle" onClick={RetrocesoHeaderDetail}>
                <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetroceso"
                />
            </button>
        </div>
        <div>
            <hr color="black" className="lineaContenidoHeaderDetail" />
        </div>
    </div>
  )
}
