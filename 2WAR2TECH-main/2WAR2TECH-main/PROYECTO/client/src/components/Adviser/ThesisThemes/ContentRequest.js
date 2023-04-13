import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../SidebarMenu/Navbar";
import Request from "./Request";

function ContentRequest() {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(true);
  const [isActive3, setIsActive3] = useState(false);
  const navigate = useNavigate();

  const hizoClic1 = () => {
    navigate("/asesor/contentPropose");
    setIsActive(true);
    setIsActive2(false);
    setIsActive3(false);
  };
  const hizoClic2 = () => {
    navigate("/asesor/contentRequest");
    setIsActive(false);
    setIsActive2(true);
    setIsActive3(false);
  };
  const hizoClic3 = () => {
    navigate("/asesor/contentStudentPropose");
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(true);
  };

  return (
    <div className="PRtodoContent">
      <Navbar />
      <div className="contenedorContenidoPropose">
        <div className="contenedorTituloPropose">
          <h1 className="tituloGestionContentPropose">GESTIÓN DEL CURSO</h1>
        </div>
        <hr color="black" className="lineaContenidoDeliverable" />

        <div className="contenedorOpcionesEntregable">
          <ul>
            <button className="botonesOpcion" onClick={hizoClic1}>
              Mis propuestas
            </button>
          </ul>
          <ul>
            <button className="botonesOpcionSeleccionado" onClick={hizoClic2}>
              Solicitudes
            </button>
          </ul>
          <ul>
            {/* <button className="botonesOpcion" onClick={hizoClic3}>
              Propuestas alumnos
            </button> */}
          </ul>
        </div>

        <div className="contenedorCambiosPropose">
          <Request />
        </div>
      </div>
    </div>
  );
}

export default ContentRequest;
