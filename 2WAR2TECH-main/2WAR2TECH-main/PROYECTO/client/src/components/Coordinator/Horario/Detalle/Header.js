import React from "react";
import { useNavigate } from "react-router";
import "../../../../assets/styles/Admin/Faculty/Visual/Header.css";

export default function Header() {
    const navigate = useNavigate();
    const retroceder = () =>{
        navigate("/Coordinador/horario");
    }
  return (
    <div className="contenedoTituloFacultyAdmin">
      <div className="primeraFilaVisualPart">
        <p className="editar">DETALLE DE HORARIO</p>
        <button className="RetrocesoDetalle" onClick={retroceder}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
            className="imagenRetroceso"
          />
        </button>
      </div>
      <div>
        <hr color="black" className="lineaHorizontalFacultyAdmin" />
      </div>
    </div>
  );
}
