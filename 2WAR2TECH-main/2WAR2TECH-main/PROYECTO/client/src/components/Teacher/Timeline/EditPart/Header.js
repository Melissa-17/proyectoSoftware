import React from "react";
import "../../../../assets/styles/Teacher/Timeline/VisualPart/HeaderVisualPart.css";
import { useNavigate } from "react-router";

export default function Header(props) {
  const navigate = useNavigate();
  const retrocesoClic = () => {
    if (props.numero == 1) {
      navigate("/timeline", {
        state: {
          cxsid: props.cxsid,
        },
      });
    } else {
      if (props.numero == 2) {
        navigate(`/timeline/detail/${props.num}`, {
          state: {
            cxsid: props.cxsid,
            id: props.id,
            entregable: props.entregable
          },
        });
      }
    }
  };

  const funcionTitulo = () => {
    if (props.entregable.type == "PARTIAL ASSIGN") return "ENTREGABLE PARCIAL";
    else if (props.entregable.type == "ADVANCE") return "AVANCE";
    else if (props.entregable.type == "FINAL ASSIGN") return "ENTREGABLE";
    else if (props.entregable.type == "EXPOSITION") return "EXPOSICION";
  };

  return (
    <div className="contenedorHeaderVisualPart">
      <div className="contenedorHeaderPrimeraParteVisualPart">
        <div className="contenedortituloSubtitutloVisualPart">
          <p className="titulo">EDITAR {funcionTitulo()}</p>
          <p className="fecha">13/05/2022 - 20/05/2022</p>
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
        <hr color="black" className="lineaVisualPart" />
      </div>
    </div>
  );
}
