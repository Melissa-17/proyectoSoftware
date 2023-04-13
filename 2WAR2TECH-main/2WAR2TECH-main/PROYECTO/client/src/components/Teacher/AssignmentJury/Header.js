import React from "react";
import "#Styles/Teacher/AssignmentJury/Header.css";
import { useNavigate } from "react-router";

export default function Header(props) {
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/courses");
  };
  return (
    <div className="main-box-as">
      <div className="primeraLineaHeaderExposition-as">
        <h1 className="titulo-as">{props.titulo}</h1>
        <div className="contenedorBotonRetrocederHeaderJury-as">
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
      </div>
      <hr className="linea-as"></hr>
      <h3 className="sub-titulo">Temas de tesis disponibles</h3>
    </div>
  );
}
