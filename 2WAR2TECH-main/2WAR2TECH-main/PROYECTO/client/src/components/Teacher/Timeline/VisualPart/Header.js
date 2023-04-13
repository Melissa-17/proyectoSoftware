import React from "react";
import { useNavigate } from "react-router";
import '../../../../assets/styles/Teacher/Timeline/VisualPart/HeaderVisualPart.css'
import { formatDate } from '#Helpers/assignmentHelpers.js'

export default function Header(props) {
    const navigate = useNavigate();
    const retrocesoClic = () =>{
      navigate("/timeline",{
        state:{
          cxsid:props.cxsid
        }
      });
    }

    const funcionTitulo = () =>{
      if(props.entregable.type=="PARTIAL ASSIGN") return "ENTREGABLE PARCIAL";
      else if(props.entregable.type=="ADVANCE") return "AVANCE";
      else if(props.entregable.type=="FINAL ASSIGN") return "ENTREGABLE";
      else if(props.entregable.type=="EXPOSITION" || props.entregable.type=="PROGRAMMED_EXPOSITION") return "EXPOSICION";
      else return "Sin tipo de entregable";
    }
  return (
    <div className="contenedorHeaderVisualPart">
      <div className="contenedorHeaderPrimeraParteVisualPart">
        <div className="contenedortituloSubtitutloVisualPart">
          <p className="titulo">{funcionTitulo()}</p>
          <p className="fecha">{formatDate(props.entregable.startDate)} - {formatDate(props.entregable.endDate)}</p>
        </div>
        <div className="contenedorBotonVisualPart"
        style={{marginLeft:"-60px"}}
        >
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
      </div>
      <div>
        <hr color="black" className="lineaVisualPart" />
      </div>
    </div>
  );
}
