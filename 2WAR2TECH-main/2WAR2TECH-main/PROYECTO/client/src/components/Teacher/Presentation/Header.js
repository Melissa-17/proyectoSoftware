import React from "react";
import "#Styles/Teacher/Presentation/Header.css";
import { useNavigate } from "react-router";

export default function Header(props) {
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/courses");
  };
  return (
    <div className="main-box-h">
      <div className="primeraLineaHeaderExposition">
        <h1 className="titulo">{props.titulo}</h1>
        <div className="contenedorBotonRetrocederHeaderJury">
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
      </div>
      <hr className="linea"></hr>
      <h3 className="sub-titulo">TEMAS DE TESIS DISPONIBLES</h3>
    </div>
  );
}
